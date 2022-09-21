import filterCurrencies, { FILTER_ENUM } from "./filterCurrencies";

describe("filterCurrencies - US supported", () => {
  // isSupportedInUS
  // supportsTestMode
  it("Filters by isSupportedInUS only", () => {
    const mockedCurrencies = [
      {
        name: "a",
        isSupportedInUS: true,
        supportsTestMode: false,
      },
      {
        name: "b",
        isSupportedInUS: true,
        supportsTestMode: false,
      },
      {
        name: "c",
        isSupportedInUS: false,
        supportsTestMode: false,
      },
      {
        name: "d",
        isSupportedInUS: false,
        supportsTestMode: false,
      },
    ];
    const filteredData = filterCurrencies({
      currencies: mockedCurrencies,
      isTestModeEnabled: undefined,
      isUsSupportEnabled: true,
      filterBy: FILTER_ENUM.US_SUPPORT,
    });
    expect(filteredData).toEqual([
      {
        name: "a",
        isSupportedInUS: true,
        supportsTestMode: false,
      },
      {
        name: "b",
        isSupportedInUS: true,
        supportsTestMode: false,
      },
    ]);
  });

  it("Filters by isSupportedInUS and supportsTestMode", () => {
    const mockedCurrencies = [
      {
        name: "a",
        isSupportedInUS: true,
        supportsTestMode: true,
      },
      {
        name: "b",
        isSupportedInUS: true,
        supportsTestMode: true,
      },
      {
        name: "c",
        isSupportedInUS: false,
        supportsTestMode: true,
      },
      {
        name: "d",
        isSupportedInUS: false,
        supportsTestMode: true,
      },
    ];
    const filteredData = filterCurrencies({
      currencies: mockedCurrencies,
      isTestModeEnabled: true,
      isUsSupportEnabled: true,
      filterBy: FILTER_ENUM.US_SUPPORT,
    });
    expect(filteredData).toEqual([
      {
        name: "a",
        isSupportedInUS: true,
        supportsTestMode: true,
      },
      {
        name: "b",
        isSupportedInUS: true,
        supportsTestMode: true,
      },
    ]);
  });

  it("Filters by isSupportedInUS and not supportsTestMode", () => {
    const mockedCurrencies = [
      {
        name: "a",
        isSupportedInUS: true,
        supportsTestMode: false,
      },
      {
        name: "b",
        isSupportedInUS: true,
        supportsTestMode: true,
      },
      {
        name: "c",
        isSupportedInUS: false,
        supportsTestMode: false,
      },
      {
        name: "d",
        isSupportedInUS: false,
        supportsTestMode: true,
      },
    ];
    const filteredData = filterCurrencies({
      currencies: mockedCurrencies,
      isTestModeEnabled: false,
      isUsSupportEnabled: true,
      filterBy: FILTER_ENUM.US_SUPPORT,
    });
    expect(filteredData).toEqual([
      {
        name: "a",
        isSupportedInUS: true,
        supportsTestMode: false,
      },
    ]);
  });

  it("Filters without isSupportedInUS and supportsTestMode", () => {
    const mockedCurrencies = [
      {
        name: "a",
        isSupportedInUS: true,
        supportsTestMode: false,
      },
      {
        name: "b",
        isSupportedInUS: true,
        supportsTestMode: true,
      },
      {
        name: "c",
        isSupportedInUS: false,
        supportsTestMode: false,
      },
      {
        name: "d",
        isSupportedInUS: false,
        supportsTestMode: true,
      },
    ];
    const filteredData = filterCurrencies({
      currencies: mockedCurrencies,
      isTestModeEnabled: false,
      isUsSupportEnabled: false,
      filterBy: FILTER_ENUM.US_SUPPORT,
    });
    expect(filteredData).toEqual([
      {
        name: "c",
        isSupportedInUS: false,
        supportsTestMode: false,
      },
    ]);
  });
});

describe("filterCurrencies - Test mode", () => {
  it("Filters by supportsTestMode only", () => {
    const mockedCurrencies = [
      {
        name: "a",
        supportsTestMode: true,
        isSupportedInUS: false,
      },
      {
        name: "b",
        supportsTestMode: true,
        isSupportedInUS: false,
      },
      {
        name: "c",
        supportsTestMode: false,
        isSupportedInUS: false,
      },
      {
        name: "d",
        supportsTestMode: false,
        isSupportedInUS: false,
      },
    ];
    const filteredData = filterCurrencies({
      currencies: mockedCurrencies,
      isTestModeEnabled: true,
      isUsSupportEnabled: undefined,
      filterBy: FILTER_ENUM.TEST_MODE,
    });
    expect(filteredData).toEqual([
      {
        name: "a",
        supportsTestMode: true,
        isSupportedInUS: false,
      },
      {
        name: "b",
        supportsTestMode: true,
        isSupportedInUS: false,
      },
    ]);
  });

  it("Filters by supportsTestMode and isSupportedInUS", () => {
    const mockedCurrencies = [
      {
        name: "a",
        isSupportedInUS: true,
        supportsTestMode: true,
      },
      {
        name: "b",
        isSupportedInUS: true,
        supportsTestMode: true,
      },
      {
        name: "c",
        isSupportedInUS: false,
        supportsTestMode: true,
      },
      {
        name: "d",
        isSupportedInUS: false,
        supportsTestMode: true,
      },
    ];
    const filteredData = filterCurrencies({
      currencies: mockedCurrencies,
      isTestModeEnabled: true,
      isUsSupportEnabled: true,
      filterBy: FILTER_ENUM.TEST_MODE,
    });
    expect(filteredData).toEqual([
      {
        name: "a",
        isSupportedInUS: true,
        supportsTestMode: true,
      },
      {
        name: "b",
        isSupportedInUS: true,
        supportsTestMode: true,
      },
    ]);
  });

  it("Filters by supportsTestMode and not isSupportedInUS", () => {
    const mockedCurrencies = [
      {
        name: "a",
        isSupportedInUS: false,
        supportsTestMode: true,
      },
      {
        name: "b",
        isSupportedInUS: true,
        supportsTestMode: true,
      },
      {
        name: "c",
        isSupportedInUS: false,
        supportsTestMode: false,
      },
      {
        name: "d",
        isSupportedInUS: true,
        supportsTestMode: false,
      },
    ];
    const filteredData = filterCurrencies({
      currencies: mockedCurrencies,
      isTestModeEnabled: true,
      isUsSupportEnabled: false,
      filterBy: FILTER_ENUM.TEST_MODE,
    });
    expect(filteredData).toEqual([
      {
        name: "a",
        isSupportedInUS: false,
        supportsTestMode: true,
      },
    ]);
  });

  it("Filters without supportsTestMode and isSupportedInUS", () => {
    const mockedCurrencies = [
      {
        name: "a",
        isSupportedInUS: true,
        supportsTestMode: false,
      },
      {
        name: "b",
        isSupportedInUS: true,
        supportsTestMode: true,
      },
      {
        name: "c",
        isSupportedInUS: false,
        supportsTestMode: false,
      },
      {
        name: "d",
        isSupportedInUS: false,
        supportsTestMode: true,
      },
    ];
    const filteredData = filterCurrencies({
      currencies: mockedCurrencies,
      isTestModeEnabled: false,
      isUsSupportEnabled: false,
      filterBy: FILTER_ENUM.TEST_MODE,
    });
    expect(filteredData).toEqual([
      {
        name: "c",
        isSupportedInUS: false,
        supportsTestMode: false,
      },
    ]);
  });
});
