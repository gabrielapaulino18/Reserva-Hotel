class Produto {
    constructor(nome, quantidade, precoUnitario) {
        this.nome = nome;
        this.quantidade = quantidade;
        this.precoUnitario = precoUnitario;
    }

    calcularValorTotal() {
        return this.quantidade * this.precoUnitario;
    }
}

class ProdutoPerecivel extends Produto {
    constructor(nome, quantidade, precoUnitario, dataValidade) {
        super(nome, quantidade, precoUnitario);
        this.dataValidade = dataValidade;
    }

    verificarValidade() {
        const hoje = new Date();
        return this.dataValidade > hoje;
    }
}

class Estoque {
    constructor() {
        this.produtos = [];
    }

    adicionarProduto(produto) {
        this.produtos.push(produto);
    }

    removerProduto(nome) {
        this.produtos = this.produtos.filter(produto => produto.nome !== nome);
    }

    verificarEstoqueDisponivel(nome) {
        const produto = this.produtos.find(produto => produto.nome === nome);
        if (produto) {
            console.log(`Quantidade disponível de ${nome}: ${produto.quantidade}`);
        } else {
            console.log(`${nome} não encontrado no estoque.`);
        }
    }

    calcularValorTotalEstoque() {
        let valorTotal = 0;
        for (const produto of this.produtos) {
            valorTotal += produto.calcularValorTotal();
        }
        console.log(`Valor total do estoque: ${valorTotal}`);
    }
}

// Exemplo de uso
const meuEstoque = new Estoque();

// Adicionando produtos
meuEstoque.adicionarProduto(new Produto("Arroz", 50, 5));
meuEstoque.adicionarProduto(new ProdutoPerecivel("Leite", 20, 3, new Date(2024, 1, 15))); // Data de validade: 15 de fevereiro de 2024

// Verificando disponibilidade e calculando valor total
meuEstoque.verificarEstoqueDisponivel("Arroz");
meuEstoque.verificarEstoqueDisponivel("Leite");
meuEstoque.calcularValorTotalEstoque();

// Removendo um produto
meuEstoque.removerProduto("Arroz");

// Verificando disponibilidade e calculando valor total novamente
meuEstoque.verificarEstoqueDisponivel("Arroz");
meuEstoque.calcularValorTotalEstoque();