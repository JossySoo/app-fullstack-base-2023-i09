
function sayHello() {
    let current_value = document.getElementById("textarea_1") as HTMLInputElement;
    let new_value = "Hello world!!!" + "\n" + current_value.value;
    document.getElementById("textarea_1").innerHTML = new_value;
    let nombre: string = "lala";

}


let nombreVariable: string;
nombreVariable = "2";
console.log(nombreVariable+"ads");
let otraVariable: number;
otraVariable = 124;
console.log(otraVariable + 5);

let verdadero: boolean;
verdadero = true;

if (otraVariable != 124) {
    console.log("verdadero");
} else {
    console.log("es falso");
}

let lista: Array<string>;

lista = new Array<string>();

lista.push("nueva");//0
lista.push("matias");//1
lista.push("otra");//2

for (let i in lista) {
    console.log(lista[i]);
    
}
console.log(lista.length);


function sumar(x: number, y:number):number {
    return x + y;
}
function restar(x: number, y:number):number {
    return x - y;
}

function ejecutar(numero1: number, numero2: number, func: any) {
    alert(func(numero1, numero2));
}


window.addEventListener("load",  ()=> {
    sayHello();
    sayHello();
       sayHello();
    sayHello();
    console.log(sumar(2, 3));
});

