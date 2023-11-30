const posts = new Map();
const opiniones = {};
let nextId = 0;
let fallos = new Array;

addPost({ nombre: "Audi R8", precio: "250000", mano: "1º mano", kilometros: "0-10k", combustible: "Gasolina", transmision: "Manual", caballos: "400", descripcion: "Mejor coche para curvasa", imagen: "https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2022/10/audi-r8-v10-gt-2023-2831875.jpg"  });
addPost({ nombre: "BMW M3", precio: "180000", mano: "2º mano", kilometros: "50k-100k", combustible: "Diesel", transmision: "Manual", caballos: "2500", descripcion: "Rapidisimo", imagen: "https://hips.hearstapps.com/hmg-prod/images/bmw-m3-cs-2024-1674639702.jpg"  });
addPost({ nombre: "Nissan GTR", precio: "100000", mano: "3º mano", kilometros: "100k-200k", combustible: "Gasolina", transmision: "Automatico", caballos: "550", descripcion: "Mejor coche en las rectas", imagen: "https://hips.hearstapps.com/hmg-prod/images/nissan-gtr-2022-japon-portada-1631625941.jpg"  });

agregarOpinion(1,{nombre: "Jorge", email: "jorge@gmail.com", valoracion: "8", comentario: "Brutal coche, con estética de locos"});
agregarOpinion(1,{nombre: "Ivan", email: "ivan@gmail.com", valoracion: "3", comentario: "Un poco flojo el acabado interior"})

export function addFallo(fallo){
    fallos.push(fallo);//añado al array el fallo
}

export function lastFallo(){
    return fallos;
}

export function inicializarFallos() {
    fallos = [];
}

export function addPost(post) {
    let id = nextId++;
    post.id = id.toString();
    posts.set(post.id, post);
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
