import React from "react";


class SingleStationItem extends React.Component {

    render() {
        let entry = this.props.entry;
        return (
            <tr>
                <td>{entry.id}</td>
                <td>{entry.name_fi}</td>
                <td>{entry.address_fi}</td>
                <td>{entry.city_fi}</td>
                <td>{entry.operator}</td>
                <td>{entry.capacity}</td>
            </tr>);
    }
}

export default SingleStationItem;