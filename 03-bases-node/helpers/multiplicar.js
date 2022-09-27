const fs = require('fs');
const colors = require('colors');
const crearArchivo = async(listar, hasta, base = 5) => {


    try {

        let salida = '';
        let consola = '';

        for (let i = 1; i <= hasta; i++) {
            salida += (`${ base } x ${ i } = ${ base * i }\n`);
            consola += (`${ colors.blue(base) } ${colors.red('x')} ${ i } ${'='.red} ${ colors.blue(base * i) }\n`);
        }

        if (listar) {
            console.log('====================='.cyan);
            console.log('Tabla del:'.green, colors.green(base));
            console.log('====================='.cyan);
            console.log(consola);
        }



        fs.writeFileSync(`./salida/tabla-${base}.txt`, salida);
        return `tabla-${base}.txt`;

    } catch (error) {
        throw error;
    }

};

module.exports = {
    crearArchivo
};