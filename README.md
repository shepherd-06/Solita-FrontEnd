# City Bike App (FrontEnd) 🚴‍♂️

Welcome to the City Bike App! This project is the pre-assignment for Solita Dev Academy Finland 2023 and leverages the Helsinki Region Transport (HSL) dataset to provide you with a seamless bike-sharing experience.

👉 Backend: Deployed ✅

👉 Frontend: [Check the webapp here](https://shepherd-06.github.io/Solita-FrontEnd/)

👉 Backend (GitHub Repo): [BackEnd](https://github.com/shepherd-06/Solita-Backend)

👉 Full feature list of the web-app is given [here](https://github.com/shepherd-06/Solita-FrontEnd#feature-list).

👉 Some Screenshots: [here](https://github.com/shepherd-06/Solita-FrontEnd#screenshots),

## Requirements 🛠️

~~This project has been built on MacOS. It's published on a free `netlify.app` website. This server comes along with a `.env` file. Which contains the backend servers URL only. If you want to change the backend server URL, you can change it there.~~

This project uses Github pages to deploy!

## Installation and Setup Instructions 🚀

Clone down this repository. You will need node and npm installed globally on your machine.

### Installation

`npm install`

### To Start Server

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000/Solita-FrontEnd](http://localhost:3000/Solita-FrontEnd) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### To Build for Production

`npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
The app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### To Deploy on GitHub Pages

`npm run deploy` to deploy the app in the github pages.

## Feature List ✨

### Data Import

* ✅ Import data from the CSV files to a database or in-memory storage.
* ✅ Validate data before importing.
* ✅ Don't import journeys that lasted for less than ten seconds.
* ✅ Don't import journeys that covered distances shorter than 10 meters.

### Journey List View

* ✅ List Journeys.
* ✅ For each journey show departure and return stations, covered distance in kilometers and duration in minutes.
* ✅ Pagination.
* ⌛❌ Ordering per column.
* ⌛❌ Searching.
* ⌛❌ Filtering.

### Station list

* ✅ List all the stations.
* ✅ Pagination.
* ✅ Searching.

### Single station view

* ✅ Station name.
* ✅ Station address.
* ✅ Total number of journeys starting from the station.
* ✅ Total number of journeys ending at the station.
* ✅ Station location on the map.
* ✅ The average distance of a journey starting from the station.
* ✅ The average distance of a journey ending at the station.
* ✅ Top 5 most popular return stations for journeys starting from the station.
* ✅ Top 5 most popular departure stations for journeys ending at the station.
* ⌛❌ Ability to filter all the calculations per month.

### Additional Features

* ⌛❌ Endpoints to store new journeys data or new bicycle stations.
* ⌛❌ Running backend in Docker.
* ✅ Running backend in Cloud.
* ⌛❌ Implement E2E tests.
* ⌛❌ Create UI for adding journeys or bicycle stations.

## Screenshots 📸

### Home Page (List of Journeys)

![home page](https://github.com/shepherd-06/Solita-FrontEnd/blob/dev/screenshots/Screenshot%202023-02-10%20at%2012.23.18.png?raw=true)

### List of Station

![station list](https://github.com/shepherd-06/Solita-FrontEnd/blob/dev/screenshots/Screenshot%202023-02-10%20at%2012.23.34.png?raw=true)

### Single Station View

![stationview](https://github.com/shepherd-06/Solita-FrontEnd/blob/dev/screenshots/Screenshot%202023-02-10%20at%2012.23.54.png?raw=true)

-----------
Hyva! Happy hacking! 🚀
