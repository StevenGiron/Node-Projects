const { request, response } = require("express");
const { Categoria } = require('../models');

const obtenerCategorias = async(req = request, res = response) => {
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
        .populate('usuario', 'nombre')
        .skip(Number(desde))
        .limit(Number(limite))
    ]);

    res.json({
        total,
        categorias
    });

};

const obtenerCategoria = async(req = request, res = response) => {
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');

    res.json({
        categoria
    });

};

const crearCategoria = async(req = request, res = response) => {

    const nombre = req.body.nombre.toUpperCase(); //Convertir a mayusculas para validar que no exista otra igual

    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB.nombre} ya existe`
        });
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    };

    const categoria = new Categoria(data);

    //Guardar en DB
    await categoria.save();

    res.status(201).json(categoria);

};

const actualizarCategoria = async(req = request, res = response) => {
    const { id } = req.params;
    const { estado, usuario, ...data } = req.body; //Debo dejar fuera todo aquello que no quiero que sea actualizado

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.json(categoria);
};

const borrarCategoria = async(req = request, res = response) => {
    const { id } = req.params;

    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false });

    res.json(categoria);

};

module.exports = {
    actualizarCategoria,
    obtenerCategorias,
    obtenerCategoria,
    crearCategoria,
    borrarCategoria
};