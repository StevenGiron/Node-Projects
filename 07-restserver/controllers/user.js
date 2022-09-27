const { response, request } = require('express');


const getUsers = (req = request, res = response) => {
    const { hola, apikey, page = 1 } = req.query;

    res.json({
        msg: "get API",
        hola,
        apikey,
        page
    });
};

const putUsers = (req, res = response) => {
    const { id } = req.params;

    res.json({
        msg: "put Api",
        id
    });
};

const postUsers = (req, res = response) => {
    const { nombre, edad } = req.body;

    res.status(201).json({
        msg: "post API",
        nombre,
        edad
    });
};

const deleteUsers = (req, res) => {
    res.json({
        msg: "delete API"
    });
};


module.exports = {
    getUsers,
    putUsers,
    postUsers,
    deleteUsers
};