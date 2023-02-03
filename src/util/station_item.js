import React from "react";
import { Link } from "react-router-dom";
import '../css/App.css';


class SingleStationItem extends React.Component {

    render() {
        let entry = this.props.entry;
        return (
            // <Link to="single_station">
            <tr className="table_row">
                <th scope="row">{entry.id}</th>
                <td>{entry.name_fi}</td>
                <td>{entry.address_fi}</td>
                <td>{entry.city_fi}</td>
                <td>{entry.operator}</td>
                <td>{entry.capacity}</td>
                <Link to="/single_station"
                    state={{ station: entry }}
                    type="button" className="btn btn-outline-success">
                    View Details
                </Link>
            </tr>
            // </Link>
        );
    }
}

export default SingleStationItem;