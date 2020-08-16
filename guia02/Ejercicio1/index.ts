class rombo {
    diagonalVertical:number; diagonalHorizontal:number;

    constructor (diagonalV:number, diagonalH:number){
        this.diagonalVertical = diagonalV;
        this.diagonalHorizontal = diagonalH;
    }

    calcular():number {
        var resultado:number = this.diagonalVertical * this.diagonalHorizontal;
        return resultado;
    }

}

var diagonalV:string = prompt("Ingrese el valor de la diagonal vertical"); 
var diagonalH:string = prompt("Ingrese el valor de la diagonal Horzontal"); 

let areaRombo = new rombo(Number(diagonalH), Number(diagonalV));

var area:number = areaRombo.calcular();

alert("El área del rombo es: " + area);