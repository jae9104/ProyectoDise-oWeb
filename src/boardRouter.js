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
    let ok = false;
    let fallo = {message: ''}; 
    boardService.addPost({ nombre, precio, mano, kilometros, combustible, transmision, caballos, descripcion, imagen }, ok, fallo);
    if (ok){
        res.redirect('/');//nos redirige a la pagina index
    }
    else{
        res.send(fallo.message); // Envia el mensaje de error
    }
});

/*Muestra los detalles de una publicación específica en función de su identificador */
router.get('/post/:id', (req, res) => {
    let id = req.params.id
    const postDetails = boardService.getPostDetails(id);
    res.render('pagSecundaria', { post: postDetails , opiniones: boardService.obtenerOpiniones(id)});
});

/* Elimina una publicación específica en función de su identificador */
router.get('/post/:id/delete', (req, res) => {

    boardService.deletePost(req.params.id);

    res.redirect('/');//nos redirige a la pagina index
});

//////////////sección opiniones//////////////

router.post('/post/:id', (req, res) => {
    let id = req.params.id;
    let { nombre, email, valoracion, comentario } = req.body;
    boardService.agregarOpinion(id ,{ nombre, email, valoracion, comentario }); 
    const opiniones = boardService.obtenerOpiniones(id);
    res.render('pagSecundaria', { opiniones, post: boardService.getPostDetails(id) });
});

  
  


export default router;
