const posts = new Map();
const opiniones = {};
let nextId = 0;
let fallos = [];
let compra = [];

addPost({ nombre: "Audi R8", precio: "250000", mano: "1º mano", kilometros: "37892", combustible: "Gasolina", transmision: "Manual", caballos: "400", descripcion: "Mejor coche para curvas", imagen: "https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2022/10/audi-r8-v10-gt-2023-2831875.jpg", compra: false });
addPost({ nombre: "BMW M3", precio: "180000", mano: "2º mano", kilometros: "112554", combustible: "Diesel", transmision: "Manual", caballos: "2500", descripcion: "Rapidisimo", imagen: "https://hips.hearstapps.com/hmg-prod/images/bmw-m3-cs-2024-1674639702.jpg", compra: false });
addPost({ nombre: "Nissan GTR", precio: "100000", mano: "4º mano o mas", kilometros: "134567", combustible: "Gasolina", transmision: "Automatico", caballos: "550", descripcion: "Mejor coche en las rectas", imagen: "https://hips.hearstapps.com/hmg-prod/images/nissan-gtr-2022-japon-portada-1631625941.jpg", compra: false });
addPost({ nombre: "Koenigsegg Regera", precio: "1500000000", mano: "1º mano", kilometros: "22987", combustible: "Gasolina", transmision: "Manual", caballos: "400", descripcion: "Coche para lucir estatus", imagen: "https://phantom-marca.unidadeditorial.es/1440c439e09c8f96e6ee133c95878233/resize/828/f/jpg/assets/multimedia/imagenes/2023/06/23/16875339705009.jpg", compra: false });
addPost({ nombre: "Chevrolet Corvette", precio: "80000", mano: "3º mano", kilometros: "78901", combustible: "Diesel", transmision: "Automatico", caballos: "760", descripcion: "Increible para drag races", imagen: "https://cdn-images.motor.es/image/m/800w.webp/fotos-noticias/2020/04/chevrolet-corvette-c8-z06-2022-detalles-202066766-1587540448_1.jpg", compra: false });
addPost({ nombre: "Porsche 911 GT3 RS", precio: "225000", mano: "4º mano o mas", kilometros: "145678", combustible: "Gasolina", transmision: "Manual", caballos: "525", descripcion: "Mejor para correr con amigos", imagen: "https://a.ccdn.es/cnet/contents/media/porsche/911/1300972.jpg/900x505cut/", compra: false });
addPost({ nombre: "Mercedes Clase A", precio: "64000", mano: "1º mano", kilometros: "5260", combustible: "Hibrido", transmision: "Automatico", caballos: "218", descripcion: "Excelente para ir por ciudad", imagen: "https://images.prismic.io/carwow/c16b95ab-a203-470e-98b9-57cc9f3dc4a2_19C0639_001+%281%29+%281%29.jpg", compra: false });
addPost({ nombre: "Lamborghini Veneno", precio: "5400000", mano: "2º mano", kilometros: "89543", combustible: "Diesel", transmision: "Automatico", caballos: "2500", descripcion: "Coche de ocasion para disfrutar en pareja", imagen: "https://imagenes.km77.com/fotos/bbtcontent/clippingnew/KM7KPH20131020_0001/medium.jpg", compra: false });


agregarOpinion(1, { nombre: "Jorge", email: "jorge@gmail.com", valoracion: "10", comentario: "Brutal coche, con estética de locos" });
agregarOpinion(1, { nombre: "Ivan", email: "ivan@gmail.com", valoracion: "1", comentario: "Un poco flojo el acabado interior" })

agregarOpinion(2, { nombre: "Jorge", email: "jorge@gmail.com", valoracion: "9", comentario: "Bonito pero algo mejorable" });
agregarOpinion(2, { nombre: "Ivan", email: "ivan@gmail.com", valoracion: "2", comentario: "Peor interior imposible" })

agregarOpinion(3, { nombre: "Jorge", email: "jorge@gmail.com", valoracion: "8", comentario: "Perfecto para calle pero algo rapido" });
agregarOpinion(3, { nombre: "Ivan", email: "ivan@gmail.com", valoracion: "3", comentario: "Horrible para carretera" })

agregarOpinion(4, { nombre: "Jorge", email: "jorge@gmail.com", valoracion: "7", comentario: "Es mi primer coche, aconsejable para principiantes" });
agregarOpinion(4, { nombre: "Ivan", email: "ivan@gmail.com", valoracion: "4", comentario: "Muy decepcionante por el precio" })

