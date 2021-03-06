import React, { useState, useEffect } from "react";
import { formatDistance } from "date-fns";

import { formatNumber } from "../utils/common-functions";
import {
  formatDate,
  formatDateAbsolute,
  filterJson,
} from "../utils/common-functions";
import WorldSummary from "./worldSummary";
import IndiaSummary from "./indiaSummary";

import i18n from "../i18n";

export default function ({
  state,
  states,
  stateDistrictWiseData,
  stateTestData,
  lastUpdated,
}) {
  const [currentHoveredRegion, setCurrentHoveredRegion] = useState({});
  const [panelRegion, setPanelRegion] = useState({});
  const [testObj, setTestObj] = useState({});
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const region = getRegionFromState(
      filterJson(states, "state", state)[0]
    );
    setPanelRegion(region);
    setCurrentHoveredRegion(region);
    setFetched(true);
  }, [states, state]);


  if (!panelRegion) {
    return null;
  }

  const getRegionFromState = (state) => {
    if (!state) {
      return;
    }
    const region = { ...state };
    if (!region.name) {
      region.name = region.state;
    }
    return region;
  };

  const { lastupdatedtime } = currentHoveredRegion;

  useEffect(() => {
    setTestObj(
      stateTestData.find(
        (obj) => obj.state === panelRegion.name && obj.totaltested !== ""
      )
    );
  }, [panelRegion, stateTestData, testObj]);

  const result = () => {
    return (
      <div className="MapExplorer" style={{ animationDelay: "0.1s" }}>
        <div className="overviewstats" style={{ animationDelay: "0.1s" }}>
          {lastupdatedtime && (
            <h3
              title={
                isNaN(Date.parse(formatDate(lastupdatedtime)))
                  ? ""
                  : formatDateAbsolute(lastupdatedtime)
              }
            >
              <b>{i18n.t(state)} </b>:
              {isNaN(Date.parse(formatDate(lastupdatedtime)))
                ? ""
                : formatDistance(
                    new Date(formatDate(lastupdatedtime)),
                    new Date()
                  ) + " Ago"}
            </h3>
          )}

          <div className="map-stats" style={{ marginTop: "10px" }}>
            <div className="stats fadeInUp" style={{ animationDelay: "0.1s" }}>
              <h5>{i18n.t("Confirmed")}</h5>
              <h1 style={{ fontSize: "1.4em" }}>
                {formatNumber(panelRegion.confirmed)}{" "}
              </h1>
              <h5>
                {" "}
                &uarr;{" "}
                <span style={{ fontSize: "1rem" }}>
                  {formatNumber(panelRegion.deltaconfirmed)}{" "}
                </span>
              </h5>
            </div>

            <div
              className="stats is-blue fadeInUp"
              style={{ animationDelay: "0.1s" }}
            >
              <h5>{i18n.t("Active")}</h5>
              <h1 style={{ fontSize: "1.4em" }}>
                {formatNumber(panelRegion.active)}
              </h1>
            </div>

            <div
              className="stats is-green fadeInUp"
              style={{ animationDelay: "0.1s" }}
            >
              <h5>{i18n.t("Recovered")}</h5>
              <h1 style={{ fontSize: "1.4em" }}>
                {formatNumber(panelRegion.recovered)}
              </h1>
              <h5>
                {" "}
                &uarr;{" "}
                <span style={{ fontSize: "1rem" }}>
                  {formatNumber(panelRegion.deltarecovered)}
                </span>
              </h5>
            </div>

            <div
              className="stats is-gray fadeInUp"
              style={{ animationDelay: "0.1s" }}
            >
              <h5>{i18n.t("Deceased")}</h5>
              <h1 style={{ fontSize: "1.4em" }}>
                {formatNumber(panelRegion.deaths)}
              </h1>
              <h5>
                {" "}
                &uarr;{" "}
                <span style={{ fontSize: "1rem" }}>
                  {formatNumber(panelRegion.deltadeaths)}
                </span>
              </h5>
            </div>

            {
              <div
                className="stats is-purple fadeInUp"
                style={{ animationDelay: "0.1s" }}
              >
                <h5>{i18n.t("Tested")}</h5>
                <h1 style={{ fontSize: "1.4em" }}>
                  {formatNumber(testObj?.totaltested)}
                </h1>
              </div>
            }
          </div>
          <div>
            <div>
              <IndiaSummary statesData={states} lastUpdated={lastUpdated} />
            </div>
            <div>
              <WorldSummary />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return fetched && result();
}
