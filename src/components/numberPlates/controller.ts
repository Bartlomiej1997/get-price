import { Request, Response } from "express";
import { NumberPlatesService } from "./service";
const { log } = console;

export class NumberPlatesController {
  private service: NumberPlatesService;

  constructor(service: NumberPlatesService) {
    this.service = service;
  }

  public async getPrice(req: Request, res: Response): Promise<void> {
    log('NumberPlatesController.getPrice');
    const numberPlate: string = req.params.numberPlate;
    const skipCacheForReadQuery: string = req.query.skipCacheForRead as string;
    const skipCacheForRead =
      (skipCacheForReadQuery && skipCacheForReadQuery === "true") || false;
    const price: number = await this.service.getPrice(
      numberPlate,
      skipCacheForRead
    );
    res.json(price);
  }
}
