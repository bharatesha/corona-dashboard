import React from "react";
import MaterialTable from "material-table";
import i18n from "../i18n";
import { TablePagination } from "@material-ui/core";

export default function ({ data, isSimple }) {
  let pageSize = isSimple ? 5 : 5;
  isSimple = !isSimple;

  return (
    <MaterialTable
      columns={[
        {
          title: i18n.t("No"),
          field: "statepatientnumber",
          defaultSort: "desc",
          customSort: (a, b) => {
            a = parseInt(a.statepatientnumber.substring(4), 10);
            b = parseInt(b.statepatientnumber.substring(4), 10);
            return a - b;
          },
        },
        {
          title: i18n.t("Announced Date"),
          field: "dateannounced",
          type: "date",

          customSort: (a, b) => {
            var aparts = a.dateannounced.split("/");
            var adate = new Date(aparts[2], aparts[1] - 1, aparts[0]);

            var bparts = b.dateannounced.split("/");
            var bdate = new Date(bparts[2], bparts[1] - 1, bparts[0]);

            return adate - bdate;
          },
        },
        //{ title: "ಪ್ರಸ್ತುತ ಸ್ಥಿತಿ", field: "currentstatus" },
        { title: i18n.t("Notes"), field: "notes" },
      ]}
      data={data}
      title=""
      options={{
        pageSizeOptions: [5, 10, 50, data.length],
        overflowX: "auto",
        pageSize: parseInt(pageSize),
        showTitle: Boolean(isSimple),
        toolbar: Boolean(isSimple),
        search: Boolean(isSimple),
        header: Boolean(isSimple),
      }}

      components={{
                  Pagination: (props) => (
                    <TablePagination {...props} style={{ width: "100%",  maxWidth:"100%" }} />
                  ),
                }}


    />
  );
}
