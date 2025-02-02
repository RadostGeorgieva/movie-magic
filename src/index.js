import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import routes from './routes.js';
import showRatingHelper from './helpers/rating-helper.js';

const app = express();

//db configuration
try {
    const url = 'mongodb://localhost:27017/movie-magic'
    await mongoose.connect(uri);
    
    console.log('DB Connected Sucesfully');
    
} catch (err) {
    console.log('Cannot connect to DB');
    console.log(err.message);
    
}
//handlebars configuration
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    helpers: {
       showRating:showRatingHelper,
    }
}));

app.set('view engine', 'hbs');
app.set ('views', 'src/views')

//express configuration
app.use('/static', express.static('./src/public'))
app.use(express.urlencoded({extended: false}))

//setup routes
app.use(routes);


//start server
app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'))