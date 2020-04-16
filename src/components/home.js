import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { withNamespaces } from 'react-i18next';

import Overview from './overview';
import DistrictDetails from './districtdetails';
import CoronaTableData from './coronaTableData';
import {filterJson} from '../utils/common-functions';
import TitleBanner from './titleBanner';


import { FacebookShareButton, FacebookIcon, WhatsappIcon, WhatsappShareButton } from  "react-share";

function Home({props,t}) {

    const [states, setStates] = useState([]);
    ///const [timeseries, setTimeseries] = useState([]);
    const [lastUpdated, setLastUpdated] = useState('');
    const [stateTestData, setStateTestData] = useState({});
    const [stateDistrictWiseData, setStateDistrictWiseData] = useState({});
    const [activityLog, setActivityLog] = useState([]);
    const [patients, setPatients] = useState([]);

    const [patientStateData, setPatientStateData] = useState([]);

  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    try {
      const [
        response,
        stateDistrictWiseResponse,
        updateLogResponse,
        stateTestResponse,
        patients
      ] = await Promise.all([
        axios.get('https://api.covid19india.org/data.json'),
        axios.get('https://api.covid19india.org/state_district_wise.json'),
        axios.get('https://api.covid19india.org/updatelog/log.json'),
        axios.get('https://api.covid19india.org/state_test_data.json'),
        axios.get('https://api.covid19india.org/raw_data.json'),
      ]);
      setStates(response.data.statewise);
      ///setTimeseries(validateCTS(response.data.cases_time_series));
      setLastUpdated(response.data.statewise[0].lastupdatedtime);
      setStateTestData(stateTestResponse.data.states_tested_data.reverse());
      setStateDistrictWiseData(stateDistrictWiseResponse.data);
      setActivityLog(updateLogResponse.data);
      setPatients(patients.data);
      setPatientStateData(filterJson(patients.data.raw_data,'detectedstate', 'Karnataka'));
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };


const shareUrl = 'http://www.noldz.com';
const title = t('covidShareTitle');

  return (
    <div>
      {fetched && (
        <React.Fragment>
          <div className="Home">
                          <h1 style={{fontSize:'1.6em'}}>{t('covidTitle')}</h1>

                          <div>
                            <WhatsappShareButton style={{marginRight:'30px'}}
                               url={shareUrl}
                               title={title}
                               separator=":: "
                               className="Demo__some-network__share-button"
                             >
                                  <WhatsappIcon size={50} round />
                             </WhatsappShareButton>

                             <FacebookShareButton
                                  url={shareUrl}
                                  title={title}
                                  separator=":: "
                                  className="Demo__some-network__share-button"
                                >
                                 <FacebookIcon size={50} round />
                            </FacebookShareButton>
                        </div>

                        <TitleBanner activityLog={activityLog} />

                  <Overview
                                  states={states}
                                  stateDistrictWiseData={stateDistrictWiseData}
                                  stateTestData={stateTestData}
                                  lastUpdated={lastUpdated}
                                />

                  <CoronaTableData
                             stateDistrictWiseData={stateDistrictWiseData}
                             statePatients={patientStateData}
                             />
                   <div style={{'marginTop': '50px','width': '100%','marginBottom': '20px' }}>
                        <DistrictDetails
                            data={patientStateData}
                        />
                   </div>
          </div>
        </React.Fragment>
        )}
    </div>
  );
}

export default withNamespaces()(Home);