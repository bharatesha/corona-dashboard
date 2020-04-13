import React, {useState, useEffect} from 'react';
import axios from 'axios';
import MaterialTable from "material-table";

import i18n from '../i18n';

export default function (props) {

    const [patients, setPatients] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
         if (fetched === false) {
           getStates();
         }
       }, [fetched]);


   const getStates = async () => {
       try {
         const [
           response
         ] = await Promise.all([
           axios.get('https://api.covid19india.org/raw_data.json'),
         ]);
         //let result = filterJson(response.data.raw_data, 'Bengaluru').sort((a, b) => a.agebracket.localeCompare(b.agebracket));
         let result = filterJson(response.data.raw_data, 'Karnataka').sort(function (l, r) { return l.patientnumber - r.patientnumber;});
         //console.log(result);
         //console.log(response.data.raw_data);
         setPatients(result);
         setFetched(true);
       } catch (err) {
         console.log(err);
       }
     };


    function filterJson(data, text) {
      const lcText = text.toString().toLowerCase(); // calculate this once
      return data?.filter(
        e => (
          // Added initial opening brace
          (e.detectedstate.toLowerCase().indexOf(lcText) === 0)
        )// added closing brace
      );
    }

    return (
         <div style={{'marginTop': '50px','width': '100%','marginBottom': '20px', 'textTransform': 'lowercase' }}>
           <MaterialTable
             columns={[
               { title: "ಸಂಖ್ಯೆ", field: "statepatientnumber",defaultSort:"desc",
                    customSort: (a, b) => {
                           //console.log(parseInt(a.statepatientnumber.substring(0,5),10));
                           a=parseInt(a.statepatientnumber.substring(4), 10);
                           b=parseInt(b.statepatientnumber.substring(4), 10);
                           return a - b;

                    }
               },
               { title: "ಘೋಷಿತ ದಿನಾಂಕ", field: "dateannounced", type: "date",

                  customSort: (a, b) => {
                        var aparts = a.dateannounced.split('/');
                        var adate = new Date(aparts[2], aparts[1] - 1, aparts[0]);

                        var bparts = b.dateannounced.split('/');
                        var bdate = new Date(bparts[2], bparts[1] - 1, bparts[0]);

                        return adate - bdate;

                   }
               },
               { title: "ಜಿಲ್ಲೆ", field: "detecteddistrict" },
               { title: "ನಗರ", field: "detectedcity" },
               { title: "ಟಿಪ್ಪಣಿಗಳು", field: "notes" }
             ]}
             data={patients}
             title="ಇತ್ತೀಚಿನ ಮಾಹಿತಿಗಳು"

            options={{
                   pageSizeOptions : [5, 10, 50, 100, 200]
               }}

           />
         </div>
       );

}