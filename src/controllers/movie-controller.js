import { Router } from "express";
import movieService from "../services/movie-service.js";
import castService from "../services/cast-service.js";
import { isAuth } from "../middlewares/auth-middleware.js";

const movieController = Router();

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.findAll(filter)

    res.render('search', { movies, filter });
});

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', async (req, res) => {
    const newMovie = req.body;
    const userId = req.user?.id

    await movieService.create(newMovie,userId);

    res.redirect('/');
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOneWithCasts(movieId);
    const isCreator = movie.creator?.equals(req.user?.id);
    console.log(isCreator);
    
    res.render('movie/details', { movie, isCreator });
});


movieController.get('/:movieId/attach-cast', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.findOne(movieId)
    const casts = await castService.getAll({ exclude: movie.casts });

    res.render('movie/attach-cast', { movie, casts });
});

movieController.post('/:movieId/attach-cast', async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;
    await movieService.attachCast(movieId, castId);

    res.redirect(`/movies/${movieId}/details`);
});

movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);
    if (!movie.creator?.equals(req.user?.id)) {
        return res.redirect('/404');
    }

    await movieService.delete(movieId);

    res.redirect('/');
});


export default movieController;
