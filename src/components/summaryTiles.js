import React from 'react';
import {formatDistance} from 'date-fns';
import i18n from '../i18n';
import {formatNumber} from '../utils/common-functions';

function SummaryTiles({
    data,
    title,
    tileClass
}){

    const lastupdated = formatDistance(new Date(data.updated),  new Date());
    const tileClassData = "stats is-"+tileClass+" fadeInUp"

    return (
       <div className="overviewstats">
         <h3>
            {i18n.t(title)} : <span className="subtitle">about {lastupdated} Ago </span>
         </h3>

         <div className="map-stats" style={{marginTop:'5px'}}>
                 <div className={tileClassData} style={{animationDelay: '0.1s'}}>
                   <h5>{i18n.t("Confirmed")}</h5>
                   <h1>{formatNumber(data.cases)} </h1>
                   <h5><sup> &uarr; {formatNumber(data.todayCases)}</sup></h5>
                 </div>

                 <div
                    className={tileClassData}
                    style={{animationDelay: '0.1s'}}
                  >
                    <h5>{i18n.t("Deceased")}</h5>
                    <h1>{formatNumber(data.deaths)}</h1>
                    <h5><sup> &uarr; {formatNumber(data.todayDeaths)}</sup></h5>
                  </div>

                 <div
                   className={tileClassData}
                   style={{animationDelay: '0.1s'}}
                 >
                   <h5>{i18n.t("Active")}</h5>
                   <h1>{formatNumber(data.active)}</h1>
                   <div className="stats-bottom">
                     <h6>{}</h6>
                   </div>
                 </div>

                 <div
                   className={tileClassData}
                   style={{animationDelay: '0.1s'}}
                 >
                   <h5>{i18n.t("Recovered")}</h5>
                   <h1>{formatNumber(data.recovered)}</h1>
                   {data.todayRecovered && (<h5><sup> &uarr; {formatNumber(data.todayRecovered)}</sup></h5>)}
                 </div>

               </div>
          </div>
        );

}

export default SummaryTiles;