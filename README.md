# HabitatApi
### Node JS + Express JS backend  

# Instructions to run API
1. Navigate to the HabitatAPI folder in your preferred text editor. Make sure you have Node.js installed.
2. Once inside the folder, you can start the API in either of the following ways:
   - Option A: Run `node .\index.js` in the terminal.
   - Option B: Use the command `npm run start` in the terminal.
3. After starting the API, a console message will indicate the running location (e.g., localhost:3000).
4. Click on the provided address to see the API's response. Explore other routes for additional functionality.


# Using the API
1. Right now we have 2 get routes and 2 POST routes.
2. Right now you can both GET and POST to /observations.
     GETing from /observations will display all obervations in DB
     POSTing to /observations will add a generic observation to DB (overwriting the one that was there)
3. Accessible at '/locTest', there is a GET route used to test displaying points on the app's homescreen. It sends an array of {lattitude:x, longitude:y} coordinates.
4. To create a table you can send a blank POST to /maketable. (This should not be used after the table has been made once.)
