class Tree_node {
    constructor(type, value=null, pos, left=null, right=null){
        this.type = type;
        this.value = value;
        this.pos = pos;
        this.left = left;
        this.right = right;

    }
}


class AMST{
    constructor(input) {
        this.expression = input;//string expression
        this.pos = 0;//position
        this.cleared = [];//with removed whitespace
        this.root = null;
        
    }

    current() {//returns current pos
        return this.cleared[this.pos];
    }

    Remove_whitespace() {//removes whitespace
        const tokenized = this.expression.replace(/\s/g, "");
        for (let i = 0; i < tokenized.length; i++) {
            this.cleared += tokenized[i];
        }
    }

    // PARSING process: each mapped condition assigns new child nodes if it's met and recurses again || acts as the initial call
    //Flow: Exp => Term => Unary => Paren => NumLiterals

    //Call AMST along with the inputted string first.
    //Call Remove_whitespace to filter out whitespaces (do this before parsing).
    //Call parseExpression to start parsing.

    //function explanation: parsing => 
    //initialize node instance
    //store left
    parseExpression() {// +/-

        let node = this.parseTerm();

        while (this.current() === "+" || this.current() === "-") {//parses + and -
            const op = this.current();//stores current op for value
            this.pos++;//proceeds
            const right = this.parseTerm();
            node = new Tree_node(
                "BinaryExpression, Exp",
                op,
                this.pos,
                node,//left node branch
                right// right node branch
            )

        }

        return node;
    }

    parseTerm() {// * / div

        let node = this.parseUnary();//explores options

        while (this.current() === "*" || this.current() === "/") {//parses * and /
            const op = this.current();//stores current op for value
            this.pos++;//proceeds
            const right = this.parseUnary();
            node = new Tree_node(
                "BinaryExpression, Exp",
                op,
                this.pos,
                node,//left node branch
                right// right node branch
            )
        }

        return node;
    }

    parseUnary() {
        if(this.current() === "-"){
            this.pos++;

            const Neg = this.current();

            this.pos++;
            return new Tree_node(
                "UnaryExpression",
                `-${Neg}`
            )
        }
        return this.Parenthesis_skip();
    }

    Parenthesis_skip(){
        if(this.current() === "("){
            this.pos++;
            const node = this.parseExpression();
            return node;
        }
        return this.parseNumber();
    }

    parseNumber() {
        const start = this.pos;

        while(/[0-9.]/.test(this.current())){//returns false if NaN
            this.pos++;
        }

        const value = this.cleared.slice(start, this.pos);

        return new Tree_node(
            "NumberLiteral",
            Number(value),
            this.pos
        )

    }

    parse(){
        this.root = this.parseExpression();
        return this.root;
    }
}

