import { Router } from "express";
import { NumberPlatesController } from "./controller";
import { numberPlatesService } from ".";
const numberPlatesController = new NumberPlatesController(numberPlatesService);

const numberPlatesRouter = Router();

numberPlatesRouter.get(
  "/:numberPlate/price",
  numberPlatesController.getPrice.bind(numberPlatesController)
);

export { numberPlatesRouter };
