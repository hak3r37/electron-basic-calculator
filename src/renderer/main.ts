let memory: number = 0;
let input: number = 0;
let sign: string = "=";

const firstLine = document.getElementById("first_line");
const eqSign = document.getElementById("eq_sign");
const eqResult = document.getElementById("eq_result");

function onButtonClick(operation: string, value: string) {
    if(operation == "number") handleNumber(parseInt(value));
    else {
        if(value == "del") handleDelete();
        else handleOperation(value);
    }
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
