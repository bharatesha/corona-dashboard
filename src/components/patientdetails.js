import React from "react";
import MaterialTable from "material-table";
import i18n from "../i18n";
import LinkIcon from "@material-ui/icons/Link";
import CloseIcon from "@material-ui/icons/Close";

export default function ({ data, isSimple }) {
  let pageSize = isSimple ? 5 : 5;
  isSimple = !isSimple;

  const backButton = (row) => {
    let source = row.source1;
    if (source) {
      return (
        <a href={source} target="_blank" rel="noopener noreferrer">
          <LinkIcon />
        </a>
      );
    }
    return <CloseIcon />;
  };

  return (
    <MaterialTable
      columns={[
        {
          title: i18n.t("No"),
          field: "statepatientnumber",
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
          defaultSort: "desc",

          customSort: (a, b) => {
            var aparts = a.dateannounced.split("/");
            var adate = new Date(aparts[2], aparts[1] - 1, aparts[0]);

            var bparts = b.dateannounced.split("/");
            var bdate = new Date(bparts[2], bparts[1] - 1, bparts[0]);

            let result = adate - bdate;

            if (result === 0) {
              a = parseInt(a.statepatientnumber.substring(4), 10);
              b = parseInt(b.statepatientnumber.substring(4), 10);
              result = a - b;
            }
            return result;
          },
        },
        {
          title: i18n.t("District"),
          field: "detecteddistrict",
          render: (rowData) => i18n.t(rowData.detecteddistrict),
        },
        { title: i18n.t("City"), field: "detectedcity" },
        { title: i18n.t("Notes"), field: "notes" },
        {
          title: i18n.t("Status"),
          field: "currentstatus",
          render: (rowData) => i18n.t(rowData.currentstatus),
        },
        { title: i18n.t("Age"), field: "agebracket" },
        {
          title: i18n.t("Gender"),
          field: "gender",
          render: (rowData) => i18n.t(rowData.gender),
        },
        {
          title: i18n.t("Source"),
          field: "source1",
          render: (rowData) => backButton(rowData),
        },
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
        paging: Boolean(isSimple),
        header: Boolean(isSimple),
      }}
    />
  );
}
