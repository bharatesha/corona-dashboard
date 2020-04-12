import React, {useState, useEffect} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import i18n from '../i18n';

function MatTable(props) {

    const [districts, setDistricts] = useState({});

    useEffect(() => {
        setDistricts(props.stateDistrictWiseData);
      }, [props.stateDistrictWiseData]);

    let result = null;

    ////console.log(districts["Karnataka"]["districtData"]);
     //console.log(districts["Karnataka"]["districtData"]);

    for (var k in districts["Karnataka"]) {
            if (districts["Karnataka"].hasOwnProperty(k)) {
            //console.log(k);
               console.log(districts["Karnataka"]["districtData"]);
               result = districts["Karnataka"]["districtData"];
            }
        }

    return (
      <TableContainer component={Paper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell>{i18n.t("Id")}</TableCell>
              <TableCell align="left">{i18n.t("District")}</TableCell>
              <TableCell align="center">{i18n.t("Confirmed")}</TableCell>

            </TableRow>
          </TableHead>
          <TableBody>
            {
              ///this.districts((p, index) => {
            Object.keys(result||{}).map((state, index) => {
              return (
                 <TableRow>
                  <TableCell component="th" scope="row">
                  {index+1}
                  </TableCell>
                  <TableCell align="left"> {i18n.t(state)}</TableCell>
                  <TableCell align="center">{result[state].confirmed}</TableCell>
                </TableRow>

                );

                        })}

          </TableBody>
        </Table>
      </TableContainer>
    );

}

export default MatTable