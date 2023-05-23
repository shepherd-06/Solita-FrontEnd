import React from "react";
import SingleJourneyEntry from "../util/journey_item";
import "../css/App.css";
import Spinner from "../util/spinner";

class JourneyView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      journey: [],
      page: null,

      is_spinner: false,
      is_success: false,
      is_error: false,
    };
  }

  getJourneyData(page_number = 1) {
    /**
     * main func.
     * it runs the api scheduler.
     */
    let base_url = process.env.REACT_APP_BASE_URL;
    let url = base_url + "/get_journey/?page=" + page_number;

    this.setState({
      is_spinner: true,
    });

    fetch(url)
      .then((res) => res.json())
      .then(
        (result) => {
          const resultPage = result["page"];
          const resultData = result["data"];

          localStorage.setItem("journey", JSON.stringify(resultData));
          localStorage.setItem(
            "journeyPage",
            JSON.stringify({
              page: resultPage,
            })
          );
          localStorage.setItem(
            "journeyTime",
            JSON.stringify({
              setTime: new Date(),
            })
          );

          this.setState({
            page: resultPage,
            journey: resultData,
            is_spinner: false,
            is_success: true,
            is_error: resultData.length === 0,
          });
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          console.log(error);
          this.setState({
            is_spinner: false,
            is_error: true,
          });
        }
      );
  }

  componentDidMount() {
    // serve from localStorage if exist. within 30 minutes of last data fetch.

    const journeyTime = localStorage.getItem("journeyTime");
    let timeDifferenceInMinutes = 0;

    if (journeyTime !== null) {
      const storedTimestamp = new Date(journeyTime).getTime();
      const currentTime = new Date().getTime(); 
      timeDifferenceInMinutes = Math.floor((currentTime - storedTimestamp) / (1000 * 60));
    }

    if (journeyTime === null || timeDifferenceInMinutes >= 30) {
      // fetch new data.
      this.getJourneyData();
    } else {
      // show old data.
      const storedJourneyData = localStorage.getItem("journey");
      const storedJourneyPage = localStorage.getItem("journeyPage");
      const parsedJourneyPage = JSON.parse(storedJourneyPage)["page"];

      this.setState({
        page: parsedJourneyPage,
        journey: JSON.parse(storedJourneyData),
        is_spinner: false,
        is_success: true,
        is_error: JSON.parse(storedJourneyData).length === 0,
      });
    }
  }

  load_previous_page() {
    this.getJourneyData(this.state.page.current - 1);
  }

  load_next_page() {
    this.getJourneyData(this.state.page.current + 1);
  }

  render() {
    return (
      <div className="container" style={{ paddingBottom: "15px" }}>
        {/* spinner */}
        {this.state.journey.length === 0 && this.state.is_spinner && (
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4">
              <div
                className="row"
                style={{
                  position: "relative",
                  marginTop: "20%",
                  paddingLeft: "20%",
                }}
              >
                <div className="vertical-center">
                  <Spinner />
                  <p className="h3">Loading...</p>
                </div>
              </div>
            </div>
            <div className="col-md-4"> </div>
          </div>
        )}

        {/* error or no data */}
        {this.state.is_error && (
          <div>
            <h1 className="display">We are sorry!</h1>
            <h3 className="h3">
              We are unable to fetch any information from the server!
            </h3>
          </div>
        )}

        {this.state.journey.length !== 0 && this.state.is_success && (
          <div className="journey_view">
            <table className="table">
              <thead>
                <tr className="journey_header">
                  <th scope="col">Departure Time</th>
                  <th scope="col">Departure Station</th>
                  <th scope="col">Return Time</th>
                  <th scope="col">Return Station</th>
                  <th scope="col">Distance (KM)</th>
                  <th scope="col">Duration (Minutes)</th>
                </tr>
              </thead>

              <tbody>
                {this.state.journey.map((value, index) => {
                  return (
                    <SingleJourneyEntry
                      entry={value}
                      key={index}
                    ></SingleJourneyEntry>
                  );
                })}
              </tbody>
            </table>

            {/* pagination footer here */}
            <div className="d-flex justify-content-center">
              <div className="col-lg-3">{/* empty */}</div>
              <div className="col-lg-6">
                {/* middle - pagination */}
                <div className="row">
                  <div className="col-sm-2">
                    {this.state.page.has_previous && (
                      <button
                        type="button"
                        className="btn page_btn"
                        onClick={this.load_previous_page.bind(this)}
                      >
                        Previous
                      </button>
                    )}
                  </div>
                  <div className="col-lg-8">
                    <blockquote className="blockquote text-center">
                      <p className="mb-0">Page: {this.state.page.current}</p>
                    </blockquote>
                  </div>
                  <div className="col-sm-2">
                    {this.state.page.has_next && (
                      <button
                        type="button"
                        className="btn page_btn"
                        onClick={this.load_next_page.bind(this)}
                      >
                        Next
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-3">{/* empty -  */}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default JourneyView;
