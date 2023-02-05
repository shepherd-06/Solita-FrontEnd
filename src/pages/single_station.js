import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'
import '../css/App.css';
import MapView from '../util/map_view';
import ShowStationNames from '../util/station_names';


function SingleStationView() {

    let { state } = useLocation();
    let station = state["station"];
    const [startFrom, setStartFrom] = useState(0);
    const [returnTo, setReturnTo] = useState(0);
    const [avgFrom, setAvgFrom] = useState(0);
    const [avgTo, setAvgTo] = useState(0);
    const [popDepart, setPopDepart] = useState([]);
    const [popReturn, setPopReturn] = useState([]);

    const base_url = process.env.REACT_APP_BASE_URL;
    const station_data_url = base_url + "/station/?station_id=" + station["id"];

    fetch(station_data_url)
        .then(res => res.json())
        .then(
            (result) => {
                const data = result.data;
                setStartFrom(data["start_from"]);
                setReturnTo(data["return_to"]);
                setAvgFrom(data["avg_departure_distance"]);
                setAvgTo(data["avg_return_distance"]);
                setPopDepart(data["popular_departure"]);
                setPopReturn(data["popular_return"]);
                console.log(data);
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
            <div className='row sin-station-free-space'>
                <div className='col-lg-6'>
                    <h1 className='display-4'>
                        Station: {station["name_fi"]}
                    </h1>
                    <p className='sin-station-p'>
                        Address: {station["address_fi"] + " " + station["city_fi"]}
                    </p>
                    <p className='sin-station-p'>
                        Journey's Started from {station["name_fi"]}: {startFrom}
                    </p>
                    <p className='sin-station-p'>
                        Journey's Ended at {station["name_fi"]}: {returnTo}
                    </p>
                    <p className='sin-station-p'>
                        Average Distance for Journey's Starting from {station["name_fi"]}: {(avgFrom / 1000).toFixed(2)} km
                    </p>
                    <p className='sin-station-p'>
                        Average Distance for Journey's Returning to {station["name_fi"]}: {(avgTo / 1000).toFixed(2)} km
                    </p>
                    <p className='sin-station-p'>
                        Top 5 Popular Departure Station:
                        <ul>
                            {
                                popDepart.map((value, index) => {
                                    return <ShowStationNames
                                        entry={value}
                                        key={index}
                                    ></ShowStationNames>
                                })
                            }
                        </ul>
                    </p>
                    <p className='sin-station-p'>
                        Top 5 Popular Return Station:
                        <ul>
                            {
                                popReturn.map((value, index) => {
                                    return <ShowStationNames
                                        entry={value}
                                        key={index}
                                    ></ShowStationNames>
                                })
                            }
                        </ul>
                    </p>
                </div>
                <div className='col-lg-6'>
                    {/* add map view here */}
                    <MapView station_name={station["name_fi"]} coordinate={station["coordinate"]} />
                </div>
            </div>
        </div>
    )
}

export default SingleStationView;