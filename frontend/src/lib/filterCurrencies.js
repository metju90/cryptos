const FILTER_ENUM = {
  US_SUPPORT: "US_SUPPORT",
  TEST_MODE: "TEST_MODE",
};

const filterCurrencies = ({
  currencies,
  isTestModeEnabled,
  isUsSupportEnabled,
  filterBy,
}) => {
  return currencies.filter((currency) => {
    if (isTestModeEnabled !== undefined && isUsSupportEnabled !== undefined) {
      return (
        Boolean(currency.supportsTestMode) === Boolean(isTestModeEnabled) &&
        Boolean(currency.isSupportedInUS) === Boolean(isUsSupportEnabled)
      );
    }

    if (filterBy === FILTER_ENUM.US_SUPPORT) {
      return Boolean(currency.isSupportedInUS) === Boolean(isUsSupportEnabled);
    }

    // if filterBy === FILTER_ENUM.TEST_MODE
    return Boolean(currency.supportsTestMode) === Boolean(isTestModeEnabled);
  });
};

export default filterCurrencies;
export { FILTER_ENUM };
