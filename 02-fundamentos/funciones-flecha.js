function sumar(a, b) {
    return a + b;
}

const sumarFlecha = (a, b) => {
    return a + b;
};

//ES LO MISMO QUE ESCRIBIR LO SIGUIENTE PUESTO EL BLOQUE DE CODIGO SOLO ES EL RETURN
const sumarFlecha2 = (a, b) => a + b;

const saludar = () => 'hola mundo'; //Estamos obviando el return

console.log(sumarFlecha(5, 10));
console.log(sumarFlecha2(5, 10));
console.log(saludar());