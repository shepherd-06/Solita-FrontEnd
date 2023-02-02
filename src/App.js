import './App.css';
import React from 'react';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      journey: [],
    };
  }

  render() {
    return (
      <div>
        {/* nav bar */}
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <a className="navbar-brand" href="#">Home</a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="#">Home
                  <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
              </li>
            </ul>
          </div>
        </nav>
        {/* ----- */}


      </div>
    );
  }
}

export default App;
