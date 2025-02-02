
import {v4 as uuid} from 'uuid'
import Movie from "../models/Movie.js";

export default {
   async findAll(filter = {}) {
        // if(filter.search) {
        //     result = result.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
        // }

        // if(filter.genre) {
        //     result = result.filter(movie => movie.genre.toLowerCase() === filter.genre);
        // }

        // if(filter.year) {
        //     result = result.filter(movie => movie.year.toLowerCase() === filter.year);
        // }
        return Movie.find({});
    },

    findOne(movieId) {
        
        // TODO: if movie is missing?
        const result = Movie.findById(movieId)

        return result;
    },

    create(movieData) {
        const newId = uuid();
        movies.push({
            id:newId,
            ...movieData,
            rating:Number(movieData.rating),
        });

        return newId;
    }
}

