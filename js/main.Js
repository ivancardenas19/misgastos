
//Segunda Entrega entrega

/* function calcularInteresCuotas() {
   
    let precioArticulo = parseFloat(prompt("Ingrese el Precio del Articulo:"));
    let cuotas;
    let interes;

    do {
        cuotas = parseInt(prompt("Ingrese el numero de cuotas en el que desea abonar (1, 3, 6, 12 o 18):"));
        switch (cuotas) {
            case 1:
            case 3:
                interes = 0; 
                break;
            case 6:
                interes = 0.22;
                break;
            case 12:
                interes = 0.44; 
                break;
            case 18:
                interes = 0.66;
                break;
            default:
                alert("No existe esa cantidad de Cuotas");
                cuotas = null;
        }
    } while (cuotas === null); 

    let precio = precioArticulo * (1 + interes);
    let cuotamensual = precio / cuotas;

    alert("El Precio es: $" + precioArticulo+ 
          "\nInteres: " + (interes * 100) + "%" +
          "\ncuota mensual: $" + cuotamensual + 
          "\nValor final: $" + precio);
}
calcularInteresCuotas();
 */

///////////////////////////////////////////////////////////////////////////

let gastos = {
    lista: [], // Array que guarda los gastos

    // Función para agregar un nuevo gasto al array
    agregarGasto: function(tipo, valor, fecha, vencimiento) {
        let fechaCompra = new Date(fecha);
        let fechaVencimiento = new Date(vencimiento);

        if (fechaVencimiento < fechaCompra) {
            alert("La fecha de vencimiento no puede ser anterior a la fecha de compra.");
            return;
        }

        this.lista.push({
            tipoGasto: tipo,
            valorGasto: parseFloat(valor.toFixed(2)), 
            fechaGasto: fechaCompra,
            vencimientos: fechaVencimiento
        });
    },

    // Función para validar una fecha ingresada por el usuario en formato dd-mm-aa
    validarFecha: function(fechaString) {
        // El formato esperado es dd-mm-aa, por lo tanto, separamos la fecha por "-"
        let partesFecha = fechaString.split("-");
        
        // Validaque haya 3 partes y que cada parte sea un número válido
        if (partesFecha.length !== 3 || partesFecha.some(part => isNaN(parseInt(part)))) {
            return false;
        }

        // Obtenemos el día, mes y año
        let dia = parseInt(partesFecha[0]);
        let mes = parseInt(partesFecha[1]);
        let anio = parseInt(partesFecha[2]);

        // Verificamos que los valores sean válidos para una fecha
        if (dia < 1 || dia > 31 || mes < 1 || mes > 12 || anio < 0) {
            return false;
        }

        return true;
    },

    // Valida Fecha
    ingresarFechaValida: function(mensaje) {
        let fechaIngresada;
        do {
            fechaIngresada = prompt(mensaje);
        } while (!this.validarFecha(fechaIngresada));

        return fechaIngresada;
    },

    //suma total de los gastos
    calcularTotal: function() {
        let total = 0;
        for (let gasto of this.lista) {
            total += gasto.valorGasto;
        }
        return total.toFixed(2); // s
    }
};

// Función para ingresar un nuevo gasto
function ingresarGasto() {
    let tipo = prompt("Ingrese el tipo de gasto:");
    let valor = parseFloat(prompt("Ingrese el valor del gasto:"));
    
    // ingresa la fecha del gasto
    let fechaGasto = gastos.ingresarFechaValida("Ingrese la fecha del gasto en formato dd-mm-aa:");
    
    // ingrese la fecha de vencimiento
    let vencimiento;
    do {
        vencimiento = gastos.ingresarFechaValida("Ingrese la fecha de vencimiento en formato dd-mm-aa:");
    } while (new Date(vencimiento) < new Date(fechaGasto)); // Validar que la fecha de vencimiento no sea anterior a la fecha del gasto

    gastos.agregarGasto(tipo, valor, fechaGasto, vencimiento);

    let agregarOtro = confirm("¿Desea agregar otro gasto?");
    if (agregarOtro) {
        ingresarGasto(); // Llamada recursiva para agregar otro gasto
    }
}

// ingreso de gastos
ingresarGasto();


console.log("Lista de gastos:");
for (let gasto of gastos.lista) {
    console.log(gasto);
}
let totalGastos = gastos.calcularTotal();
console.log("Total de gastos:", totalGastos);
