var empleado = /** @class */ (function () {
    function empleado(nombreE, salarioE) {
        this.nombre = nombreE;
        this.salario = salarioE;
    }
    empleado.prototype.deducciones = function () {
        var pagoIVA = this.salario * 0.13;
        var salarioNeto = this.salario - pagoIVA;
        return salarioNeto;
    };
    empleado.prototype.info = function () {
        var salarioNeto = this.deducciones();
        alert("Hola " + this.nombre + ", su salario base es " + this.salario + ", aplicando el descuento en concepto del IVA su sueldo neto es: $" + salarioNeto);
    };
    return empleado;
}());
var nombreE = prompt("Ingrese su nombre ");
var salarioE = Number(prompt("Ingrese su salario "));
var descSalaro = new empleado(nombreE, salarioE);
descSalaro.info();
