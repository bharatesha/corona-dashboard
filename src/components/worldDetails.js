import React, {useState, useEffect} from 'react';
import { NovelCovid } from 'novelcovid';
import MaterialTable from "material-table";
import { Button } from '@material-ui/core';
import { TablePagination } from '@material-ui/core';

function WorldDetails(){


    const [trackWorldCountryDetails, settrackWorldCountryDetails] = useState({});
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        let novelCovid = new NovelCovid();
        novelCovid.countries().then(res => {
                   settrackWorldCountryDetails(res);
                   setFetched(true);
        });
      }, []);

      /*const getCountryUrlImage = country => {
          console.log(trackWorldCountryDetails.filter( c => c.country === country));
          let url = trackWorldCountryDetails.filter( c => c.country === country);

          return "url("+url+")";
      }*/

      const backButton = (
           <div className="linkbutton">
             <Button variant="contained" href="/" disableElevation>
               Back Home
             </Button>
            </div>
      );

      return (
        <div style={{'width':'100%', textAlign:'left'}}>
           {backButton}

           { fetched && (

                     <MaterialTable
                     columns={[
                       { title: "Country", field: "country",

                       cellStyle: {
                          color: '#FFF',
                          backgroundColor: 'steelblue',
                          fontSize:'1em'
                        },

                       },
                       { title: "Cases", field: "cases", type:"numeric" },
                       { title: "Today Cases", field: "todayCases", type:"numeric", defaultSort:"desc"},
                       { title: "Active", field: "active", type:"numeric"},
                       { title: "Deaths", field: "deaths", type:"numeric"},
                       { title: "Today Deaths", field: "todayDeaths", type:"numeric" },
                       { title: "Recovered", field: "recovered", type:"numeric"},
                       { title: "Critical", field: "critical", type:"numeric"},

                     ]}
                     data={trackWorldCountryDetails}
                     title=""

                    options={{
                           pageSizeOptions : [10, 20, 30, 50, trackWorldCountryDetails.length],
                           overflowX: 'auto',
                           pageSize:30,
                           headerStyle: {  position: 'sticky', top: 0, fontSize:'1.5em'},
                           cellStyle: {fontSize:'1.2em'},
                           maxBodyHeight: '800px',

                       }}

                     components={{
                                 Pagination: props => (
                                   <TablePagination
                                     {...props}
                                     style={{width:'50px'}}
                                   />
                                 )
                               }}

                    />


           )}
            {backButton}
        </div>
      );


}


export default WorldDetails

