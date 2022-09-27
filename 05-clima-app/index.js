import * as dotenv from 'dotenv';

import { leerInput, inquirerMenu, pause, listarLugares } from "./helpers/inquirer.js";
import { Busquedas } from "./models/busquedas.js";


dotenv.config();

// console.log(process.env);
const main = async() => {

    const busquedas = new Busquedas();
    let opt;

    do {

        console.clear();
        opt = await inquirerMenu();

        switch (opt) {
            case 1:

                const termino = await leerInput('Lugar:');

                //Buscar los lugares
                const lugares = await busquedas.ciudad(termino);

                //Seleccionar el lugar
                const id = await listarLugares(lugares);
                if (id === 0) continue;
                const lugarSeleccionado = await lugares.find(lugar => lugar.id === id);

                //Guardar en DB
                busquedas.agregarHistorial(lugarSeleccionado.name);

                //Clima del lugar
                const clima = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lng);

                //Mostrar resultados
                console.clear();
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad:', lugarSeleccionado.name.green);
                console.log('Lat:', lugarSeleccionado.lat);
                console.log('Lng:', lugarSeleccionado.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Temperatura min:', clima.min);
                console.log('Temperatura max:', clima.max);
                console.log('Descripción del clima:', clima.desc.green);
                break;

            case 2:
                console.log('');
                busquedas.historialCapitalizado.forEach((lugar, index) => {
                    const idx = `${index + 1}.`.green;
                    console.log(`${idx} ${lugar}`);
                });
                break;
        }

        if (opt !== 0) await pause();


    }
    while (opt !== 0);

};

main();