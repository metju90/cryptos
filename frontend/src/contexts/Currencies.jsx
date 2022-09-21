import React, { useEffect, useState, useCallback, useMemo } from "react";
import sortByField from "../lib/sortByField";
import sortRandom from "../lib/sortRandom";
import filterCurrencies, { FILTER_ENUM } from "../lib/filterCurrencies";

const CurrenciesContext = React.createContext({});
const CURRENCIES_API = "https://api.moonpay.com/v3/currencies";

const Currencies = ({ children }) => {
  const [fetchedCurrencies, setFetchedCurrencies] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [hasErrors, setHasErrors] = useState(false);
  const [isUsSupportEnabled, setIsUsSupportEnabled] = useState();
  const [isTestModeEnabled, setIsTestModeEnabled] = useState();
  const [sortingDirections, setSortDirections] = useState({
    name: "asc",
    code: "asc",
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(CURRENCIES_API);
        const data = await res.json();
        setFetchedCurrencies(data);
        setCurrencies(data);
      } catch (err) {
        console.error(err);
        setHasErrors(true);
      }
    })();
  }, [setCurrencies, setHasErrors, setFetchedCurrencies]);

  const reset = useCallback(() => {
    setCurrencies(fetchedCurrencies);
    setIsTestModeEnabled(undefined);
    setIsUsSupportEnabled(undefined);
  }, [setCurrencies, fetchedCurrencies]);

  const toggleUsSupport = useCallback(() => {
    setCurrencies(
      filterCurrencies({
        currencies: fetchedCurrencies,
        isTestModeEnabled,
        isUsSupportEnabled: !isUsSupportEnabled,
        filterBy: FILTER_ENUM.US_SUPPORT,
      })
    );
    setIsUsSupportEnabled(!isUsSupportEnabled);
  }, [
    setIsUsSupportEnabled,
    isUsSupportEnabled,
    fetchedCurrencies,
    isTestModeEnabled,
  ]);

  const toggleTestMode = useCallback(() => {
    setCurrencies(
      filterCurrencies({
        currencies: fetchedCurrencies,
        isTestModeEnabled: !isTestModeEnabled,
        isUsSupportEnabled,
        filterBy: FILTER_ENUM.TEST_MODE,
      })
    );
    setIsTestModeEnabled(!isTestModeEnabled);
  }, [
    setIsTestModeEnabled,
    isTestModeEnabled,
    fetchedCurrencies,
    isUsSupportEnabled,
  ]);

  const toggleSortField = useCallback(
    ({ sortField }) => {
      // Copying array to prevent mutating `currencies`
      const copiedCurrencies = [...currencies];
      const nextDirection =
        sortingDirections[sortField] === "asc" ? "desc" : "asc";
      setCurrencies(
        copiedCurrencies.sort((a, b) =>
          sortByField(a, b, sortField, nextDirection)
        )
      );
      setSortDirections({
        ...sortingDirections,
        [sortField]: nextDirection,
      });
    },
    [setCurrencies, currencies, setSortDirections, sortingDirections]
  );

  const toggleSortRandom = useCallback(() => {
    // Copying array to prevent mutating `currencies`
    const copiedCurrencies = [...currencies];
    setCurrencies(copiedCurrencies.sort(sortRandom));
  }, [setCurrencies, currencies]);

  const providerValue = useMemo(() => {
    return {
      state: {
        currencies,
        hasErrors,
        isUsSupportEnabled,
        isTestModeEnabled,
        sortingDirections,
        currenciesCount: fetchedCurrencies.length,
      },
      toggleSortField,
      toggleSortRandom,
      toggleUsSupport,
      toggleTestMode,
      reset,
    };
  }, [
    currencies,
    hasErrors,
    isUsSupportEnabled,
    isTestModeEnabled,
    sortingDirections,
    fetchedCurrencies,
    toggleSortField,
    toggleSortRandom,
    toggleUsSupport,
    toggleTestMode,
    reset,
  ]);

  return (
    <CurrenciesContext.Provider value={providerValue}>
      {children}
    </CurrenciesContext.Provider>
  );
};

CurrenciesContext.displayName = "CurrenciesContext";

export { CurrenciesContext, Currencies as CurrenciesProvider };
