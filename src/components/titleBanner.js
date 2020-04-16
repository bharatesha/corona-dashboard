import React from 'react';

import {formatDistance} from 'date-fns';

function TitleBanner({
activityLog
}){

const getTitleBanner = () => {
    activityLog.sort( (a, b) => parseInt(b.timestamp) - parseInt(a.timestamp));

    let activity = activityLog[0];
    let d = new Date(0);
    d.setUTCSeconds(activity.timestamp);

    return (formatDistance(d, new Date())+" ago : "+activity.update).toUpperCase();
}


return (
    <div className="titlebanner">{getTitleBanner()}</div>
);

}

export default TitleBanner