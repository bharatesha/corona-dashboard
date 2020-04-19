import React, { useState, useEffect } from "react";
import SummaryTiles from "./summaryTiles";
import { formatDate } from "../utils/common-functions";

function IndiaSummary({ statesData, lastUpdated }) {
  const [data, setData] = useState({});
  const [fetched, setFetched] = useState(false);

  function createData(
    cases,
    todayCases,
    deaths,
    todayDeaths,
    active,
    recovered,
    todayRecovered,
    updated
  ) {
    return {
      cases,
      todayCases,
      deaths,
      todayDeaths,
      active,
      recovered,
      todayRecovered,
      updated,
    };
  }

  useEffect(() => {
    const parseData = () => {
      let confirmed = 0;
      let active = 0;
      let recoveries = 0;
      let deaths = 0;
      let deltas = {};
      statesData.forEach((state, index) => {
        if (index !== 0) {
          confirmed += parseInt(state.confirmed);
          active += parseInt(state.active);
          recoveries += parseInt(state.recovered);
          deaths += parseInt(state.deaths);
        } else {
          deltas = {
            confirmed: parseInt(state.deltaconfirmed),
            deaths: parseInt(state.deltadeaths),
            recovered: parseInt(state.deltarecovered),
          };
        }
      });

      setData(
        createData(
          confirmed,
          deltas.confirmed,
          deaths,
          deltas.deaths,
          active,
          recoveries,
          deltas.recovered,
          formatDate(lastUpdated)
        )
      );
      setFetched(true);
    };
    parseData();
  }, [statesData, lastUpdated]);

  return (
    <div>
      {fetched && (
        <SummaryTiles data={data} title="India" tileClass="seagreen" />
      )}
    </div>
  );
}

export default IndiaSummary;
