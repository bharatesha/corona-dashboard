import React from 'react';
import { withNamespaces } from 'react-i18next';

function Footer({ t }){

return (
<div>
    <h4>{t('footinfo')}  <a href="https://covid19.karnataka.gov.in" target="_blank" rel="noopener noreferrer">covid19.karnataka.gov.in</a> </h4>
    <h5>{t('contact')}</h5>
</div>
);

}

export default withNamespaces()(Footer)