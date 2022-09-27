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
        (empleado) ?
        resolve(empleado): reject(`No existe empleado con id ${id}`);
    });
}

const getSalario = (id) => {
    return new Promise((resolve, reject) => {
        const salario = salarios.find((salario) => salario.id === id)?.salario;
        (salario) ?
        resolve(salario): reject(`El salario para el id ${id} no existe`)
    });
}

const getInfoUsuario = async(id) => {
    try {
        const empleado = await getEmpleado(id)
        const salario = await getSalario(id)
        return `El empleado ${empleado} tiene un salario de ${salario}`
        
    } catch (error) {
        throw error
    }
    
}

const id = 4;
getInfoUsuario(id)
    .then(msg => {
        console.log('TODO BIEN')
        console.log(msg)})
    .catch(err => {
        console.log('TODO MAL')
        console.log(err)});
