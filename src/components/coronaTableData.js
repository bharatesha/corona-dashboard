import MaterialTable from "material-table";
import React from 'react';

import i18n from '../i18n';

import {filterJson} from '../utils/common-functions';
import CityDetails from './citydetails';

export default function({
    stateDistrictWiseData,
    statePatients
}){

   let districts = stateDistrictWiseData["Karnataka"]["districtData"];
   let tableData = [];

    Object.keys(districts).forEach((key) => {
         let item = createData(i18n.t(key),districts[key].confirmed, districts[key]["delta"].confirmed, key);
         tableData.push(item);
     });

     tableData = tableData.sort(function (l, r) { return r.confirmed - l.confirmed;});

    function createData(district, confirmed, changed, origdistrict) {
      return { district, confirmed, changed, origdistrict };
    }

    function createChildData(district, city, count) {
          return { district, city, count };
    }

    function getDistrictDetails(district){

        let districtData = filterJson(statePatients,'detecteddistrict', district);
        let resultMap = new Map();
        let result = [];

        districtData.forEach((item)=>{
           let city = item.detectedcity?item.detectedcity.trim():'Unknown';
           let count = resultMap.get(city);
           count = parseInt(count?count:0)+1;
           resultMap.set(city, count);
        });

        resultMap.forEach((k, v)=>{
            result.push(createChildData(district, v, k));
        });

        return result;
    }

    function getCityPatients(district, city){

      let districtDetails = statePatients.filter( patient => patient.detecteddistrict === district);
      let result = null;
      if(city !== 'Unknown'){
            result = districtDetails.filter( patient => patient.detectedcity === city);
      }else{
            result = districtDetails.filter( patient => patient.detectedcity === "");
      }
      return result;
    }

    return (
        <div>

          {  tableData &&
                      (
                            <MaterialTable
                       	 columns={[
                       	   { title: "ಜಿಲ್ಲೆ", field: "district"},
                       	   { title: "ದೃಢಪಡಿಸಲಾಗಿದೆ", field: "confirmed"},
                       	   { title: "ಹೊಸ ಪ್ರಕರಣಗಳು", field: "changed", type:"numeric", defaultSort:"desc"}
                       	 ]}
                       	 data={tableData}

                       	  detailPanel={rowData => {
                             return (
                               <div style={{marginLeft: '50px'}}>
                                        <MaterialTable
                                                  columns={[
                                                    { title: 'ನಗರ', field: 'city' },
                                                    { title: 'ಸಂಖ್ಯೆ', field: 'count',type:"numeric", defaultSort:"desc" }

                                                  ]}
                                                  data={getDistrictDetails(rowData.origdistrict)}
                                                  detailPanel={rowData => {
                                                   return (
                                                     <div>
                                                            <CityDetails
                                                                  data={getCityPatients(rowData.district, rowData.city)}
                                                                  isSimple={true}
                                                           />
                                                     </div>
                                                   )
                                                 }}

                                                  options={{
                                                        showTitle:false,
                                                        toolbar:false,
                                                        search:false,
                                                        paging:false,
                                                        header:false
                                                    }}
                                                />

                               </div>
                             )
                           }}

                       	 title=""

                        options={{
                               pageSizeOptions : [5, 10, tableData.length],
                               pageSize:5,

                           }}
                       />

                       )
                     }

        </div>
    );


}