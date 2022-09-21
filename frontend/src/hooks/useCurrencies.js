import { useContext } from "react";
import { CurrenciesContext } from "../contexts/Currencies";

const useCurrencies = () => useContext(CurrenciesContext);

export default useCurrencies;
