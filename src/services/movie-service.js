
import Movie from "../models/Movie.js";

export default {
    async findAll(filter = {}) {

        let query = Movie.find({});;

        if (filter.search) {
            query = query.where({ title: filter.search })
        }

        if (filter.genre) {
            query = query.where({ genre: filter.genre })
        }

        if (filter.year) {
            query = query.where({ year: Number(filter.year) })
        }
        return query
    },

    findOne(movieId) {

        // TODO: if movie is missing?
        const result = Movie.findById(movieId)

        return result;
    },

    create(movieData) {
        const newId = uuid();
        movies.push({
            ...movieData,
            rating: Number(movieData.rating),
        });

        return newId;
    }
}

