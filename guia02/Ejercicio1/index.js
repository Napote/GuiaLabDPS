var rombo = /** @class */ (function () {
    function rombo(diagonalV, diagonalH) {
        this.diagonalVertical = diagonalV;
        this.diagonalHorizontal = diagonalH;
    }
    rombo.prototype.calcular = function () {
        var resultado = this.diagonalVertical * this.diagonalHorizontal;
        return resultado;
    };
    return rombo;
}());
var diagonalV = prompt("Ingrese el valor de la diagonal vertical");
var diagonalH = prompt("Ingrese el valor de la diagonal Horzontal");
var areaRombo = new rombo(Number(diagonalH), Number(diagonalV));
var area = areaRombo.calcular();
alert("El área del rombo es: " + area);
