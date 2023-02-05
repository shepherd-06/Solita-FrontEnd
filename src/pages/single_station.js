import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'


function SingleStationView() {

    let { state } = useLocation();
    let station = state["station"];
    const [startFrom, setStartFrom] = useState(0);
    const [returnTo, setReturnTo] = useState(0);

    const base_url = process.env.REACT_APP_BASE_URL;
    const station_data_url = base_url + "/ops/station/?station_id=" + station["id"];

    fetch(station_data_url)
        .then(res => res.json())
        .then(
            (result) => {
                const data = result.data;
                setStartFrom(data["start_from"]);
                setReturnTo(data["return_to"]);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                console.log(error);
            }
        )

    return (
        <div className='container'>
            <div className='row'>
                <br />
                <div className='col-lg-6'>
                    <h1 className='display-4'>
                        Station: {station["name_fi"]}
                    </h1>
                    <p>
                        Address: {station["address_fi"] + " " + station["city_fi"]}
                    </p>
                    <p>
                        Journey's Started from {station["name_fi"]}: {startFrom}
                    </p>
                    <p>
                        Journey's Ended at {station["name_fi"]}: {returnTo}
                    </p>
                </div>
                <div className='col-lg-6'>
                    {/* add map view here */}
                </div>
            </div>
        </div>
    )
}

export default SingleStationView;