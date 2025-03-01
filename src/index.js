import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import routes from './routes.js';
import cookieParser from 'cookie-parser';
import { authMiddleware } from './middlewares/auth-middleware.js';
import showRatingHelper from './helpers/rating-helper.js';
import 'dotenv/config';

const app = express();

//db configuration
try {
    const uri = 'mongodb://localhost:27017/magic-movies'
    await mongoose.connect(uri);
    
    console.log('DB Connected Sucesfully');
    
} catch (err) {
    console.log('Cannot connect to DB');
    console.log(err.message);
    
}
//handlebars configuration
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
       showRating:showRatingHelper,
    }
}));

app.set('view engine', 'hbs');
app.set ('views', 'src/views')

//express configuration
app.use('/static', express.static('./src/public'))
app.use(express.urlencoded({extended: false}))
app.use(cookieParser());
app.use(authMiddleware);
//setup routes
app.use(routes);


//start server
app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'))