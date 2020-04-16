import React from 'react';
import {formatDistance} from 'date-fns';
import i18n from '../i18n';
import {formatNumber} from '../utils/common-functions';

function SummaryTiles({
    data
}){

    const lastupdated = formatDistance(new Date(data.updated),  new Date());

    return (
       <div className="overviewstats">
         <h3>
            World information: <span className="subtitle">last udpated {lastupdated} Ago </span>
         </h3>

         <div className="map-stats" style={{marginTop:'5px'}}>
                 <div className="stats is-steelblue fadeInUp" style={{animationDelay: '0.1s'}}>
                   <h5>{i18n.t("Confirmed")}</h5>
                   <h1>{formatNumber(data.cases)} </h1>
                   <div className="stats-bottom">
                     <h5><sup> &uarr; {formatNumber(data.todayCases)}</sup></h5>
                   </div>
                 </div>

                 <div
                    className="stats is-steelblue fadeInUp"
                    style={{animationDelay: '0.1s'}}
                  >
                    <h5>{i18n.t("Deceased")}</h5>
                    <h1>{formatNumber(data.deaths)}</h1>
                    <div className="stats-bottom">
                      <h5><sup> &uarr; {formatNumber(data.todayDeaths)}</sup></h5>
                    </div>
                  </div>

                 <div
                   className="stats is-steelblue fadeInUp"
                   style={{animationDelay: '0.1s'}}
                 >
                   <h5>{i18n.t("Active")}</h5>
                   <h1>{formatNumber(data.active)}</h1>
                   <div className="stats-bottom">
                     <h6>{}</h6>
                   </div>
                 </div>

                 <div
                   className="stats is-steelblue fadeInUp"
                   style={{animationDelay: '0.1s'}}
                 >
                   <h5>{i18n.t("Recovered")}</h5>
                   <h1>{formatNumber(data.recovered)}</h1>
                   <div className="stats-bottom">
                    <h6>{}</h6>
                   </div>
                 </div>

               </div>
          </div>
        );

}

export default SummaryTiles;