import React from "react";
import SingleStationItem from "../util/station_item";
import "../css/App.css";
import Spinner from "../util/spinner";
import InfinitySpinner from "../util/infinity_spinner";
import SearchStationView from "./search_station";

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

      search_field: "",
      search_in_focus: false, // to determine if search in focus or not.
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
            search_in_focus: false,
          });
        },
        (error) => {
          console.log(error);
          this.setState({
            is_spinner: false,
            is_success: false,
            is_error: true,
            search_in_focus: false,
          });
        }
      );
  }

  loadLocalStorage() {
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

  componentDidMount() {
    const stationTime = localStorage.getItem("stationTime");

    if (stationTime === null) {
      // fetch new data.
      this.getAllStation();
    } else {
      // show old data.
      this.loadLocalStorage();
    }
  }

  loadPreviousPage() {
    this.setState({
      is_btn_spinner: true,
    });
    this.getAllStation(this.state.page.current - 1);
  }

  loadNextPage() {
    this.setState({
      is_btn_spinner: true,
    });
    this.getAllStation(this.state.page.current + 1);
  }

  handleSearchFieldChange(event) {
    // this function handle the search field.
    // this function will send an automated search request for every change of letters.
    this.setState({ search_field: event.target.value });
    
    if (event.target.value.length >= 3) {
      this.setState({
        search_in_focus: true,
      });
    } else {
      this.setState({
        search_in_focus: false,
      });
    }
  }

  handleSearchClick(event) {
    event.preventDefault();
    if (
      this.state.search_field !== null &&
      this.state.search_field.length >= 3
    ) {
      this.setState({
        search_in_focus: true,
      });
    } else {
      this.setState({
        search_in_focus: false,
      });
    }
  }

  render() {
    return (
      <div className="container">
        {/* Search Station by name*/}
        <form className="form-inline">
          <div className="row" style={{ paddingBottom: "15px" }}>
            <div className="col-md-10">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Search by station name"
                aria-label="Search"
                style={{ borderRadius: "12px" }}
                onChange={this.handleSearchFieldChange.bind(this)}
              />
            </div>
            <div className="col-md-2">
              <button
                className="btn page_btn my-2 my-sm-0"
                type="submit"
                style={{ width: "100%", borderRadius: "12px" }}
                onClick={this.handleSearchClick.bind(this)}
                disabled={this.state.search_field.length < 3}
              >
                Search
              </button>
            </div>
          </div>
        </form>

        {/* search result view view */}
        {this.state.search_in_focus && (
          <SearchStationView
            search={this.state.search_field}
          ></SearchStationView>
        )}

        {/* normal station spinner */}
        {this.state.station.length === 0 && this.state.is_spinner && (
          <div className="row" style={{ marginLeft: "40%" }}>
            <Spinner></Spinner>
          </div>
        )}

        {/* normal station server error or other error */}
        {this.state.is_error && (
          <div className="info">
            <h1 className="display">Sorry!</h1>
            <h3 className="h3">
              We are unable to fetch any information from the server! Try again
              later!
            </h3>
          </div>
        )}

        {/* normal station list view */}
        {this.state.station.length !== 0 &&
          this.state.is_success &&
          !this.state.search_in_focus && (
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
                          onClick={this.loadPreviousPage.bind(this)}
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
                          onClick={this.loadNextPage.bind(this)}
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
