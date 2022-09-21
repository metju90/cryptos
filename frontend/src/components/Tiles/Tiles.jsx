import React from "react";
import { Tile, Name, Code } from "./Tiles.style";

const Tiles = ({ currencies, hasErrors, currenciesCount }) => {
  return (
    <div>
      {hasErrors && <div>Sorry, something went wrong!</div>}
      <div>
        Showing{" "}
        <strong>
          {currencies.length}/{currenciesCount}
        </strong>{" "}
        currencies
      </div>
      {currencies.map((currency, key) => {
        return (
          <Tile key={currency.code}>
            <Name>{currency.name}</Name>
            <Code>{currency.code}</Code>
          </Tile>
        );
      })}
    </div>
  );
};

export default Tiles;
