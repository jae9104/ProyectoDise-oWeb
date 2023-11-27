const posts = new Map();
let nextId = 0;

addPost({ nombre: "Audi R8", precio: "100000", mano: "1º mano", kilometros: "0-10k", combustible: "Gasolina", transmision: "Manual", caballos: "500", descripcion: "Mejor coche", imagen: "https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2022/10/audi-r8-v10-gt-2023-2831875.jpg"  });
addPost({ nombre: "BMW M3", precio: "25000", mano: "2º mano", kilometros: "0-10k", combustible: "Gasolina", transmision: "Manual", caballos: "750", descripcion: "Rapidisimo", imagen: "https://hips.hearstapps.com/hmg-prod/images/bmw-m3-cs-2024-1674639702.jpg"  });
addPost({ nombre: "Audi R8", precio: "100000", mano: "1º mano", kilometros: "0-10k", combustible: "Gasolina", transmision: "Manual", caballos: "500", descripcion: "Mejor coche", imagen: "https://cdn.autobild.es/sites/navi.axelspringer.es/public/media/image/2022/10/audi-r8-v10-gt-2023-2831875.jpg"  });
addPost({ nombre: "BMW M3", precio: "25000", mano: "2º mano", kilometros: "0-10k", combustible: "Gasolina", transmision: "Manual", caballos: "750", descripcion: "Rapidisimo", imagen: "https://hips.hearstapps.com/hmg-prod/images/bmw-m3-cs-2024-1674639702.jpg"  });

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
            precio: post.precio,
            mano: post.mano,
            kilometros: post.kilometros,
            combustible: post.combustible,
            transmision: post.transmision,
            caballos: post.caballos,
            descripcion: post.descripcion,
            imagen: post.imagen
        };
    }
    return null;  // Retorna null si no se encuentra el post con el ID proporcionado
}

