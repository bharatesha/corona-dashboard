import React from "react";
import { withNamespaces } from "react-i18next";

function Footer({ t }) {

  const statecontacturl="https://"+t('statecontacturl');

  return (
    <div>
      <h4>
        {t("footinfo")}{" "}
        <a
          href={statecontacturl}
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('statecontacturl')}
        </a>{" "}
      </h4>
      <h5>{t("contact")} <a href="mailto:contactnoldz@gmail.com">contactnoldz@gmail.com</a> </h5>
    </div>
  );
}

export default withNamespaces()(Footer);
