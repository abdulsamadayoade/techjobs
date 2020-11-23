const  express = require('express');
const  dotenv = require('dotenv');
const  connectDB = require('./config/db.js');
const  colors = require('colors');
const  userRoutes = require('./routes/usersRoute.js')
const  postRoutes = require('./routes/postRoutes.js')
const  {notFound, errorHandler } = require('./middleware/errorMiddleware.js')
const  morgan = require('morgan')
const mongoSanitize = require('express-mongo-sanitize');
const  helmet = require('helmet')
const  xss = require('xss-clean')
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors')
const app = express();

dotenv.config();

connectDB();

app.use(express.json());



app.use(cors())

// Sanitize data
app.use(mongoSanitize());

// Set Security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

// Rate Limiting for Api requests
const limiter = rateLimit({
 	windowMs: 10 * 60 * 1000, //10 mins
 	max: 100
});


app.use(limiter)

//Prevent HTTP params pollution
app.use(hpp())


app.use(`/api/posts`, postRoutes)
app.use(`/api/users`, userRoutes)

app.use(notFound)
app.use(errorHandler)
app.use(morgan('tiny'))




const PORT = process.env.PORT || 5003;

app.listen(
	PORT,
	console.log(`app running in  ${process.env.NODE_ENV} mode  on PORT ${PORT}`.yellow.bold)
);