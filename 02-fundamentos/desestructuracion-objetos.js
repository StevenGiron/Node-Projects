const deadpool = {
    nombre: 'Wade',
    apellido: 'Winston',
    poder: 'Regeneracion',

    getNombre() {
        return `${this.nombre} ${this.apellido} ${this.poder}`;
    }
};

// DE MANERA NORMAL
// const nombre = deadpool.nombre;
// const apellido = deadpool.apellido;
// const poder = deadpool.poder;

// DESESTRUCTURACION
// const { nombre, apellido, poder, edad = 0 } = deadpool;
// console.log(nombre, apellido, poder, edad);

// DESESTRUCTURACION Y NO PUEDO CAMBIAR LOS VALORES DE LAS VARIABLES PORQUE SON CONST
// function imprimeHeroe(heroe) {
//     const { nombre, apellido, poder, edad = 0 } = heroe;
//     console.log(nombre, apellido, poder, edad);
// }
// imprimeHeroe(deadpool);

// DESESTRUCTURACION Y  PUEDO CAMBIAR LOS VALORES DE LAS VARIABLES PORQUE NO SON CONST
function imprimeHeroe({ nombre, apellido, poder, edad = 0 }) {
    console.log(nombre, apellido, poder, edad);
}
imprimeHeroe(deadpool);


const heroes = ['Deadpool', 'Superman', 'Batman'];
// DE MANERA NORMAL
// const h1 = heroes[0];
// const h2 = heroes[1];
// const h3 = heroes[2];

// DESESTRUCTURACION
const [h1, h2, h3] = heroes; //Le asigno una variable a cada heroe del arreglo
// const [, , h3] = heroes; //Si solo me interesa uno los otros los separo solo con comas

console.log(h1, h2, h3);