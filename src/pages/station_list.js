import React from "react";
import SingleStationItem from "../util/station_item";
import "../css/App.css";
import Spinner from "../util/spinner";
import InfinitySpinner from "../util/infinity_spinner";

class StationListView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      station: [],
      page: null,

      is_spinner: true,
      is_success: false,
      is_error: false,
      is_btn_spinner: false,
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
      .then((res) => res.json())
      .then(
        (result) => {
          const stationPage = result["page"];
          const stationData = result["data"];

          localStorage.setItem("station", JSON.stringify(stationData));
          localStorage.setItem(
            "stationPage",
            JSON.stringify({
              page: stationPage,
            })
          );
          localStorage.setItem(
            "stationTime",
            JSON.stringify({
              setTime: new Date(),
            })
          );

          this.setState({
            page: stationPage,
            station: stationData,
            is_spinner: false,
            is_success: true,
            is_error: false,
            is_btn_spinner: false,
          });
        },
        (error) => {
          console.log(error);
          this.setState({
            is_spinner: false,
            is_success: false,
            is_error: true,
          });
        }
      );
  }

  componentDidMount() {
    const stationTime = localStorage.getItem("stationTime");
    let timeDifferenceInMinutes = 0;

    if (stationTime !== null) {
      const storedTimestamp = new Date(stationTime).getTime();
      const currentTime = new Date().getTime();
      timeDifferenceInMinutes = Math.floor(
        (currentTime - storedTimestamp) / (1000 * 60)
      );
    }

    if (stationTime === null) {
      // fetch new data.
      this.getAllStation();
    } else {
      // show old data.
      const storedStationData = localStorage.getItem("station");
      const storedStationPage = localStorage.getItem("stationPage");
      const parsedStationPage = JSON.parse(storedStationPage)["page"];

      this.setState({
        page: parsedStationPage,
        station: JSON.parse(storedStationData),
        is_spinner: false,
        is_success: true,
        is_error: false,
      });
    }
  }

  load_previous_page() {
    this.setState({
      is_btn_spinner: true,
    });
    this.getAllStation(this.state.page.current - 1);
  }

  load_next_page() {
    this.setState({
      is_btn_spinner: true,
    });
    this.getAllStation(this.state.page.current + 1);
  }

  render() {
    return (
      <div className="container">
        {this.state.station.length === 0 && this.state.is_spinner && (
          <div className="row" style={{ marginLeft: "40%" }}>
            <Spinner></Spinner>
          </div>
        )}

        {this.state.is_error && (
          <div className="info">
            <h1 className="display">Sorry!</h1>
            <h3 className="h3">
              We are unable to fetch any information from the server! Try again
              later!
            </h3>
          </div>
        )}

        {this.state.station.length !== 0 && this.state.is_success && (
          <div style={{ backgroundColor: "aliceblue", borderRadius: "15px" }}>
            <table className="table">
              <thead style={{ fontSize: "larger" }}>
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
                {this.state.station.map((value, index) => {
                  return (
                    <SingleStationItem
                      entry={value}
                      key={index}
                    ></SingleStationItem>
                  );
                })}
              </tbody>
            </table>

            <div className="d-flex justify-content-center">
              <div className="col-lg-3">{/* empty */}</div>
              <div className="col-lg-6">
                {/* middle - pagination */}
                <div className="row">
                  <div className="col-sm-2">
                    {this.state.page.has_previous && (
                      <button
                        type="button"
                        className="btn btn-dark page_btn"
                        onClick={this.load_previous_page.bind(this)}
                      >
                        Previous
                      </button>
                    )}
                  </div>
                  <div className="col-lg-8">
                    <blockquote className="blockquote text-center">
                      {this.state.is_btn_spinner && (
                        <div align="center">
                          <InfinitySpinner />
                        </div>
                      )}
                      <p className="mb-0">Page: {this.state.page.current}</p>
                    </blockquote>
                  </div>
                  <div className="col-sm-2">
                    {this.state.page.has_next && (
                      <button
                        type="button"
                        className="btn btn-dark page_btn"
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

export default StationListView;
