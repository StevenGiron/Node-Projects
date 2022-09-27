import * as fs from 'fs';

const archivo = './db/data.json';

const guardarDB = (data) => {

    fs.writeFileSync(archivo, JSON.stringify(data)); //Convertir un objeto a su version JSON valida como un string

};

const leerDB = () => {

    if (!fs.existsSync(archivo)) {
        return null;
    }
    const info = fs.readFileSync(archivo, { encoding: 'utf-8' });
    const data = JSON.parse(info); //funcion contraria al stringify, estoy conviertiendo el string a un objeto
    return data;
};

export {
    guardarDB,
    leerDB
};