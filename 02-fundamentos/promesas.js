const empleados = [{
        id: 1,
        nombre: 'Steven'
    },
    {
        id: 2,
        nombre: 'Sebastian'
    },
    {
        id: 3,
        nombre: 'Juan'
    }
];
const salarios = [{
        id: 1,
        salario: 1000
    },
    {
        id: 2,
        salario: 1500
    },
];

const getEmpleado = (id) => {

    return new Promise((resolve, reject) => {

        const empleado = empleados.find((empleado) => empleado.id === id)?.nombre;
        (empleado)
            ? resolve(empleado)
            : reject(`No existe empleado con id ${id}`);
    });
}

const getSalario = (id) =>{
    return new Promise(( resolve, reject )=>{
        const salario = salarios.find(( salario ) => salario.id === id)?.salario;
        (salario)
            ? resolve(salario)
            : reject(`El salario para el id ${id} no existe`)
    });
}

const id = 4;

//PROMESAS

// getEmpleado(id)
//     .then(empleado => console.log(empleado))
//     .catch(err => console.log(err))

// getSalario(id)
//     .then(salario => console.log(salario))
//     .catch(err => console.log(err))


// getEmpleado(id)
//     .then(empleado => {
//         getSalario(id)
//             .then(salario => {
//                 console.log('El empleado:',empleado, 'tiene un salario de:',salario)
//             })
//             .catch(err => console.log(err))
//     })
//     .catch(err => console.log(err))

//PROMESAS EN CADENA
let nombre;
getEmpleado(id)
    .then(empleado => {
        nombre = empleado
        return getSalario(id)})
    .then(salario => console.log('El salario para el empleado', nombre, 'es de', salario))
    .catch(err => console.log(err))