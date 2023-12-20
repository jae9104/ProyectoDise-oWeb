import express from 'express';
import * as boardService from './boardService.js';
import { getCoches } from './boardService.js';

const router = express.Router();

/*Muestra todas las publicaciones */
router.get('/', (req, res) => {

    const posts = getCoches(0, 4);

    res.render('index', { posts });
});

//////////////Ajax//////////////

router.get('/coches', (req, res) => {

    const from = parseInt(req.query.from);
    const to = parseInt(req.query.to);

    const posts = getCoches(from, to);

    res.render('coches', { posts });
});

function validarFormulario(post, fallo = {}) {
    // Validación básica
    let ok = true;
    fallo.messages = []
    if (post.nombre === "") {
        fallo.messages.push("Complete el campo obligatorio de Marca y modelo del coche");
        ok = false;
    }
    if (post.imagen === "") {
        fallo.messages.push("Complete el campo obligatorio de Dirección de la imagen");
        ok = false;
    }
    if (post.precio === "") {
        fallo.messages.push("Complete el campo obligatorio de Precio estimado");
        ok = false;
    }
    if (post.mano === "") {
        fallo.messages.push("Complete el campo obligatorio de Mano");
        ok = false;
    }
    if (post.kilometros === "") {
        fallo.messages.push("Complete el campo obligatorio de Kilometros");
        ok = false;
    }
    if (post.combustible === "") {
        fallo.messages.push("Complete el campo obligatorio de Combustible");
        ok = false;
    }
    if (post.transmision === "") {
        fallo.messages.push("Complete el campo obligatorio de Transmision");
        ok = false;
    }
    if (post.caballos === "") {
        fallo.messages.push("Complete el campo obligatorio de Caballos de potencia");
        ok = false;
    }
    if (post.descripcion === "") {
        fallo.messages.push("Complete el campo obligatorio de Descripcion y/o defectos");
        ok = false;
    }

    // Validacion para valores dentro de los rangos
    if (parseInt(post.kilometros) < 0) {
        fallo.messages.push("Los kilometros no puede ser negativos");
        ok = false;
    }
    if (parseInt(post.precio) < 0) {
        fallo.messages.push("El precio no puede ser negativo");
        ok = false;
    }
    if (parseInt(post.caballos) < 0 || parseInt(post.caballos) > 5000) {
        fallo.messages.push("Los caballos deben estar entre 0 y 5000");
        ok = false;
    }

    if (!ok) {
        boardService.addFallo(fallo);
    }


    // Si todas las validaciones pasan, el formulario se envía
    return ok;
}
/*Añade un post y define sus componentes */
router.post('/post/edit', (req, res) => {
    let { nombre, precio, mano, kilometros, combustible, transmision, caballos, descripcion, imagen, compra } = req.body;

    // Luego, puedes pasar las nuevas propiedades al objeto post
    let fallo = {};
    let ok = validarFormulario(req.body, fallo);
    if (ok) {
        const postId = boardService.addPost({ nombre, precio, mano, kilometros, combustible, transmision, caballos, descripcion, imagen, compra }, req.body.id);
        res.redirect(`/post/${postId}`);//nos redirige a la pagina index
    }
    else {
        res.render('pagNewElem', { fallos: boardService.lastFallo(), FormData: req.body });
        boardService.inicializarFallos(); //reinicializa el array de fallos
    }
});

/*Muestra los detalles de una publicación específica en función de su identificador */
router.get('/post/:id', (req, res) => {
    let id = req.params.id
    const postDetails = boardService.getPostDetails(id);
    res.render('pagSecundaria', { post: postDetails, opiniones: boardService.obtenerOpiniones(id), compra: postDetails.compra });
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

//////////////carrito de la compra//////////////
router.get('/addToCart', (req, res) => {
    const postId = req.query.postId;

    boardService.ModificarCompra(postId);//modifico compra a true
    const coche = boardService.getPostDetails(postId);
    boardService.agragarAlCarrito(coche);

    res.sendStatus(200);//indica que la operacion salio bien
});

router.get('/deleteToCarrito', (req, res) => {
    const postId = req.query.postId;

    boardService.EliminarDeCompra(postId);//modifico compra a true

    res.sendStatus(200);//indica que la operacion salio bien
});

router.get('/compra', (req, res) => {

    const posts = boardService.getCompra();
    const precioFinal = boardService.allPrecio();

    if (precioFinal != 0) {
        res.render('compra', { posts, precioFinal });
    }
    else {
        res.render('error');
    }
});

router.get('/deleteCompra', (req, res) => {
    const precioFinal = boardService.allPrecio();
    boardService.deleteAll();
    res.render('ok', { precioFinal });
});  


export default router;
