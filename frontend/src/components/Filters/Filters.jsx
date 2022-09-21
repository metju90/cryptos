import React from "react";
import { Button, FiltersWrapper } from "./Filters.style";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faToggleOn,
  faToggleOff,
  faSortUp,
  faSortDown,
  faShuffle,
  faArrowsRotate,
} from "@fortawesome/free-solid-svg-icons";

const Filter = ({
  toggleSortField,
  toggleFilter,
  toggleSortRandom,
  isUsSupportEnabled,
  isTestModeEnabled,
  sortingDirections,
  toggleUsSupport,
  toggleTestMode,
  reset,
  currenciesCount,
}) => {
  const { name: nameSortDirection, code: codeSortDirection } =
    sortingDirections;
  return (
    <FiltersWrapper>
      <div>
        <Button
          onClick={toggleUsSupport}
          isInactive={isUsSupportEnabled === undefined}
        >
          <span>
            <FontAwesomeIcon
              icon={isUsSupportEnabled ? faToggleOn : faToggleOff}
            />
            Supported in the US
          </span>
        </Button>
        <Button
          onClick={toggleTestMode}
          isInactive={isTestModeEnabled === undefined}
        >
          <span>
            <FontAwesomeIcon
              icon={isTestModeEnabled ? faToggleOn : faToggleOff}
            />
            Test mode
          </span>
        </Button>

        <Button onClick={reset}>
          <span>
            <FontAwesomeIcon icon={faArrowsRotate} />
            Remove filters
          </span>
        </Button>
      </div>
      <div>
        <Button
          onClick={() => {
            toggleSortField({
              sortField: "name",
            });
          }}
        >
          <span>
            <FontAwesomeIcon
              icon={nameSortDirection === "asc" ? faSortUp : faSortDown}
            />
            Name
          </span>
        </Button>
        <Button
          onClick={() => {
            toggleSortField({
              sortField: "code",
            });
          }}
        >
          <span>
            <FontAwesomeIcon
              icon={codeSortDirection === "asc" ? faSortUp : faSortDown}
            />
            Symbol
          </span>
        </Button>
        <Button onClick={toggleSortRandom}>
          <span>
            <FontAwesomeIcon icon={faShuffle} />
            Shuffle
          </span>
        </Button>
      </div>
    </FiltersWrapper>
  );
};

export default Filter;
