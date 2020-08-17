class calculadora{
    numero1: number;
    numero2: number;

    constructor(num1:number, num2:number){
        this.numero1 = num1;
        this.numero2 = num2;
    }

    operaciones(){
        let resSuma: number = this.numero1 + this.numero2;
        let resResta: number = this.numero1 - this.numero2;
        let resDivision: number = this.numero1 / this.numero2;
        let resMultiplicacion: number = this.numero1 * this.numero2;
        alert(`El resultado de la suma de ${this.numero1}+${this.numero2}=${resSuma} 
        \nEl resultado de la resta de ${this.numero1}-${this.numero2}=${resResta} 
        \nEl resultado de la Division de ${this.numero1}/${this.numero2}=${resDivision} 
        \nEl resultado de la Multiplicacion de ${this.numero1}*${this.numero2}=${resMultiplicacion}`);
    }
}

let num1: number = Number(prompt("Ingrese el numero 1"));
let num2: number = Number(prompt("Ingrese el numero 2"));
let operaciones = new calculadora(num1, num2);

operaciones.operaciones();

