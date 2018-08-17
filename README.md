# Fix That Pothole

## [Live Demo](https://fix-that-pothole.andymillion.com/)

## Do you hate potholes? Then this app is for you!

### This app is for local citizens and government officials to easily add, track and fix potholes. Citizens can login to the app and add potholes in need of repair using a map interface. When adding potholes, users can specify how severe the pothole is (low, medium, high) and add additional details for government officials.

### In addition to adding potholes, administrative users have the ability to update the status of individual potholes and modify other attributes.

## Technology
- HTML5
- CSS3/Sass/React-Bootstrap
- JavaScript/ES6/JSX
- React 16 / Webpack
- [react-leaflet](https://github.com/PaulLeCam/react-leaflet)
- [react-leaflet-markercluster](https://www.npmjs.com/package/react-leaflet-markercluster)
- [Firebase (database, auth, hosting)](https://firebase.google.com/)
- [Create React App](https://github.com/facebookincubator/create-react-app)
- [react-router-dom](https://reacttraining.com/react-router/core/guides/philosophy)

### APIs
- [Mapbox](https://www.mapbox.com/maps/)
- [LocationIQ](https://locationiq.com/)

## Screenshots

Here is the main page to login or register. Users can quickly register using just an email and password. During registration, users must enter a valid email and a password at least 6 characters long.
![Login page](https://raw.githubusercontent.com/amillion3/fix-that-pothole/master/img/screenshots/login.png)
___


After logging in, users are taken to the main view of a map. Centered on Nashville, existing potholes are displayed with obvious markers. Note the green circles with numbers in them, these are clusters of points that are not shown at the current zoom level.
![Map view](https://raw.githubusercontent.com/amillion3/fix-that-pothole/master/img/screenshots/custom-clusters.png)
___


This map uses a JavaScript library called `react-leaflet-cluster` to cluster points in close proximity. Users may hover over the cluster to see the extent of the cluster. By clicking on the cluster, users will be zoomed in much closer.
![Cluster hover](https://raw.githubusercontent.com/amillion3/fix-that-pothole/master/img/screenshots/cluster-boundary.png)
___

A basemap switcher allows users to switch between the custom style, streets and landmarks and satellite imagery with labels.
![Streets and Landmarks](https://raw.githubusercontent.com/amillion3/fix-that-pothole/master/img/screenshots/streets-markers-cluster.png)

![Satellite imagery](https://raw.githubusercontent.com/amillion3/fix-that-pothole/master/img/screenshots/satellite-markers.png)
___

A map legend is available via a button click.
![Map Legend](https://raw.githubusercontent.com/amillion3/fix-that-pothole/master/img/screenshots/legend.png)
___

If the user clicks on one of the markers, a small pop-up is displayed with a summary of that specific pothole.
![Click on marker](https://raw.githubusercontent.com/amillion3/fix-that-pothole/master/img/screenshots/popup.png)
___


When a user wishes to add a new pothole to the system, they simply have to click the `Add New Pothole` button and click on the map. After the user clicks on the map, a small dialog box appears to enter the pothole severity and any additional notes.
![Add new pothole](https://raw.githubusercontent.com/amillion3/fix-that-pothole/master/img/screenshots/add-new-pothole.png)
After a pothole record is added, `LocationIQ` is an API called to reverse geocode and match the pothole with the closest mailing address.
___


Users have access to a dashboard, where the summary table of each pothole is displayed. A nearly complete record of each pothole is shown, but the user can click the `Full Record` button to complete details and further actions.
![Dashboard main](https://raw.githubusercontent.com/amillion3/fix-that-pothole/master/img/screenshots/dashboard-main.png)
___


When the user examines the complete record, all pertinent details are shown. After the record the user can `Go Back` to the dashboard, `Edit Record` to update the pothole, or `Delete Record` to delete the pothole entirely.
![Dashboard complete record](https://raw.githubusercontent.com/amillion3/fix-that-pothole/master/img/screenshots/dashboard-record.png)
___

A Google Streetview link is available in numerous places throughout the app. This ingests the latitude and longitude and places users as close as possible.
![Google Streetview](https://raw.githubusercontent.com/amillion3/fix-that-pothole/master/img/screenshots/streetview.png)


When the user edits a pothole record, they are taken to a new React route. Some of the fields are editable, but not all of them. When a record is updated, the last date, time and user are updated for that specific record.
![Edit pothole record](https://raw.githubusercontent.com/amillion3/fix-that-pothole/master/img/screenshots/edit-record.png)
___


The app is mobile-friendly, developed using React-Boostrap (Bootstrap 3 in React, essentially).
![Three mobile views](https://raw.githubusercontent.com/amillion3/fix-that-pothole/master/img/screenshots/mobile.png)
___


## v2.0 and beyond:
- Geolocation for mobile users.
- Geocoding to attribute the closest address to each pothole automatically.
- Allow admin users to generate standardized work orders for workers (including latitude and longitude, Google maps link and further information).
- Allow users to upload images of potholes when adding new ones.
- Upvote/like feature for other citizens to echo existing pothole complaints.
- Multiple levels of permissions (IE, `admin`, `worker`, `public citizen`).
- Create dashboard for users (as opposed to the existing dashboard, which is for administrators).
- Enhance dashboard for admin (add a locator map, ability to notify workers, etc)
- Google / Facebook / Twitter login functionality.
- Display markers and legend, based on pothole status.
- Base map layer switcher.
- Spam control (only allow users to add, say, 5 points a day).
- Filters to control what pothole markers are displayed:
    - Date filter (say, only show potholes from the past month, etc.).
    - Pothole type filter (only displayed potholes in need of repair, or potholes fixed, etc).
- Measuring tool, to measure distances.
- Ability to add line and polygon features.
- Ability to load GeoJSON/SHP files.

## v3.0 and beyond:
- Scale this into an open-source solution for anyone to use.
    - Such as solid waste pickup, opiod overdose mapping, etc.

___
## Running The Project
1. Clone down this repo and CD into project.
2. Get API keys for Firebase and Mapbox.
3. Copy `src/constants.example.js` to `constants.js` and add the API keys.
4. Setup `Firebase` using JSON seed data from `src/db`.
4. Install NPM dependencies by running `npm install` in the root directory.
5. Execute `npm start` to spin up a local server.
6. To deploy project to Firebase, run `npm run deploy`.


## Contributors
[Andy Million](https://github.com/amillion3)

With support from

[Lauren Rouse](https://github.com/rousell)

[Callan Morrison](https://github.com/morecallan)

[Zoë Ames](https://github.com/zoeames)
