class evaluator {
    constructor(root){
        this.root = root;
        this.number_list = [];
    }

    isDigit(input) {
        if (/^[0-9]$/.test(input.value)){
            return true;
        }
    }

    isBinOp(input) {
        if (/[+\-*/^]/.test(input.value)) {
            return true;
        }
    }

    Operator_evaluation(value, num1, num2){
    
    switch(value){
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            return num1 / num2;
        }
    }

    evaluate(node){

        if (node === null){
            return;
        }

        if (this.isDigit(node)){
            this.number_list.push(node.value);
            return parseFloat(node.value);
        }
        
        if (this.isBinOp(node)){
            const op = node.value;
            const left_value = this.evaluate(node.left);
            const right_value = this.evaluate(node.right);

            return this.Operator_evaluation(op, left_value, right_value);


        }


    }
}

