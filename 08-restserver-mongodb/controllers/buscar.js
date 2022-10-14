const { request, response } = require("express");
const { Usuario, Categoria, Producto } = require("../models");
const { ObjectId } = require('mongoose').Types;



const coleccionesPermitidas = [
    'categorias',
    'productos',
    'usuarios',
    'roles'
];

const buscarUsuarios = async(termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino) //Verificar si el termino es un id de mongo, retorna un bool

    if (esMongoId) {
        const usuario = await Usuario.findById(termino);

        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }

    const regex = new RegExp(termino, 'i') //expresion regular para que la busqueda sea insensible a las mayusculas

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }], //hacer una busqueda con diferentes termino usando operador logico or 
        $and: [{ estado: true }] // y que cumpla ademas con esta condicion
    });
    res.json({
        results: usuarios //.find retorna un arreglo vacio en caso de que no hallan por eso no es necesaria la condicion   
    });

};

const buscarCategorias = async(termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino)
    if (esMongoId) {
        const categoria = await Categoria.findById(termino);

        return res.json({
            results: (categoria) ? [categoria] : []
        })
    };

    const regex = new RegExp(termino, 'i')

    const categorias = await Categoria.find({
            nombre: regex,
            estado: true
        }

    );

    res.json({
        results: categorias
    })

};

const buscarProductos = async(termino = '', res = response) => {

    const esMongoId = ObjectId.isValid(termino);

    if (esMongoId) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            results: (producto) ? [producto] : []
        })
    };

    const regex = new RegExp(termino, 'i');

    const productos = await Producto.find({
        nombre: regex,
        estado: true
    }).populate('categoria', 'nombre');

    res.json({
        results: productos
    })
}

const buscar = (req = request, res = response) => {
    const { coleccion, termino } = req.params;

    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'categorias':
            buscarCategorias(termino, res)

            break;
        case 'productos':
            buscarProductos(termino, res)

            break;
        case 'usuarios':
            buscarUsuarios(termino, res)

            break;

        default:
            res.status(500).json({
                msg: 'Se olvido hacer esta busqueda'
            })
    }

};

module.exports = {
    buscar
};