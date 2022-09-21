import React from "react";
import useCurrencies from "../../hooks/useCurrencies";
import Tiles from "./Tiles";

const TilesConnected = () => {
  const {
    state: { currencies, hasErrors, currenciesCount },
  } = useCurrencies();

  return (
    <Tiles
      currencies={currencies}
      hasErrors={hasErrors}
      currenciesCount={currenciesCount}
    />
  );
};

export default TilesConnected;
