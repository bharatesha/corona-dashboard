import React, { useState, useEffect } from "react";
import axios from "axios";
import { withNamespaces } from "react-i18next";

import Overview from "./overview";
import PatientDetails from "./patientdetails";
import CoronaTableData from "./coronaTableData";
import { filterJson } from "../utils/common-functions";
import TitleBanner from "./titleBanner";
import Footer from "./footer";
import SportsEsportsRoundedIcon from "@material-ui/icons/SportsEsportsRounded";
import { FormControl, Select, MenuItem, StepLabel, InputLabel } from "@material-ui/core";
import queryString from 'query-string';


import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import i18n from "../i18n";

const history = require("history").createBrowserHistory;

function Home({ props, t }) {

  const [state, setState] = useState("Karnataka");

  const [states, setStates] = useState([]);
  ///const [timeseries, setTimeseries] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");
  const [stateTestData, setStateTestData] = useState({});
  const [stateDistrictWiseData, setStateDistrictWiseData] = useState({});
  const [activityLog, setActivityLog] = useState([]);
  const [patientsData, setPatientsData] = useState([]);
  const [patientStateData, setPatientStateData] = useState([]);
  const [lang, setLang] = React.useState("en");

  const [fetched, setFetched] = useState(false);

  const [isInitOnLoad, SetIsInitOnLoad] = useState(false);

  useEffect(() => {
    if (fetched === false) {
      getStates();
    }

    if(fetched && patientStateData && !isInitOnLoad ){
       initOnLoad();
    }

  }, [fetched, patientStateData, isInitOnLoad]);

  const getStates = async () => {
    try {
      const [
        response,
        stateDistrictWiseResponse,
        updateLogResponse,
        stateTestResponse,
        patients,
      ] = await Promise.all([
        axios.get("https://api.covid19india.org/data.json"),
        axios.get("https://api.covid19india.org/state_district_wise.json"),
        axios.get("https://api.covid19india.org/updatelog/log.json"),
        axios.get("https://api.covid19india.org/state_test_data.json"),
        axios.get("https://api.covid19india.org/raw_data.json"),
      ]);
      setStates(response.data.statewise);
      ///setTimeseries(validateCTS(response.data.cases_time_series));
      setLastUpdated(response.data.statewise[0].lastupdatedtime);
      setStateTestData(stateTestResponse.data.states_tested_data.reverse());
      setStateDistrictWiseData(stateDistrictWiseResponse.data);
      setActivityLog(updateLogResponse.data);
      setPatientsData(patients.data.raw_data);
      setPatientStateData(
        filterJson(patients.data.raw_data, "detectedstate", state)
      );
      initOnLoad();
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };

  const initOnLoad = () => {
    let path = history(props).location.pathname;
    let stateval = queryString.parse(history(props).location.search).state;
    if(stateval)setStateData(stateval);

    if (path.startsWith("/kn")) {
      i18n.changeLanguage("kn");
      setLang("kn");
    }
    SetIsInitOnLoad(true);
  };

  const handleLanguageChange = (event) => {
    let val = event.target.value;
    let path = history(props).location.pathname;
    i18n.changeLanguage(val);
    setLang(val);
    if (val === "kn" && !path.startsWith("/kn")) {
      history(props).push("/kn/corona?state="+encodeURI(state));
    } else {
      history(props).push("/corona?state="+encodeURI(state));
    }
  };

  const shareUrl = encodeURI(t("shareUrl")+"?state="+state);
  const shareTitle = t("covidShareTitle");

  const renderStateSelect = () => {

       let stateList = states.map(item => item.state);
       stateList.sort();
       return stateList.map((state, v)=>{
            return (
               <MenuItem value={state} key={state}>{t(state)}</MenuItem>
            )
       });

  }

  const setStateData = (stateVal) => {
       setPatientStateData(filterJson(patientsData, "detectedstate", stateVal));
       setState(stateVal);
  }

  const handleStateChange = (event) => {
     let stateVal = event.target.value;
     setStateData(stateVal);
     let stateUrl = "/corona?state="+stateVal;
     if(lang === 'kn'){
        stateUrl = '/kn'+stateUrl;
     }
     history(props).push(stateUrl);
  }

  return (
    <div>
      {fetched && (
        <React.Fragment>
          <FormControl style={{ flexFlow: "row" }}>
            <StepLabel style={{ marginRigh: "10px" }}>Language</StepLabel>
            <Select value={lang} onChange={handleLanguageChange} disableUnderline>
              <MenuItem value="en">English</MenuItem>
              <MenuItem value="kn">ಕನ್ನಡ</MenuItem>
            </Select>
          </FormControl>

          <div className="Home">
            <h1 style={{ fontSize: "1.6em", marginTop: "0px" }}>
              {t("covidTitle")}
            </h1>

            <div>
              <WhatsappShareButton
                style={{ marginRight: "30px" }}
                url={shareUrl}
                title={shareTitle}
                separator=":: "
                className="Demo__some-network__share-button"
              >
                <WhatsappIcon size={50} round />
              </WhatsappShareButton>

              <FacebookShareButton
                url={shareUrl}
                title={shareTitle}
                separator=":: "
                className="Demo__some-network__share-button"
              >
                <FacebookIcon size={50} round />
              </FacebookShareButton>

              <a href="/playgame" target="_blank" rel="noopener noreferrer">
                <SportsEsportsRoundedIcon
                  color="action"
                  style={{ fontSize: 60, marginLeft: "25px" }}
                >
                  Play Game
                </SportsEsportsRoundedIcon>
              </a>
            </div>


            <FormControl variant="outlined" size="small">
                <InputLabel id="demo-simple-select-outlined-label">{t('State')}</InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={state}
                  label="State"
                  onChange={handleStateChange}
                >
                  {renderStateSelect()}
                </Select>
              </FormControl>


            <TitleBanner activityLog={activityLog} />

            <Overview
              state={state}
              states={states}
              stateDistrictWiseData={stateDistrictWiseData}
              stateTestData={stateTestData}
              lastUpdated={lastUpdated}
            />

            {stateDistrictWiseData[state] && (
                <CoronaTableData
                  state={state}
                  stateDistrictWiseData={stateDistrictWiseData}
                  statePatients={patientStateData}
                />
            )}

            <div
              style={{ marginTop: "50px", width: "100%", marginBottom: "20px" }}
            >
              <PatientDetails data={patientStateData} />
            </div>
          </div>
        </React.Fragment>
      )}

      <Footer />
    </div>
  );
}

export default withNamespaces()(Home);
