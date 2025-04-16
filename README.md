### index.js is for initialization logic and data.js is to store data

### index.ejs sab kuch dikhayega or uske andr li ka jo anchor tag h wo redirect krega show route p and this is the get request and show route is to show the details of the specific listing

## We have toLocaleString() which convert which convert numbers to string with commas

### Create and New route Get request to -> /listings/new -> Form -> Submit krne k baad request 2nd route pr jayegi (create route pr jo ki POST route hoga) -> /listings

### Update and Edit Route -> sends a GET request to => /listings/:id/edit -> render edit form -> submit krte hi put request jayegi /listings/:id and show k andr hi edit route hoga

### We use ejsmate for layouts

### includes and layouts server the static and common code like header, footer etc.

### if we want to show anything over the image then we use card-img-overlay and in future i wanted to use it for the like button

### Validation -> from client to server -> checks the data which we are sending from client to server is correct or not. 1.When we enter data in the form, the browser and/or the web server will check to see that the data is in the correct format and within the constraints set by the application. we make script.js inside js inside public folder to implement the bootstrap default error(blank) message instead of browser default message
### Server -> error handling

### custom error handler -> for preventing the server from accepting wrong information from the services like postman and hoppscoth.

### We use wrapasync which is a better way to write try-catch and we make different class for wrapAsync and put it into the util folder

### Now we validate the schema that it doesn't handle wrong requests and only create listing with correct data and for that we have 2 ways first if(!newListing.description){throw new ExpressError(400"Description is missing)'?:} write this in create route and 2nd is to use the tool joi which is used to validate the schema and with the help of it we define a schema and this schema is not for mongoose but it is for server-side validation

### Handling Deletions: there is relation between our users and the posts which is one to many. So, if user delete its account then all of its posts must have to be deleted and the 2nd case is that if user is delete then its posts may be shown up and the msg appears that the user doesn't exist 

### We handle deletions using mongoose midlewares - we use 2 middlewares pre & post of Query middlewares. and in mongoose findByIdAndDelete automatically triggers the findOneAndDelete

### we have moved all the listings in the routes folder and inside lisiting.js using express router
 
