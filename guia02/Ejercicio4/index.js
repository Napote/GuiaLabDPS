var calculadora = /** @class */ (function () {
    function calculadora(num1, num2) {
        this.numero1 = num1;
        this.numero2 = num2;
    }
    calculadora.prototype.operaciones = function () {
        var resSuma = this.numero1 + this.numero2;
        var resResta = this.numero1 - this.numero2;
        var resDivision = this.numero1 / this.numero2;
        var resMultiplicacion = this.numero1 * this.numero2;
        alert("El resultado de la suma de " + this.numero1 + "+" + this.numero2 + "=" + resSuma + " \n        \nEl resultado de la resta de " + this.numero1 + "-" + this.numero2 + "=" + resResta + " \n        \nEl resultado de la Division de " + this.numero1 + "/" + this.numero2 + "=" + resDivision + " \n        \nEl resultado de la Multiplicacion de " + this.numero1 + "*" + this.numero2 + "=" + resMultiplicacion);
    };
    return calculadora;
}());
var num1 = Number(prompt("Ingrese el numero 1"));
var num2 = Number(prompt("Ingrese el numero 2"));
var operaciones = new calculadora(num1, num2);
operaciones.operaciones();