agregarOpinion(5, { nombre: "Jorge", email: "jorge@gmail.com", valoracion: "6", comentario: "Me esperaba algo mas pero es bonito" });
agregarOpinion(5, { nombre: "Ivan", email: "ivan@gmail.com", valoracion: "5", comentario: "Ni fu ni fa" })

agregarOpinion(6, { nombre: "Ivan", email: "ivan@gmail.com", valoracion: "6", comentario: "Mejorable para lo que cuesta" })
agregarOpinion(6, { nombre: "Jorge", email: "jorge@gmail.com", valoracion: "5", comentario: "Muy desgastado" });

agregarOpinion(7, { nombre: "Ivan", email: "ivan@gmail.com", valoracion: "7", comentario: "Precioso pero caro" })
agregarOpinion(7, { nombre: "Jorge", email: "jorge@gmail.com", valoracion: "4", comentario: "Caro y no sirve ni para campo" });

agregarOpinion(0, { nombre: "Ivan", email: "ivan@gmail.com", valoracion: "8", comentario: "Brutal coche, con estética de locos" })
agregarOpinion(0, { nombre: "Jorge", email: "jorge@gmail.com", valoracion: "3", comentario: "Muy mejorable" });


//fallos en el formulario
export function addFallo(fallo) {
    fallos.push(fallo);//añado al array el fallo
}

export function lastFallo() {
    return fallos;
}

export function inicializarFallos() {
    fallos = [];
}

//compra de coches
export function agragarAlCarrito(coche) {
    compra.push(coche);
}

export function EliminarDeCompra(postId) {
    compra = compra.filter(coche => coche.id !== postId);//crea una nueva compra con todos los elementos menos el del id
    const post = posts.get(postId);
    if (post) {
        post.compra = false;//ponemos que compra esta a false
    }
}


export function ModificarCompra(id) {
    const post = posts.get(id);
    if (post) {
        post.compra = true;
    }
}

export function allPrecio() {
    let num = 0;
    for (let i = 0; i < compra.length; i++) {
        num += parseInt(compra[i].precio);
    }
    return num;
}

export function deleteAll() {
    for (let i = 0; i < compra.length; i++) {
        const post = posts.get(compra[i].id);
        if (post) {
            post.compra = false;
        }
    }
    compra = [];
}

export function getCompra() {
    return compra.map(post => ({
        id: post.id,
        nombre: post.nombre,
        precio: post.precio,
        mano: post.mano,
        kilometros: post.kilometros,
        combustible: post.combustible,
        transmision: post.transmision,
        caballos: post.caballos,
        descripcion: post.descripcion,
        imagen: post.imagen,
        compra: post.compra
    }));
}

export function addPost(post, idAux) {
    ///En este apartado se comprueba que el post a crear existe o no, si no existe se le añade con el nuevo id. Pero, si existe se modifica dato a dato el post y se repostea con los nuevos datos///
    let postEncontrado = posts.get(idAux);
    if (postEncontrado) {
        postEncontrado.nombre = post.nombre;
        postEncontrado.precio = post.precio;
        postEncontrado.mano = post.mano;
        postEncontrado.kilometros = post.kilometros;
        postEncontrado.combustible = post.combustible;
        postEncontrado.transmision = post.transmision;
        postEncontrado.caballos = post.caballos;
        postEncontrado.descripcion = post.descripcion;
        postEncontrado.imagen = post.imagen;
        postEncontrado.compra = post.compra;
        postEncontrado.id = idAux;
        posts.set(idAux, postEncontrado);
        return idAux;
    }
    else {
        let id = nextId++;
        post.id = id.toString();
        posts.set(post.id, post);
        return post.id;
    }
}

export function deletePost(id) {
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
        imagen: post.imagen,
        compra: post.compra
    }));
}


export function getPostDetails(id) {
    const post = posts.get(id);
    if (post) {
        return {
            id: post.id,
            nombre: post.nombre,
            precio: post.precio,
            mano: post.mano,
            kilometros: post.kilometros,
            combustible: post.combustible,
            transmision: post.transmision,
            caballos: post.caballos,
            descripcion: post.descripcion,
            imagen: post.imagen,
            compra: post.compra
        };
    }

}


///////////////////sección opiniones///////////////////////


export function agregarOpinion(id, opinion) {
    if (!opiniones[id]) {
        opiniones[id] = [];
    }

    opinion.id = id.toString();
    opiniones[id].push(opinion);

}

export function obtenerOpiniones(idpag) {
    return opiniones[idpag] || [];
}

///////////////////Ajax///////////////////////

export function getCoches(from, to) {
    let values = [...posts.values()];
    if (from !== undefined) {
        return values.slice(from, to);
    } else {
        return values;
    }
}
