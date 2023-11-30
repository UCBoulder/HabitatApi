# HabitatApi
### Node JS + Express JS backend  

# Instructions to run API
### 1. Navigate to HabitatAPI folder in vim or in your IDE. (Must have Node.JS Installed)
### 2. Once in the folder, type "node .\index.js"
### 3. A message should appar in the console alerting you to where it is running (localhost:3000).
### 4. Click the address to see what it returns, and go to the other routes to see what they do.

# Using the API
### 1. Right now we have 2 get routes and 2 POST routes.
### 2. Right now you can both GET and POST to /observations.
###     GETing from /observations will display all obervations in DB
###     POSTing to /observations will add a generic observation to DB (overwriting the one that was there)
### 3. Accessible at '/locTest', there is a GET route used to test displaying points on the app's homescreen. It sends an array of {lattitude:x, longitude:y} coordinates.
### 4. To create a table you can send a blank POST to /maketable. (This should not be used after the table has been made once.)
