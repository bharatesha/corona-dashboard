import React, {useState, useEffect} from 'react';
import MaterialTable from "material-table";
import { Button } from '@material-ui/core';
import { TablePagination } from '@material-ui/core';
import axios from 'axios';

function IndiaDetails(){


    const [states, setStates] = useState([]);
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
          ] = await Promise.all([
            axios.get('https://api.covid19india.org/data.json'),
          ]);
          setStates(response.data.statewise);
          setFetched(true);
        } catch (err) {
          console.log(err);
        }
      };

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
                       { title: "State", field: "state",

                       cellStyle: {
                          color: '#FFF',
                          backgroundColor: 'steelblue',
                          fontSize:'0.8em'
                        },

                       },
                       { title: "Cases", field: "confirmed", type:"numeric" },
                       { title: "Today Cases", field: "deltaconfirmed", type:"numeric", defaultSort:"desc"},
                       { title: "Active", field: "active", type:"numeric"},
                       { title: "Deaths", field: "deaths", type:"numeric"},
                       { title: "Today Deaths", field: "deltadeaths", type:"numeric" },
                       { title: "Recovered", field: "recovered", type:"numeric"},
                       { title: "Today Recovered", field: "deltarecovered", type:"numeric"},

                     ]}
                     data={states}
                     title=""

                    options={{
                           pageSizeOptions : [10, 20, 30, 50, states.length],
                           overflowX: 'auto',
                           pageSize:30,
                           headerStyle: {  position: 'sticky', top: 0, fontSize:'1.2em'},
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


export default IndiaDetails

