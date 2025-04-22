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
 
### About merge params
🚀 What mergeParams: true does:
When you create a router using express.Router(), by default it does not inherit route parameters (like :id) from its parent route.

So if you have:

js
Copy
Edit
app.use("/listings/:id/reviews", reviewsRouter);
The :id in that URL path belongs to the parent (app.js), and unless you tell Express to "merge" the parent parameters into the child router, the reviewsRouter won’t have access to req.params.id.

🔧 When you use:
js
Copy
Edit
const router = express.Router({ mergeParams: true });
It tells Express:

“Hey, please include any route parameters (like :id) from the parent path in req.params inside this router too.”

📦 Without mergeParams: true:
req.params in review.js → {} ❌

So req.params.id is undefined

✅ With mergeParams: true:
req.params in review.js → { id: '12345' } ✅

Now Listing.findById(req.params.id) works perfectly

TL;DR:
mergeParams: true lets your nested router access parameters from its parent route path. It’s essential for routes like /listings/:id/reviews.

Let me know if you want a visual of how the routing structure looks too!

### Stateful and Stateless

Stateful store session information and state and stateless doesn't store it.
We are using stateless currently. but, we try to make our session stateful by using express session.
We are currently using sessionStore as memoryStore but it is not meant for production purpose. for that we will choose another store

### connect flash
We use it to flash messages as indicators in our app single time and it is a type of middleware and it is mainly works with the combination of redirects

We use res.local. bcz this property to set variables accessible in templates rendered with res.render. The variables set on res. locals are available within a single request-response cycle, and will not be shared between requests. mtlb hm kisi bhi msg ko res.locals m save kr skte h agr hme wo ejs m use krna h.

We must have to use flash before our routes

### Authentication

We use passport for that and we use passport local startegy and also use passport local mongoose which automatically adds a username and do hashing and salting on its own.

and passport also uses session for storing information.

we use passport.session for: A web application needs the ability to identify users as they browse from page to page. This series of requests and responses, each associated with the same user, is known as a session.

We use PBKDF2 encrypting algorithm.

The work of user existing in database is done by passport as a middleware.

Jb hm user ko serialize krte h to actual m uski info. ko store krte h

We know that the req.user store all the info. of user. so, if this object is undefined that means that the user is not logged in so in that case we will show him the signup and login option and if there is something in the object then we will show him the logout

we use req.login method of passport to bypass login after signup