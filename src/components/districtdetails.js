import React from 'react';
import MaterialTable from "material-table";

import i18n from '../i18n';

import {filterJson} from '../utils/common-functions';

export default function ({
    patients
}){

    let tableData = filterJson(patients.raw_data,'detectedstate', 'Karnataka').sort(function (l, r) { return l.patientnumber - r.patientnumber;});

    return (
         <div style={{'marginTop': '50px','width': '100%','marginBottom': '20px' }}>
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
               //{ title: "ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ", field: "currentstatus" },
               { title: "ಟಿಪ್ಪಣಿಗಳು", field: "notes" }
             ]}
             data={tableData}
             title="ಇತ್ತೀಚಿನ ಮಾಹಿತಿಗಳು"

            options={{
                   pageSizeOptions : [5, 10, 50, 100, 200],
                   overflowX: 'auto',
                   pageSize:10
               }}
           />
         </div>
       );

}