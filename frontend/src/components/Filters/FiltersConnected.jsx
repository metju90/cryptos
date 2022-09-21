import React from "react";
import useCurrencies from "../../hooks/useCurrencies";
import Filters from "./Filters";

const FiltersConnected = () => {
  const {
    state: {
      isUsSupportEnabled,
      isTestModeEnabled,
      sortingDirections,
      currenciesCount,
    },
    toggleSortField,
    toggleUsSupport,
    toggleTestMode,
    toggleSortRandom,
    reset,
  } = useCurrencies();

  return (
    <Filters
      currenciesCount={currenciesCount}
      sortingDirections={sortingDirections}
      isUsSupportEnabled={isUsSupportEnabled}
      isTestModeEnabled={isTestModeEnabled}
      toggleUsSupport={toggleUsSupport}
      toggleTestMode={toggleTestMode}
      toggleSortField={toggleSortField}
      toggleSortRandom={toggleSortRandom}
      reset={reset}
    />
  );
};

export default FiltersConnected;
