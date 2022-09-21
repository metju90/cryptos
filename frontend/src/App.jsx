import React from "react";
import AppStyled from "./App.style";
import TilesConnected from "./components/Tiles";
import FiltersConnected from "./components/Filters";

function App() {
  return (
    <AppStyled className="App">
      <FiltersConnected />
      <TilesConnected />
    </AppStyled>
  );
}

export default App;
