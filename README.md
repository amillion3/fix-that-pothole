# Fix That Pothole

## [Live Demo](https://fix-that-pothole.andymillion.com/)

## Do you hate potholes? Then this app is for you!

### This app is for local citizens and government officials to easily add, track and fix potholes. Citizens can login to the app and add potholes in need of repair using a map interface. When adding potholes, users can specify how severe the pothole is (low, medium, high) and add additional details for government officials.

### In addition to adding potholes, administrative users have the ability to update the status of individual potholes and modify other attributes.

## Technology
- HTML5
- CSS3/React-Bootstrap
- JavaScript/ES6/JSX
- React 16 / Webpack
- [react-leaflet](https://github.com/PaulLeCam/react-leaflet)
- [Mapbox API](https://www.mapbox.com/maps/)
- [Firebase (database & authentication)](https://firebase.google.com/)
- [Create React App](https://github.com/facebookincubator/create-react-app)

## Screenshots

Here is the main page to login or register. Users can quickly register using just an email and password.
![Login page](https://raw.githubusercontent.com/amillion3/fix-that-pothole/master/img/screenshots/login.png)
___


After logging in, users are taken to the main view of a map. Centered on Nashville, existing potholes are displayed with obvious markers.
![Map view](https://raw.githubusercontent.com/amillion3/fix-that-pothole/master/img/screenshots/map-view.png)
___


If the user clicks on one of the markers, a small pop-up is displayed with a summary of that specific pothole.
![Click on marker](https://raw.githubusercontent.com/amillion3/fix-that-pothole/master/img/screenshots/marker-click.png)
___


When a user wishes to add a new pothole to the system, they simply have to click the `Add New Pothole` button and click on the map. After the user clicks on the map, a small dialog box appears to enter the pothole severity and any additional notes.
![Add new pothole](https://raw.githubusercontent.com/amillion3/fix-that-pothole/master/img/screenshots/add-new-pothole.png)
___


Users have access to a dashboard, where the a summary table of each pothole is displayed. A nearly complete record of each pothole is shown, but the user can click the `Full Record` button to get every single detail if they wish.
![Dashboard main](https://raw.githubusercontent.com/amillion3/fix-that-pothole/master/img/screenshots/dashboard-main.png)
___


When the user examines the complete record, all pertinent details are shown. After the record the user can `Go Back` to the dashboard, `Edit Record` to update the pothole, or `Delete Record` to delete the pothole entirely.
![Dashboard complete record](https://raw.githubusercontent.com/amillion3/fix-that-pothole/master/img/screenshots/dashboard-complete-record.png)
___


When the user edits a pothole record, they are taken to a new React route. Some of the fields are editable, but not all of them. When a record is updated, the last date, time and user are updated for that specific record.
![Edit pothole record](https://raw.githubusercontent.com/amillion3/fix-that-pothole/master/img/screenshots/dashboard-edit.png)
___


The app is mobile-friendly, developed using React-Boostrap (Bootstrap 3 in React, essentially).
![Three mobile views](https://raw.githubusercontent.com/amillion3/fix-that-pothole/master/img/screenshots/mobile.png)
___


## v2.0 and beyond:
- Geolocation for mobile users.
- Geocoding to attribute the closest address to each pothole automatically.
- Allow admin users to generate standardized work orders for workers (including latitude and longitude, Google maps link and further information).
- Allow users to upload images of potholes when adding new ones.
- Upvote/like feature for other citizens to echo existing potholes.
- Multiple levels of permissions (admin, worker, public citizen).
- Create dashboard for users (as opposed to the existing dashboard, which is for administrators).
- Enhance dashboard for admin (add a locator map, ability to notify workers, etc)
- Google / Facebook / Twitter login functionality.
- Display markers and legend, based on pothole status.
- Base map layer switcher.
- Spam control (only allow users to add, say, 5 points a day).
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