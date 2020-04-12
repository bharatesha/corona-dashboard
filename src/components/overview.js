import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {formatDistance, format, parse} from 'date-fns';
import {formatNumber} from '../utils/common-functions';
import {formatDate, formatDateAbsolute} from '../utils/common-functions';

import i18n from '../i18n';

export default function ({
  states,
  stateDistrictWiseData,
  stateTestData
}) {

  const [currentHoveredRegion, setCurrentHoveredRegion] = useState({});
  const [panelRegion, setPanelRegion] = useState({});
  const [testObj, setTestObj] = useState({});


  useEffect(() => {
    const region = getRegionFromState(states[12]);
    setPanelRegion(region);
    setCurrentHoveredRegion(region);
  }, [states]);

  if (!panelRegion) {
    return null;
  }

  const getRegionFromState = (state) => {
    if (!state) {
      return;
    }
    const region = {...state};
    if (!region.name) {
      region.name = region.state;
    }
    return region;
  };


 const {name, lastupdatedtime} = currentHoveredRegion;

  useEffect(() => {
    setTestObj(
      stateTestData.find(
        (obj) => obj.state === panelRegion.name && obj.totaltested !== ''
      )
    );
  }, [panelRegion, stateTestData, testObj]);

  return (
    <div className="MapExplorer fadeInUp" style={{animationDelay: '1.5s'}}>

    <div className="meta fadeInUp" style={{animationDelay: '2.4s'}}>
                   {lastupdatedtime && (
                            <div>


                              <h3
                                title={
                                  isNaN(Date.parse(formatDate(lastupdatedtime)))
                                    ? ''
                                    : formatDateAbsolute(lastupdatedtime)
                                }
                              >
                                {isNaN(Date.parse(formatDate(lastupdatedtime)))
                                  ? ''
                                  : formatDistance(
                                      new Date(formatDate(lastupdatedtime)),
                                      new Date()
                                    ) + ' Ago'}
                              </h3>
                            </div>
                          )}

               </div>


      <div className="map-stats">

        <div className="stats fadeInUp" style={{animationDelay: '2s'}}>
          <h5>{i18n.t("Confirmed")}</h5>
          <div className="stats-bottom">
            <h1>{formatNumber(panelRegion.confirmed)} </h1>
            <h5><sup> &uarr; {formatNumber(panelRegion.deltaconfirmed)}</sup></h5>
          </div>
        </div>

        <div
          className="stats is-blue fadeInUp"
          style={{animationDelay: '2.1s'}}
        >
          <h5>{i18n.t("Active")}</h5>
          <div className="stats-bottom">
            <h1>{formatNumber(panelRegion.active)}</h1>
            <h6>{}</h6>
          </div>
        </div>

        <div
          className="stats is-green fadeInUp"
          style={{animationDelay: '2.2s'}}
        >
          <h5>{i18n.t("Recovered")}</h5>
          <div className="stats-bottom">
            <h1>{formatNumber(panelRegion.recovered)}</h1>
           <h5><sup> &uarr; {formatNumber(panelRegion.deltarecovered)}</sup></h5>
          </div>
        </div>

        <div
          className="stats is-gray fadeInUp"
          style={{animationDelay: '2.3s'}}
        >
          <h5>{i18n.t("Deceased")}</h5>
          <div className="stats-bottom">
            <h1>{formatNumber(panelRegion.deaths)}</h1>
            <h5><sup> &uarr; {formatNumber(panelRegion.deltadeaths)}</sup></h5>
          </div>
        </div>

        {
          <div
            className="stats is-purple tested fadeInUp"
            style={{animationDelay: '2.4s'}}
          >
             <h5>{i18n.t("Tested")}</h5>
            <div className="stats-bottom">
              <h1>{formatNumber(testObj?.totaltested)}</h1>
            </div>
            <h6 className="timestamp">
              {!isNaN(new Date(testObj?.updatedon))
                ? `On ${format(
                    parse(testObj?.updatedon, 'dd/MM/yyyy', new Date()),
                    'dd MMM'
                  )}`
                : ''}
            </h6>

          </div>
        }
      </div>

    </div>
  );
}
