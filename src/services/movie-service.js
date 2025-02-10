
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
    getOneWithCasts(movieId) {
        return this.findOne(movieId).populate('casts');
    },

    create(movieData, creatorId) {
        const newMovie = Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year),
            creator: creatorId,

        })

        return newMovie;
    },

    async attachCast(movieId, castId) {

        return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
    },
    delete(movieId) {
        return Movie.findByIdAndDelete(movieId);
    },
    update(movieId, movieData) {
        return Movie.findByIdAndUpdate(movieId, movieData)
    }
}

