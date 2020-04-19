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
import { FormControl, Select, MenuItem, StepLabel } from "@material-ui/core";

import {
  FacebookShareButton,
  FacebookIcon,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";
import i18n from "../i18n";

const history = require("history").createBrowserHistory;

function Home({ props, t }) {
  const [states, setStates] = useState([]);
  ///const [timeseries, setTimeseries] = useState([]);
  const [lastUpdated, setLastUpdated] = useState("");
  const [stateTestData, setStateTestData] = useState({});
  const [stateDistrictWiseData, setStateDistrictWiseData] = useState({});
  const [activityLog, setActivityLog] = useState([]);

  const [patientStateData, setPatientStateData] = useState([]);
  const [lang, setLang] = React.useState("en");

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
      setPatientStateData(
        filterJson(patients.data.raw_data, "detectedstate", "Karnataka")
      );
      changeLanguageOnLoad();
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };

  const changeLanguageOnLoad = () => {
    let path = history(props).location.pathname;
    if (path === "/kn" || path === "/kn/corona") {
      i18n.changeLanguage("kn");
      setLang("kn");
    }
  };

  const handleChange = (event) => {
    let val = event.target.value;
    let path = history(props).location.pathname;
    i18n.changeLanguage(val);
    setLang(val);
    if (val === "kn" && (path !== "/kn" || path !== "/kn/corona")) {
      history(props).push("/kn/corona");
    } else {
      history(props).push("/corona");
    }
  };

  const shareUrl = t("shareUrl");
  const shareTitle = t("covidShareTitle");

  return (
    <div>
      {fetched && (
        <React.Fragment>
          <FormControl style={{ flexFlow: "row" }}>
            <StepLabel style={{ marginRigh: "10px" }}>Language</StepLabel>
            <Select value={lang} onChange={handleChange} disableUnderline>
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
