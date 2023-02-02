import React from "react";
import SingleJourneyEntry from "../util/journey_item";

class JourneyView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            journey: [],
            page: null,
        };
    }

    getJourneyData(page_number = 1) {
        /**
         * main func.
         * it runs the api scheduler.
         */
        let url = "http://localhost:8000/ops/get_journey/?page=".concat(page_number)
        fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        page: result["page"],
                        journey: result["data"],
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
        this.getJourneyData();
    }

    load_previous_page() {
        this.getJourneyData(this.state.page.current - 1);
    }

    load_next_page() {
        this.getJourneyData(this.state.page.current + 1);
    }

    render() {
        console.log(this.state.page);
        return (
            <div>
                {this.state.journey.length === 0 &&
                    <div className="info">
                        <h1 className="display">
                            We are sorry!
                        </h1>
                        <h3 className="h3">
                            We are unable to fetch any information from the server!
                            Try again later!
                        </h3>
                    </div>
                }

                {this.state.journey.length !== 0 &&
                    <div>
                        <table className="table">
                            <thead>
                                <tr>
                                    <th scope="col">Departure Time</th>
                                    <th scope="col">Departure Station</th>
                                    <th scope="col">Return Time</th>
                                    <th scope="col">Return Station</th>
                                    <th scope="col">Distance (KM)</th>
                                    <th scope="col">Duration (Minutes)</th>
                                </tr>
                            </thead>

                            <tbody>
                                {
                                    this.state.journey.map((value, index) => {
                                        return <SingleJourneyEntry
                                            entry={value}
                                            key={index}
                                        ></SingleJourneyEntry>
                                    })
                                }
                            </tbody>
                        </table>

                        {/* pagination footer here */}
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
        );
    }
}

export default JourneyView;