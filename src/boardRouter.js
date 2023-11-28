import express from 'express';
import * as boardService from './boardService.js';

const router = express.Router();

/*Muestra todas las publicaciones */
router.get('/', (req, res) => {
    res.render('index', { 
        posts: boardService.getPosts() 
    });
});

/*Añade un post y define sus componentes */
router.post('/post/new', (req, res) => {
    let { nombre, precio, mano, kilometros, combustible, transmision, caballos, descripcion, imagen } = req.body;

    // Luego, puedes pasar las nuevas propiedades al objeto post
    boardService.addPost({ nombre, precio, mano, kilometros, combustible, transmision, caballos, descripcion, imagen });

    res.redirect('/');//nos redirige a la pagina index
});

/*Muestra los detalles de una publicación específica en función de su identificador */
router.get('/post/:id', (req, res) => {
    const postDetails = boardService.getPostDetails(req.params.id);
    console.log('Detalles del post:', postDetails);  ///depurador de contenido de cada post
    res.render('pagSecundaria', { post: postDetails });
});

/* Elimina una publicación específica en función de su identificador */
router.get('/post/:id/delete', (req, res) => {

    boardService.deletePost(req.params.id);

    res.redirect('/');//nos redirige a la pagina index
});

//////////////sección opiniones//////////////

router.post('/opinion/publicar-comentario', (req, res) => {
    let { nombre, email, valoracion, comentario } = req.body;
    console.log('Opinion: ', nombre, email, valoracion, comentario); ////depurador de opiniones
    boardService.agregarOpinion({nombre, email, valoracion, comentario }); 
    res.redirect('pagSecundaria');
});
  
router.get('/obtener-opiniones', (req, res) => {
    res.render('pagSecundaria', { opiniones: boardService.obtenerOpiniones()} )
});
  



export default router;

