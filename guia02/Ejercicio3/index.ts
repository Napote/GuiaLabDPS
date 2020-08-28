class empleado{

    nombre: string;
    salario: number;
    constructor (nombreE: string, salarioE:number){
        this.nombre = nombreE;
        this.salario = salarioE;
    }

    deducciones():number{
        let pagoIVA: number = this.salario * 0.13;
        let salarioNeto: number = this.salario - pagoIVA;
        return salarioNeto;
    }

    info(){
        let salarioNeto:number = this.deducciones();
        alert(`Hola ${this.nombre}, su salario base es ${this.salario}, aplicando el descuento en concepto del IVA su sueldo neto es: $${salarioNeto}`);
    }
}

let nombreE: string = prompt("Ingrese su nombre ");
let salarioE: number = Number(prompt("Ingrese su salario "));
let descSalaro = new empleado(nombreE, salarioE);

descSalaro.info();