import React from 'react';
import MaterialTable from "material-table";

export default function ({
    data,
    isSimple
}){

    let pageSize = isSimple?5:5;
    isSimple=!isSimple;

    return (
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
             data={data}
             title="ಇತ್ತೀಚಿನ ಮಾಹಿತಿಗಳು"

            options={{
                   pageSizeOptions : [5, 10, 50, data.length],
                   overflowX: 'auto',
                   pageSize:parseInt(pageSize),
                   showTitle:Boolean(isSimple),
                   toolbar:Boolean(isSimple),
                   search:Boolean(isSimple),
                   paging:Boolean(isSimple),
                   header:Boolean(isSimple)

               }}
           />
       );

}