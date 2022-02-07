export enum CachedPriceStatus {
  Pending = "Pending",
  Cached = "Caached",
}

export interface CachedPrice {
  status: CachedPriceStatus;
  price: number;
}
