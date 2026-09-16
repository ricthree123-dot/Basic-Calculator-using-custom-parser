//calc
const screen_content = document.getElementById("screen");
let string_arr = [];
function append_display(text){
    screen_content.value += text;
    console.log("append_display function executed");
    string_arr.push(text);
}

function clearScreen(){
    screen_content.value = "";
    console.log("clear function executed");
}
function backspace(){

    if (string_arr[-1] === undefined){
        console.log("whitespaced");
        string_arr.pop();
    }
    string_arr.pop();//removes last element aka backspace
    string_arr = string_arr.join('');
    console.log(string_arr);
    screen_content.value = string_arr;
    string_arr = string_arr.split('');
    console.log(string_arr);
    console.log("backspace function executed");
}

function append_operation(operation){
    screen_content.value += " ";
    string_arr.push(" ");
    screen_content.value += operation;
    string_arr.push(operation);
    screen_content.value += " ";
    string_arr.push(" ");
    console.log("append_display function executed");
}

function calculate(){
    const amst = new AMST(screen_content.value);
    amst.Remove_whitespace()
    const root = amst.parse();
    console.log(JSON.stringify(root, null, 2));
    console.log(amst.cleared);
    const evaluate = new evaluator(amst.root);
    const evaluated = evaluate.evaluate(root);
    console.log(evaluated);
    screen_content.value = evaluated;
    string_arr = [];
    string_arr.push(evaluated);

}


