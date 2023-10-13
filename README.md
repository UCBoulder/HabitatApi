# HabitatApi
### Node JS + Express JS backend  
  
# Instructoions to run the API  
  
1. Make sure you have node installed, to check go to a console window and type "npm" if it errors, download and install nodeJS.  
2. Once you have node installed, navigate to the HabitatAPI Folder in a console window.  
3. Once in the folder, run the command "node ." This will start a local server hosting the APIs.  
4. Install dependencies by running "npm install" in your terminal window  
## Testing the API

Note: The default address for testing is `http://localhost:8080/path`. Ensure that both the GUI and API are running on the same machine for these instructions to work.

### POST Requests

1. The only route that currently supports POST requests is `/APITEST`. It can technically handle GET requests as well, but it will respond with "This is a POST-only route."

### GET Requests

2. All other routes are for GET requests and include the following:
- `/`
- `/route1`
- `/secret`

That's it! You can now test the API using the specified routes.
