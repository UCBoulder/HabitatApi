# HabitatApi
### Node JS + Express JS backend  
  
# Instructoions to run the API  
  
## 1. Make sure you have node installed, to check go to a console window and type "npm" if it errors, download and install nodeJS.  
## 2. Once you have node installed, navigate to the HabitatAPI Folder in a console window.  
## 3. Once in the folder, run the command "node ." This will start a local server hosting the APIs.  
## 4. Install dependencies by running "npm install" in your terminal window
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

Feel free to enhance the README further with any additional information about your project, its features, and usage. Providing clear and detailed instructions will help users and contributors understand and work with your backend application more effectively.
.  
  
# Instructions for testing the API:  
  
  as a note, for the time being, the address you should  use is localhost:8080/path, the GUI and API must both be running on the same machine for this to work.
## 1. When running a POST request, the possible routes are only /APITEST. It can technically handle a GET request too, but just says "This is a POST only route" as a reqponse.
## 2. All other routes are GET right now, they include (/, /route1, /secret)
## 3. That's it!
