import React from 'react';
import SingleStationItem from '../util/station_item';
import '../css/App.css';

class StationListView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            station: [],
            page: null,
        };
    }

    getAllStation(page_number = 1) {
        /**
         * main func.
         * it runs the api scheduler.
         */
        let base_url = process.env.REACT_APP_BASE_URL;
        let url = base_url + "/get_station/?page=" + page_number;
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        page: result["page"],
                        station: result["data"],
                    })
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                (error) => {
                    console.log(error);
                }
            )
    }

    componentDidMount() {
        this.getAllStation();
    }

    load_previous_page() {
        this.getAllStation(this.state.page.current - 1);
    }

    load_next_page() {
        this.getAllStation(this.state.page.current + 1);
    }

    render() {
        return (
            <div className='container'>
                {
                    this.state.station.length === 0 &&
                    <div className="info">
                        <h1 className="display">
                            Sorry!
                        </h1>
                        <h3 className="h3">
                            We are unable to fetch any information from the server!
                            Try again later!
                        </h3>
                    </div>
                }

                {this.state.station.length !== 0 &&
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Address</th>
                                    <th scope="col">City</th>
                                    <th scope="col">Operator</th>
                                    <th scope="col">Capacity</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.station.map((value, index) => {
                                        return <SingleStationItem
                                            entry={value}
                                            key={index}
                                        ></SingleStationItem>
                                    })
                                }
                            </tbody>
                        </table>

                        <div className="d-flex justify-content-center">
                            <div className="col-lg-3">
                                {/* empty */}
                            </div>
                            <div className="col-lg-6">
                                {/* middle - pagination */}
                                <div className="row">

                                    <div className="col-sm-2">
                                        {
                                            this.state.page.has_previous &&
                                            <button type="button"
                                                className="btn btn-dark"
                                                onClick={this.load_previous_page.bind(this)}>
                                                Previous
                                            </button>
                                        }
                                    </div>
                                    <div className="col-lg-8">
                                        <blockquote className="blockquote text-center">
                                            <p className="mb-0">Page: {this.state.page.current}</p>
                                        </blockquote>
                                    </div>
                                    <div className="col-sm-2">
                                        {
                                            this.state.page.has_next &&
                                            <button type="button"
                                                className="btn btn-dark"
                                                onClick={this.load_next_page.bind(this)}>
                                                Next
                                            </button>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                {/* empty -  */}
                            </div>
                        </div>
                    </div>
                }
            </div>
        )
    }

}

export default StationListView;
