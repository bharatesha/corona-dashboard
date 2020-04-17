import React, {useState, useEffect} from 'react';
import {formatDistance} from 'date-fns';

import {formatNumber} from '../utils/common-functions';
import {formatDate, formatDateAbsolute, filterJson} from '../utils/common-functions';
import WorldSummary  from './worldSummary';
import IndiaSummary  from './indiaSummary';

import i18n from '../i18n';

export default function ({
  states,
  stateDistrictWiseData,
  stateTestData,
  lastUpdated
}) {

  const [currentHoveredRegion, setCurrentHoveredRegion] = useState({});
  const [panelRegion, setPanelRegion] = useState({});
  const [testObj, setTestObj] = useState({});
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    const region = getRegionFromState(filterJson(states,'state','Karnataka')[0]);
    //console.log(filterJson(states,'state','Karnataka'));
    //const region = getRegionFromState(filterJson(states));
    setPanelRegion(region);
    setCurrentHoveredRegion(region);
    setFetched(true);
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


 const {lastupdatedtime} = currentHoveredRegion;

  useEffect(() => {
    setTestObj(
      stateTestData.find(
        (obj) => obj.state === panelRegion.name && obj.totaltested !== ''
      )
    );
  }, [panelRegion, stateTestData, testObj]);



const result = () => {

  return (
    <div className="MapExplorer " style={{animationDelay: '0.1s'}}>

    <div className="meta" style={{animationDelay: '0.1s'}}>
            <span className="subtitle">
                   {lastupdatedtime && (
                            <div>


                              <h3
                                title={
                                  isNaN(Date.parse(formatDate(lastupdatedtime)))
                                    ? ''
                                    : formatDateAbsolute(lastupdatedtime)
                                }
                              >
                                <b>{i18n.t('Karnataka')} </b>:
                                {isNaN(Date.parse(formatDate(lastupdatedtime)))
                                  ? ''
                                  : formatDistance(
                                      new Date(formatDate(lastupdatedtime)),
                                      new Date()
                                    ) + ' Ago'}
                              </h3>
                            </div>
                          )}
                    </span>
               </div>


      <div className="map-stats">

        <div className="stats fadeInUp" style={{animationDelay: '0.1s'}}>
          <h5>{i18n.t("Confirmed")}</h5>
          <h1>{formatNumber(panelRegion.confirmed)} </h1>
          <h5> &uarr; {formatNumber(panelRegion.deltaconfirmed)}</h5>
        </div>

        <div
          className="stats is-blue fadeInUp"
          style={{animationDelay: '0.1s'}}
        >
          <h5>{i18n.t("Active")}</h5>
          <h1>{formatNumber(panelRegion.active)}</h1>
        </div>

        <div
          className="stats is-green fadeInUp"
          style={{animationDelay: '0.1s'}}
        >
          <h5>{i18n.t("Recovered")}</h5>
          <h1>{formatNumber(panelRegion.recovered)}</h1>
          <h5> &uarr; {formatNumber(panelRegion.deltarecovered)}</h5>
        </div>

        <div
          className="stats is-gray fadeInUp"
          style={{animationDelay: '0.1s'}}
        >
          <h5>{i18n.t("Deceased")}</h5>
          <h1>{formatNumber(panelRegion.deaths)}</h1>
          <h5> &uarr; {formatNumber(panelRegion.deltadeaths)}</h5>
        </div>

        {
          <div
            className="stats is-purple fadeInUp"
            style={{animationDelay: '0.1s'}}
          >
             <h5>{i18n.t("Tested")}</h5>
            <div className="stats-bottom">
              <h1>{formatNumber(testObj?.totaltested)}</h1>
            </div>

          </div>
        }

      </div>
       <div><IndiaSummary statesData={states} lastUpdated={lastUpdated}/></div>
       <div><WorldSummary/></div>
    </div>
  );
}

return fetched && result();

}
