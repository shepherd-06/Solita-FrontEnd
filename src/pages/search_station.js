import React from "react";
import "../css/App.css";
import SingleStationItem from "../util/station_item";
import Spinner from "../util/spinner";
import InfinitySpinner from "../util/infinity_spinner";

class SearchStationView extends React.Component {
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

  searchStationAPI(page_number = 1) {
    //
    // welp this is where the search happens.
    const searchField = this.props.search;
    let base_url = process.env.REACT_APP_BASE_URL;
    let searchUrl =
      base_url +
      "/search_station/?page=" +
      page_number +
      "&station=" +
      searchField;

    fetch(searchUrl)
      .then((res) => res.json())
      .then(
        (response) => {
          console.log(response);
          const searchPage = response["page"];
          const searchData = response["data"];

          this.setState({
            page: searchPage,
            station: searchData,

            is_spinner: false,
            is_btn_spinner: false,
            is_error: false,
            is_success: true,
          });
        },
        (error) => {
          console.log(error);
          this.setState({
            is_spinner: false,
            is_btn_spinner: false,
            is_error: true,
            is_success: false,
          });
        }
      );
  }

  loadPreviousPage() {
    this.setState({
      is_btn_spinner: true,
    });
    this.searchStationAPI(this.state.page.current - 1);
  }

  loadNextPage() {
    this.setState({
      is_btn_spinner: true,
    });
    this.searchStationAPI(this.state.page.current + 1);
  }

  componentDidMount() {
    this.searchStationAPI();
  }

  componentDidUpdate(prevProps) {
    // Check if the search prop has changed
    if (prevProps.search !== this.props.search) {
      // Call the search API with updated searchField value
      this.searchStationAPI();
    }
  }

  render() {
    const searchField = this.props.search;
    return (
      <div className="container">
        {/* Title start */}
        <div
          className="row"
          style={{
            marginBottom: "15px",
          }}
        >
          <div
            className="col-lg-12"
            align="center"
            style={{
              background: "#fff",
              paddingTop: "5px",
              borderRadius: "13px",
            }}
          >
            <p className="h6">Showing search result: {searchField}</p>

            {this.state.station.length === 0 && this.state.is_success && (
              <p className="h6" style={{ padding: "5px", paddingLeft: "10px" }}>
                No result returned!
              </p>
            )}
          </div>
        </div>

        {/* title ends */}
        {/* normal station spinner */}
        {this.state.station.length === 0 && this.state.is_spinner && (
          <div className="row" style={{ marginLeft: "45%", marginTop: "30px" }}>
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

        {/* search result view here */}
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

            {/* add pagination here */}
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

export default SearchStationView;
