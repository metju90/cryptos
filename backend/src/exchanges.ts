
import logger from './lib/logger';

interface IExchange {
  name: string;
  btcUsdtOrderBookUrl: string;
  getAskPrice: (orderBook: any) => number;
}

const exchanges: IExchange[] = [
  {
    name: "Ftx",
    btcUsdtOrderBookUrl:
      "https://ftx.com/api/markets/BTC_USDT/orderbook?depth=1",
    getAskPrice: (orderBook: any): number => {
      const askPrice = orderBook?.result?.asks?.[0]?.[0];
      if (!askPrice) {
        const errorMessage = "Ftx order book's data structure has changed.";
        logger.error(errorMessage);
        throw new Error(errorMessage);
      }
      return askPrice;
    },
  },
  {
    name: "Coinbase",
    btcUsdtOrderBookUrl:
      "https://api.exchange.coinbase.com/products/BTC-USDT/book?level=1",
    getAskPrice: (orderBook: any) => {
      const askPrice = orderBook?.asks?.[0]?.[0];
      if (!askPrice) {
        const errorMessage =
          "Coinbase order book's data structure has changed.";
        logger.error(errorMessage);
        throw new Error(errorMessage);
      }
      return askPrice;
    },
  },
  {
    name: "Kraken",
    btcUsdtOrderBookUrl:
      "https://api.kraken.com/0/public/Depth?pair=XBTUSDT&count=1",
    getAskPrice: (orderBook: any) => {
      const askPrice = orderBook?.result?.XBTUSDT?.asks?.[0]?.[0];
      if (!askPrice) {
        const errorMessage = "Kraken order book's data structure has changed.";
        logger.error(errorMessage);
        throw new Error(errorMessage);
      }
      return askPrice;
    },
  },

  {
    name: "Binance",
    btcUsdtOrderBookUrl:
      "https://api.binance.com/api/v3/depth?limit=1&symbol=BTCUSDT",
    getAskPrice: (orderBook: any) => {
      const askPrice = orderBook?.asks?.[0]?.[0];
      if (!askPrice) {
        const errorMessage = "Binance order book's data structure has changed.";
        logger.error(errorMessage);
        throw new Error(errorMessage);
      }
      return askPrice;
    },
  },
];

export default exchanges;
export { IExchange }
