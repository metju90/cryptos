import fetch from "node-fetch";
import logger from "../lib/logger";
import { IExchange } from '../exchanges';

interface IExchangeQueryResponse {
  hasErrors?: boolean;
  btcAmount: number;
  usdAmount: number;
  exchange: string;
  exchangesCheckedAgainst: string[],
}

interface IExchangeQueryArgs {
  btcAmount: number;
  exchanges: IExchange[]
}


const exchangeQuery = async ({ btcAmount, exchanges }: IExchangeQueryArgs): Promise<IExchangeQueryResponse> => {
  const exchangeResponses = await Promise.allSettled(
    exchanges.map((exchange) => fetch(exchange.btcUsdtOrderBookUrl))
  );

  const bestExchange = {
    askPrice: Infinity,
    name: "",
  };

  const exchangesCheckedAgainst: string[] = [];
  let i = -1;
  // O(n) time | O(n) space complexity where n is the number of exchanges.
  for (const response of exchangeResponses) {
    i++;
    const exchangeDetails: IExchange = exchanges[i];
    if (response.status !== "fulfilled") {
      logger.error(`API call to exchange ${exchangeDetails.name} failed`);
      continue;
    }
    try {
      const orderBookData = await response.value.json();
      const askPrice: number = exchangeDetails.getAskPrice(orderBookData);
      logger.debug(`${exchangeDetails.name} lowest ask price is ${askPrice}`);
      if (askPrice < bestExchange.askPrice) {
        logger.debug(
          `${exchangeDetails.name} ask price beats current ask price`
        );
        bestExchange.askPrice = askPrice;
        bestExchange.name = exchangeDetails.name;
      }
      exchangesCheckedAgainst.push(exchangeDetails.name);
    } catch (err) {
      logger.error(err, `Failed at exchangeQuery`);
    }
  }

  const finalResponse = {
    btcAmount,
    usdAmount: btcAmount * bestExchange.askPrice,
    exchange: bestExchange.name,
    exchangesCheckedAgainst,
  };

  logger.debug({ exchangesCheckedAgainst, bestExchange });
  logger.info({ finalResponse });

  if (!exchangesCheckedAgainst.length) {
    return { hasErrors: true, ...finalResponse };
  }
  return finalResponse;
};

export default exchangeQuery;
