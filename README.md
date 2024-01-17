# HabitatApi (a Node JS + Express JS backend)  
  
# Instructions to run API
### 1. Navigate to HabitatAPI folder in vim or in your IDE. (Must have Node.JS Installed)
### 2. Once in the folder, type "npm run run"
### 3. A message should appar in the console alerting you to where it is running (localhost:3000).
### 4. Click the address to see what it returns, and go to the other routes to see what they do.  
### ----------------------------------------------------------------------------------------------  

# Using the API
### 1. Right now we have 2 get routes and 2 POST routes.
### 2. Right now you can both GET and POST to /observations.
###     GETing from /observations will display all obervations in DB
###     POSTing to /observations will add a generic observation to DB (overwriting the one that was there)
### 3. Accessible at '/locTest', there is a GET route used to test displaying points on the app's homescreen. It sends an array of {lattitude:x, longitude:y} coordinates.
### 4. To create a table you can send a blank POST to /maketable. (This should not be used after the table has been made once.)  
### ----------------------------------------------------------------------------------------------  
  
# Using the Database
### 1. Make sure you have a containter of Amazon's Dynamo DB, and that it has port info
### 2. Run the Container
### 3. Run the API
### 4. Run an empty POST request to /maketable to create the table within Dynamo
###     You should get "Table Created Successfully" as a return message if it works.
###     All post requests and many gets will fail unless the table is instantiated first 
### 5. Run a get request (via creating an observation in the app) through the app to "/observations" to add an observation to the database
### 6. When the app starts up it should pull all currently stored in the databse, "API HIT" will come up in the back end console when it hits