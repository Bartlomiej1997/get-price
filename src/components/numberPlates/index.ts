import { redisService } from "../redis";
import { NumberPlatesService } from "./service";
export const numberPlatesService = new NumberPlatesService(redisService);
export { numberPlatesRouter } from "./routes";
