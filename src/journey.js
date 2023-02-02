import React from "react";
import SingleJourneyEntry from "./journey_item";

class JourneyView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            journey: [],
            page: null,
        };
    }

    getJourneyData() {
        /**
         * main func.
         * it runs the api scheduler.
         */
        fetch("http://localhost:8000/ops/get_journey/?page=1")
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

    render() {
        console.log(this.state.journey);
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
                }
            </div>
        );
    }
}

export default JourneyView;