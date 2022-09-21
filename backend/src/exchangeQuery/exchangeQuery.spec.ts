import nock from "nock";
import exchangeQuery from "./exchangeQuery";

describe("exchange-query", () => {
  it("Returns the exchange with cheapest ask price", async () => {
    const mockedExchanges = [
      {
        name: "exchange_A",
        btcUsdtOrderBookUrl: "https://exchange_A/order-book",
        getAskPrice: (orderBook: any) => orderBook.askPrice,
      },
      {
        name: "best_exchange",
        btcUsdtOrderBookUrl: "https://best_exchange/order-book",
        getAskPrice: (orderBook: any) => orderBook.askPrice,
      },
      {
        name: "exchange_B",
        btcUsdtOrderBookUrl: "https://exchange_B/order-book",
        getAskPrice: (orderBook: any) => orderBook.askPrice,
      },
    ];

    nock("https://exchange_A").get("/order-book").reply(200, { askPrice: 500 });

    nock("https://best_exchange")
      .get("/order-book")
      .reply(200, { askPrice: 100 });

    nock("https://exchange_B").get("/order-book").reply(200, { askPrice: 999 });

    const response = await exchangeQuery({
      btcAmount: 1,
      exchanges: mockedExchanges,
    });
    expect(response).toEqual({
      btcAmount: 1,
      exchange: "best_exchange",
      exchangesCheckedAgainst: ["exchange_A", "best_exchange", "exchange_B"],
      usdAmount: 100,
    });
  });

  it("Operation succeeds if at least one exchange API call succeeds", async () => {
    const mockedExchanges = [
      {
        name: "exchange_A",
        btcUsdtOrderBookUrl: "https://exchange_A/order-book",
        getAskPrice: (orderBook: any) => orderBook.askPrice,
      },
      {
        name: "exchange_failing_API_B",
        btcUsdtOrderBookUrl: "https://failing_API_B/order-book",
        getAskPrice: (orderBook: any) => orderBook.askPrice,
      },
    ];
    // if we don't mock the endpoints they will fail since they are invalid urls.
    nock("https://exchange_A").get("/order-book").reply(200, { askPrice: 500 });

    const response = await exchangeQuery({
      btcAmount: 1,
      exchanges: mockedExchanges,
    });

    expect(response).toEqual({
      btcAmount: 1,
      exchange: "exchange_A",
      // Does not include `exchange_failing_API_B` exchange
      exchangesCheckedAgainst: ["exchange_A"],
      usdAmount: 500,
    });
  });

  it("Handles the case when all exchanges API fails", async () => {
    const mockedExchanges = [
      {
        name: "exchange_failing_API_a",
        btcUsdtOrderBookUrl: "https://exchfailing_API_A/order-book",
        getAskPrice: (orderBook: any) => orderBook.askPrice,
      },
      {
        name: "exchange_failing_API_B",
        btcUsdtOrderBookUrl: "https://failing_API_B/order-book",
        getAskPrice: (orderBook: any) => orderBook.askPrice,
      },
    ];
    const response = await exchangeQuery({
      btcAmount: 1,
      exchanges: mockedExchanges,
    });

    expect(response.hasErrors).toEqual(true);
  });
});
