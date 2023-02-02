import React from "react";


class SingleJourneyEntry extends React.Component {

    render() {
        let entry = this.props.entry;
        let departure_time = new Date(0);
        departure_time.setUTCSeconds(entry["departure_time"]);
        let return_time = new Date(0);
        return_time.setUTCSeconds(entry["return_time"]);
        let minutes = Math.floor(entry["duration"] / 60);

        return (
            <tr>
                <td>{departure_time.toLocaleString('en-GB')}</td>
                <td>{entry["departure_station"]}</td>
                <td>{return_time.toLocaleString('en-GB')}</td>
                <td>{entry["return_station"]}</td>
                <td>{entry["distance"]}</td>
                <td>{minutes}</td>
            </tr>
        );
    }

}

export default SingleJourneyEntry;