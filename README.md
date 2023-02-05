# Helsinki City Bike App (FrontEnd)

This is the pre-assignment for Solita Dev Academy Finland 2023. This project uses dataset from Helsinki Region Transport (HSL).

Backend (Deployed): <https://test.ibtehaz.xyz/ops/>

Frontend (Github Repo): <https://github.com/shepherd-06/Solita-FrontEnd>

Frontend (Deployed): <https://jolly-platypus-a9a828.netlify.app/>

Full feature list of the web-app is given here.

## Requirements

This project has been built on MacOS. It's published on a free `netlify.app` website. This server comes along with a `.env` file. Which contains the backend servers URL only. If you want to change the backend server URL, you can change it there.

## Installation and Setup Instructions

Clone down this repository. You will need node and npm installed globally on your machine.

### Installation

`npm install`

### To Start Server

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### To Build for Production

`npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
The app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Feature List

### Data Import

* [Completed] Import data from the CSV files to a database or in-memory storage.

* [Completed] Validate data before importing.

* [Completed] Don't import journeys that lasted for less than ten seconds

* [Completed] Don't import journeys that covered distances shorter than 10 meters

### Journey List View

* [Completed] List Journeys
* [Completed] For each journey show departure and return stations, covered distance in kilometers and duration in minutes
* [Completed] Pagination
* [TODO] Ordering per column
* [TODO] Searching
* [TODO] Filtering

### Station list

* [Completed] List all the stations
* [Completed] Pagination
* [TODO] Searching

### Single station view

* [Completed] Station name
* [Completed] Station address
* [Completed] Total number of journeys starting from the station
* [Completed] Total number of journeys ending at the station
* [TODO] Station location on the map
* [TODO] The average distance of a journey starting from the station
* [TODO] The average distance of a journey ending at the station
* [TODO] Top 5 most popular return stations for journeys starting from the station
* [TODO] Top 5 most popular departure stations for journeys ending at the station
* [TODO] Ability to filter all the calculations per month

### Additional Features

* [TODO] Endpoints to store new journeys data or new bicycle stations
* [TODO] Running backend in Docker
* [TODO] Running backend in Cloud
* [TODO] Implement E2E tests
* [TODO] Create UI for adding journeys or bicycle stations

-----------

Hyva! Happy hacking!
