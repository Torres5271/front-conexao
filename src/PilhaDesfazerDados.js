class Pilha {
    constructor() {
        this.items = [];
    }

    
    getPilha() {
        return this.items
    }

    setPilha(items){
        this.items = items
    }
    
    push(item) {
        this.items.push(item);
    }

    pop() {
        if (this.items.length === 0) {
            return null;
        }
        return this.items.pop();
    }

    isEmpty() {
        return this.items.length === 0;
    }

    peek() {
        return this.items[this.items.length - 1];
    }
}

// const desfazerPilha = new Pilha();
// const refazerPilha = new Pilha();

// function fazerOperacao(operacao) {
//     console.log("Realizando operação:", operacao);
//     desfazerPilha.push(operacao);
// }

// function desfazerOperacao() {
//     const operacao = desfazerPilha.pop();
//     if (operacao) {
//         console.log("Desfazendo operação:", operacao);
//         refazerPilha.push(operacao);
//         if (operacao.type === 'adiciona') {
//             removePalavra(operacao.word);
//         } else if (operacao.type === 'remove') {
//             adicionaPalavra(operacao.word);
//         }

//     } else {
//         console.log("Não há mais operações para desfazer.");
//     }
// }

// function refazerOperacao() {
//     const operacao = refazerPilha.pop();
//     if (operacao) {
//         console.log("Refazendo operação:", operacao);
//         desfazerPilha.push(operacao);
//         if (operacao.type === 'adiciona') {
//             adicionaPalavra(operacao.word);
//         } else if (operacao.type === 'remove') {
//             removePalavra(operacao.word);
//         }
//     } else {
//         console.log("Não há operações desfeitas para refazer.");
//     }
// }

export default Pilha;