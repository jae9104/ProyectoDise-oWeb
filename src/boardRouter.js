import express from 'express';
import * as boardService from './boardService.js';

const router = express.Router();

/*Muestra todas las publicaciones */
router.get('/', (req, res) => {
    res.render('index', { 
        posts: boardService.getPosts() 
    });
});

/*Modifica los valores que tiene dentro de cada post */
router.post('/post/new', (req, res) => {
    let { nombre, precio, mano, kilometros, combustible, transmision, caballos, descripcion, imagen } = req.body;

    // Luego, puedes pasar las nuevas propiedades al objeto post
    boardService.addPost({ nombre, precio, mano, kilometros, combustible, transmision, caballos, descripcion, imagen });

    res.render('saved_post');
});

/*Muestra los detalles de una publicación específica en función de su identificador */
router.get('/post/:id', (req, res) => {

    let post = boardService.getPost(req.params.id);

    res.render('show_post', { post });
});

/* Elimina una publicación específica en función de su identificador */
router.get('/post/:id', (req, res) => {
    let post = boardService.getPostDetails(req.params.id);

    if (post) {
        res.render('show_post', { post });
    } else {
        // Manejar el caso en el que no se encuentra el post con el ID proporcionado
        res.render('post_not_found');
    }
});

export default router;
