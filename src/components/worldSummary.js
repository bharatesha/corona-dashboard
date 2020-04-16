import React, {useState, useEffect} from 'react';
import { NovelCovid } from 'novelcovid';
import SummaryTiles  from './summaryTiles';

function WorldSummary(){

    const [trackWorldDetails, setTrackWorldDetails] = useState({});
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        let novelCovid = new NovelCovid()
        novelCovid.all().then(res => {
                   setTrackWorldDetails(res);
                   setFetched(true);
        });
      }, []);

      return (
        <div>
           { fetched && (
                <SummaryTiles data={trackWorldDetails} title="World" tileClass="steelblue"/>
           )}
        </div>
      );

}

export default WorldSummary