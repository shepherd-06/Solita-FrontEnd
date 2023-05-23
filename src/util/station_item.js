import React from "react";
import { Link, withRouter } from "react-router-dom";
import "../css/App.css";

class SingleStationItem extends React.Component {
  handleClick = () => {
    const { entry } = this.props;
    // TODO: add the page change here as well.
  };

  render() {
    let entry = this.props.entry;
    return (
      <tr
        className="table_row"
        style={{ cursor: "pointer" }}
        onClick={this.handleClick.bind()}
      >
        <th scope="row">{entry.id}</th>
        <td>{entry.name_fi}</td>
        <td>{entry.address_fi}</td>
        <td>{entry.city_fi}</td>
        <td>{entry.operator}</td>
        <td>{entry.capacity}</td>
        <Link
          to="/single_station"
          state={{ station: entry }}
          type="button"
          className="btn btn-outline-success"
        >
          View Details
        </Link>
      </tr>
    );
  }
}

export default SingleStationItem;
