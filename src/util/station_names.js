import React from 'react';


function ShowStationNames(props) {

    let station_names = props.entry;

    return (
        <li>
            {station_names}
        </li>)

}

export default ShowStationNames;