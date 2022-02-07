import { getExternalPrice } from "../externalServiceMock/service";
import { RedisService } from "../redis/service";
import { CachedPrice, CachedPriceStatus } from "./types/CachedPrice";
const { log } = console;

export class NumberPlatesService {
  private redisService: RedisService;

  constructor(redisService: RedisService) {
    this.redisService = redisService;
  }

  public async getPrice(numberPlate: string, skipCacheForRead: boolean = true): Promise<number> {
    log("NumberPlatesService.getPrice", { numberPlate, skipCacheForRead });
    if (skipCacheForRead) {
      return this._getExternalPrice(numberPlate);
    }

    const cachedPrice: CachedPrice = await this._getCache(numberPlate);
    console.log('cachedPrice', cachedPrice)
    if (!cachedPrice) {
      return this._getExternalPrice(numberPlate);
    }

    if (cachedPrice.status === CachedPriceStatus.Cached) {
      return cachedPrice.price;
    }

    if (cachedPrice.status === CachedPriceStatus.Pending) {
      return this._waitForExternalResponse(numberPlate);
    }
  }
  
  private async _getExternalPrice(numberPlate: string): Promise<number> {
    await this._setCache(numberPlate, CachedPriceStatus.Pending, null);
    const price = await getExternalPrice(numberPlate);
    await this._setCache(numberPlate, CachedPriceStatus.Cached, price);
    await this.redisService.publish(numberPlate, CachedPriceStatus.Cached);

    return price;
  }

  private async _setCache(numberPlate: string, status: CachedPriceStatus, price: number): Promise<void> {
    const cacheObj: CachedPrice = { status, price };
    await this.redisService.set(numberPlate, cacheObj);
  }

  private async _getCache(numberPlate: string): Promise<CachedPrice> {
    const cachedPrice = await this.redisService.get(numberPlate);
    return cachedPrice as CachedPrice;
  }

  private async _waitForExternalResponse(numberPlate: string): Promise<number> {
    await this.redisService.subscribe(numberPlate);
    const cache = await this._getCache(numberPlate);
    return cache.price;
  }
}
