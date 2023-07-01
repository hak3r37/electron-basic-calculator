console.log("hello from the renderer")

let memory: number = 0;
let input: number = 0;
let sign: string = "=";

// const b_1  = document.getElementById("b_1");
// const b_2  = document.getElementById("b_2");
// const b_3  = document.getElementById("b_3");
// const b_4  = document.getElementById("b_4");
// const b_5  = document.getElementById("b_5");
// const b_6  = document.getElementById("b_6");
// const b_7  = document.getElementById("b_7");
// const b_8  = document.getElementById("b_8");
// const b_9  = document.getElementById("b_9");
// const b_0  = document.getElementById("b_0");
// const b_del  = document.getElementById("b_del");
// const b_plus  = document.getElementById("b_plus");
// const b_minus  = document.getElementById("b_minus");
// const b_div  = document.getElementById("b_div");
// const b_multi  = document.getElementById("b_multi");
// const b_eq  = document.getElementById("b_eq");

const firstLine = document.getElementById("first_line");
const eqSign = document.getElementById("eq_sign");
const eqResult = document.getElementById("eq_result");

function onButtonClick(operation: string, value: string) {
    console.log(operation + ' ' + value + ' ' + "ABC");
    if(operation == "number") handleNumber(parseInt(value));
    else {
        if(value == "del") handleDelete();
        else handleOperation(value);
    }
    console.log(operation + ' ' + value + ' ' + "DEF");
    update();
}

function update() {
    if(firstLine instanceof HTMLElement) firstLine.innerText = memory.toString();
    if(eqSign instanceof HTMLElement) eqSign.innerText = sign.toString();
    if(eqResult instanceof HTMLElement) eqResult.innerText = input.toString();
}

const buttons = document.getElementsByClassName("button");
for(let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    if(button instanceof HTMLElement)
        button.addEventListener("click", (event) => {
            (button.dataset.val && button.dataset.operation) ? 
            onButtonClick(button.dataset.operation, button.dataset.val) : "";
        });
}

function handleNumber(value: number) { 
    input = input * 10 + value; 
}
function handleDelete() { 
    if(input == 0) {
        memory = 0;
        sign = "=";
    } else {
        input = 0;
    }
}
function handleOperation(operation: string) {
    if(operation == "=") {
        if(sign != "=") {
            input = handleEval(sign, memory, input);
            memory = 0;
        }
    } else {
        if(input != 0) {
            memory = memory == 0 ? input : handleEval(sign, memory, input);
            input = 0;
        }
    }
    sign = operation;
}

function handleEval(sign: string, a: number, b: number) {
    switch(sign) {
        case "+": return a + b;
        case "-": return a - b;
        case "*": return a * b;
        case "/": return a / b;
    }
    return 0;
}
