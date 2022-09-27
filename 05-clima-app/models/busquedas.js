import axios from 'axios';
import * as fs from 'fs';


class Busquedas {
    constructor() {
        this.historial = [];
        this.dbPath = './db/database.json';
        this.leerDB();
    }

    get paramsMapbox() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit ': 5,
            'language': 'es'
        };
    }
    get paramsWeathermap() {
        return {
            'appid': process.env.OPENWEATHER_KEY,
            'units ': 'metric',
            'lang': 'es'
        };
    }

    get historialCapitalizado() {

        return this.historial.map(lugar => {

            let palabras = lugar.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));

            return palabras.join(' ');
        });

    }

    async ciudad(lugar = '') {

        try {

            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await instance.get();
            return resp.data.features.map(lugar => ({ //Parentesis y llaves significa que retornare un objeto de manera implicita
                id: lugar.id,
                name: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1]
            }));

        } catch (error) {
            return [];
        }
    }
    async climaLugar(lat, lon) {

        try {

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather?units=metric`,
                params: {...this.paramsWeathermap, lat, lon }
            });

            const resp = await instance.get();
            const { weather, main } = resp.data;

            return {
                temp: main.temp,
                min: main.temp_min,
                max: main.temp_max,
                desc: weather[0].description

            };

        } catch (error) {
            console.log(error);
        }
    }

    agregarHistorial(lugar = '') {

        if (this.historial.includes(lugar.toLocaleLowerCase())) {
            return;
        }
        this.historial = this.historial.splice(0, 5);
        this.historial.unshift(lugar.toLocaleLowerCase());

        this.guardarDB();

    }

    guardarDB() {
        const payload = { //En caso de que haya que grabar mas propiedades, en este caso solo el historial
            historial: this.historial
        };
        fs.writeFileSync(this.dbPath, JSON.stringify(payload));
    }

    leerDB() {
        if (!fs.existsSync(this.dbPath)) {
            return;
        }

        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);
        this.historial = data.historial;
    }


}

export {
    Busquedas
};