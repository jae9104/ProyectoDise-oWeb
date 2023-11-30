const posts = new Map();
const opiniones = {};
let nextId = 0;

addPost({ nombre: "Audi R8", precio: "250000", mano: "1º mano", kilometros: "0-10k", combustible: "Gasolina", transmision: "Manual", caballos: "400", descripcion: "Mejor coche para curvasa", imagen: "https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2022/10/audi-r8-v10-gt-2023-2831875.jpg"  });
addPost({ nombre: "BMW M3", precio: "180000", mano: "2º mano", kilometros: "50k-100k", combustible: "Diesel", transmision: "Manual", caballos: "2500", descripcion: "Rapidisimo", imagen: "https://hips.hearstapps.com/hmg-prod/images/bmw-m3-cs-2024-1674639702.jpg"  });
addPost({ nombre: "Nissan GTR", precio: "100000", mano: "3º mano", kilometros: "100k-200k", combustible: "Gasolina", transmision: "Automatico", caballos: "550", descripcion: "Mejor coche en las rectas", imagen: "https://hips.hearstapps.com/hmg-prod/images/nissan-gtr-2022-japon-portada-1631625941.jpg"  });

agregarOpinion(1,{nombre: "Jorge", email: "jorge@gmail.com", valoracion: "8", comentario: "Brutal coche, con estética de locos"});
agregarOpinion(1,{nombre: "Ivan", email: "ivan@gmail.com", valoracion: "3", comentario: "Un poco flojo el acabado interior"})

function validarFormulario(post,fallo = {}) {
    // Validación básica
    if (post.nombre === "") {
        fallo.message ="Complete el campo obligatorio de Marca y modelo del coche";
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
    if (post.kilometros === "" || post.kilometros === "Selecciona una opción") {
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
    if (parseInt(post.precio) < 0) {
        fallo.message = "El precio no puede ser negativo";
        return false;
    }
    if (parseInt(post.caballos) < 0 || parseInt(post.caballos) > 1200) {
        fallo.message = "Los caballos deben estar entre 0 y 1200";
        return false;
      }
  
  
    // Si todas las validaciones pasan, el formulario se envía
    return true;
}

export function addPost(post,ok,fallo) {
    if (validarFormulario(post,fallo)){
        let id = nextId++;
        post.id = id.toString();
        posts.set(post.id, post);
        ok = true;
    }
    else{ 
        ok = false;
    }
    return ok, fallo;
}

export function deletePost(id){
    posts.delete(id);
}

export function getPosts() {
    return Array.from(posts.values()).map(post => ({
        id: post.id,
        nombre: post.nombre,
        precio: post.precio,
        mano: post.mano,
        kilometros: post.kilometros,
        combustible: post.combustible,
        transmision: post.transmision,
        caballos: post.caballos,
        descripcion: post.descripcion,
        imagen: post.imagen
    }));
}

// Agregar una nueva función getPostDetails en boardService.js
export function getPostDetails(id) {
    const post = posts.get(id);
    if (post) {
        return {
            id: post.id,
            nombre: post.nombre,
            precio: post.precio + " €",
            mano: post.mano,
            kilometros: post.kilometros,
            combustible: post.combustible,
            transmision: post.transmision,
            caballos: post.caballos,
            descripcion: post.descripcion,
            imagen: post.imagen
        };
    }
    
}

///////////////////sección opiniones///////////////////////


export function agregarOpinion(id,opinion){       
        if (!opiniones[id]) {
            opiniones[id] = [];
        }

        opinion.id = id.toString();
        opiniones[id].push(opinion);
        
}

export function obtenerOpiniones(idpag){
    return opiniones[idpag] || [];
}
