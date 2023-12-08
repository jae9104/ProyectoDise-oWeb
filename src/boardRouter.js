import express from 'express';
import * as boardService from './boardService.js';

const router = express.Router();

/*Muestra todas las publicaciones */
router.get('/', (req, res) => {
    res.render('index', {
        posts: boardService.getPosts()
    });
});

function validarFormulario(post, fallo = {}) {
    // Validación básica
    if (post.nombre === "") {
        fallo.message = "Complete el campo obligatorio de Marca y modelo del coche";
        return false;
    }
    if (post.imagen === "") {
        fallo.message = "Complete el campo obligatorio de Dirección de la imagen";
        return false;
    }
    if (post.precio === "") {
        fallo.message = "Complete el campo obligatorio de Precio estimado";
        return false;
    }
    if (post.mano === "" || post.mano === "Selecciona una opción") {
        fallo.message = "Complete el campo obligatorio de Mano";
        return false;
    }
    if (post.kilometros === "") {
        fallo.message = "Complete el campo obligatorio de Kilometros";
        return false;
    }
    if (post.combustible === "" || post.combustible === "Selecciona una opción") {
        fallo.message = "Complete el campo obligatorio de Combustible";
        return false;
    }
    if (post.transmision === "" || post.transmision === "Selecciona una opción") {
        fallo.message = "Complete el campo obligatorio de Transmision";
        return false;
    }
    if (post.caballos === "") {
        fallo.message = "Complete el campo obligatorio de Caballos de potencia";
        return false;
    }
    if (post.descripcion === "") {
        fallo.message = "Complete el campo obligatorio de Descripcion y/o defectos";
        return false;
    }

    // Validacion para valores dentro de los rangos
    if (parseInt(post.kilometros) < 0) {
        fallo.message = "Los kilometros no puede ser negativos";
        return false;
    }
    if (parseInt(post.precio) < 0) {
        fallo.message = "El precio no puede ser negativo";
        return false;
    }
    if (parseInt(post.caballos) < 0 || parseInt(post.caballos) > 5000) {
        fallo.message = "Los caballos deben estar entre 0 y 5000";
        return false;
    }


    // Si todas las validaciones pasan, el formulario se envía
    return true;
}
/*Añade un post y define sus componentes */
router.post('/post/edit', (req, res) => {
    let { nombre, precio, mano, kilometros, combustible, transmision, caballos, descripcion, imagen } = req.body;

    // Luego, puedes pasar las nuevas propiedades al objeto post
    let fallo = {};
    let ok = validarFormulario(req.body, fallo);
    if (ok) {
        boardService.addPost({ nombre, precio, mano, kilometros, combustible, transmision, caballos, descripcion, imagen }, req.body.id);
        res.redirect('/');//nos redirige a la pagina index
    }
    else {
        boardService.addFallo(fallo);
        res.render('pagNewElem', { fallos: boardService.lastFallo(), FormData: req.body});
        boardService.inicializarFallos(); //reinicializa el array de fallos
    }
});

/*Muestra los detalles de una publicación específica en función de su identificador */
router.get('/post/:id', (req, res) => {
    let id = req.params.id
    const postDetails = boardService.getPostDetails(id);
    res.render('pagSecundaria', { post: postDetails, opiniones: boardService.obtenerOpiniones(id) });
});

/* Elimina una publicación específica en función de su identificador */
router.get('/post/:id/delete', (req, res) => {

    boardService.deletePost(req.params.id);

    res.redirect('/');//nos redirige a la pagina index 
});


///editar un post
router.get('/post/:id/edit', (req, res) => {

    res.render('pagNewElem', { FormData: boardService.getPostDetails(req.params.id) });
});

//////////////sección opiniones//////////////

router.post('/post/:id', (req, res) => {
    let id = req.params.id;
    let { nombre, email, valoracion, comentario } = req.body;
    boardService.agregarOpinion(id, { nombre, email, valoracion, comentario });
    const opiniones = boardService.obtenerOpiniones(id);
    res.render('pagSecundaria', { opiniones, post: boardService.getPostDetails(id) });
});





export default router;
