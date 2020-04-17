import React from 'react';
import {formatDistance} from 'date-fns';
import i18n from '../i18n';
import {formatNumber} from '../utils/common-functions';
import { Button } from '@material-ui/core';

function SummaryTiles({
    data,
    title,
    tileClass
}){

    const lastupdated = formatDistance(new Date(data.updated),  new Date());
    const tileClassData = "stats is-"+tileClass+" fadeInUp";
    let link = (title === 'India'?'/indiadetails':'/worlddetails');

    const worldDetailsButton = (
            <div className="navigationLink">
                 <Button href={link} variant="contained" size="small" disableElevation>
                   Click Here For {title} More Details
                 </Button>
            </div>
          );

    return (
       <div className="overviewstats">
         <h3>
           <b> {i18n.t(title)} </b>: <span className="subtitle">about {lastupdated} Ago </span>
         </h3>

         <div className="map-stats" style={{marginTop:'5px'}}>
                 <div className={tileClassData} style={{animationDelay: '0.1s'}}>
                   <h5>{i18n.t("Confirmed")}</h5>
                   <h1 style={{fontSize: '1.2em'}}>{formatNumber(data.cases)} </h1>
                   <h5> <span>&uarr; {formatNumber(data.todayCases)} </span></h5>
                 </div>

                 <div
                    className={tileClassData}
                    style={{animationDelay: '0.1s'}}
                  >
                    <h5>{i18n.t("Deceased")}</h5>
                    <h1 style={{fontSize: '1.2em'}}>{formatNumber(data.deaths)}</h1>
                    <h5><sup> &uarr; {formatNumber(data.todayDeaths)}</sup></h5>
                  </div>

                 <div
                   className={tileClassData}
                   style={{animationDelay: '0.1s'}}
                 >
                   <h5>{i18n.t("Active")}</h5>
                   <h1 style={{fontSize: '1.2em'}}>{formatNumber(data.active)}</h1>
                   <div className="stats-bottom">
                     <h6>{}</h6>
                   </div>
                 </div>

                 <div
                   className={tileClassData}
                   style={{animationDelay: '0.1s'}}
                 >
                   <h5>{i18n.t("Recovered")}</h5>
                   <h1 style={{fontSize: '1.2em'}}>{formatNumber(data.recovered)}</h1>
                   {data.todayRecovered && (<h5><sup> &uarr; {formatNumber(data.todayRecovered)}</sup></h5>)}
                 </div>

               </div>
               {worldDetailsButton}
          </div>
        );

}

export default SummaryTiles;