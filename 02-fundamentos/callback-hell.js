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


const getEmpleado = (id, callback) => {
    const empleado = empleados.find((empleado) => empleado.id === id)?.nombre;
    if (empleado) {
        callback(null, empleado);
    } else {
        callback(`El empleado con ID: ${id} no existe`);
    }
};

const getSalario = (id, callback) => {
    const salario = salarios.find((salario) => salario.id === id)?.salario; //permite traer la propiedad salario si la condicion se cumple 

    if (salario) {
        callback(null, salario);
    } else {
        callback(`El salario para el id ${id} no existe`);
    }
};

const id = 1;

getEmpleado(id, (err, empleado) => {
    if (err) {
        console.log('ERROR!!');
        return console.log(err);
    }

    getSalario(id, (err, salario) => {
        if (err) {
            return console.log(err);
        }
        console.log('El empleado: ', empleado, 'tiene un salario de: ', salario);

    });
    
});