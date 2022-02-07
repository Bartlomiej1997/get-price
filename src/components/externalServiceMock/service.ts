const { log } = console;
const ONE_S = 1000;
const ONE_MIN = 60 * ONE_S;

export const getExternalPrice = async (numberPlate: string): Promise<number> => {
  log("getExternalPriceMock", { numberPlate });
  const carPrice = 10000;
  return new Promise((resolve) => setTimeout(() => resolve(carPrice), ONE_MIN));
};
