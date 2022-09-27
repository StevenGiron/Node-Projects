// setTimeout(function() {
//     console.log('hola mundo');
// }, 1000);

// setTimeout(() => {
//     console.log('hola mundo');
// }, 1000);

const getUserById = (id, callback) => {
    const usuario = {
        id, //Si no se le asigna nada es porque id=id
        nombre: 'Steven'
    };

    setTimeout(() => {
        callback(usuario);
    }, 1500);

};

getUserById(10, (usuario) => {
    console.log(usuario.id);
    console.log(usuario.nombre.toUpperCase());
});