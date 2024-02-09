class Quarto {
    constructor(numero, tipo, precoDiaria, reservado = false) {
        this.numero = numero;
        this.tipo = tipo;
        this.precoDiaria = precoDiaria;
        this.reservado = reservado;
    }

    verificarDisponibilidade() {
        return !this.reservado;
    }
}

class Hospede {
    constructor(nome, email) {
        this.nome = nome;
        this.email = email;
    }
}

class Reserva {
    constructor(quarto, hospede, dataInicio, dataFim) {
        this.quarto = quarto;
        this.hospede = hospede;
        this.dataInicio = dataInicio;
        this.dataFim = dataFim;
        this.custoTotal = this.calculaCustoTotal();
    }

    calculaCustoTotal() {
        const dias = (this.dataFim - this.dataInicio) / (1000 * 60 * 60 * 24); // Calcula a diferença em dias
        return dias * this.quarto.precoDiaria;
    }
}

class Hotel {
    constructor() {
        this.quartos = [];
        this.reservas = [];
    }

    adicionarQuarto(quarto) {
        this.quartos.push(quarto);
    }

    reservarQuarto(quarto, hospede, dataInicio, dataFim) {
        if (!quarto.verificarDisponibilidade()) {
            console.log(`Quarto ${quarto.numero} não está disponível para as datas selecionadas!`)
        }

        const reserva = new Reserva(quarto, hospede, dataInicio, dataFim);
        quarto.reservado = true; // Marca o quarto como reservado
        this.reservas.push(reserva);
        return reserva;
        
    }

    exibirQuartosDisponiveis() {
        console.log("Quartos disponíveis:");
        this.quartos.forEach(quarto => {
            if (!quarto.reservado) {
                console.log(`Número: ${quarto.numero} Tipo: ${quarto.tipo}, Preço: ${quarto.precoDiaria} por dia`);
            }
        });
    }
}


// Cria um hotel
const hotel = new Hotel();

// Adiciona quartos
hotel.adicionarQuarto(new Quarto(101, 'Standard', 100));
hotel.adicionarQuarto(new Quarto(102, 'Luxo', 200));
hotel.adicionarQuarto(new Quarto(103, 'Suíte', 300));

// Exibe os quartos disponíveis
hotel.exibirQuartosDisponiveis();

// Cria um hóspede
const hospede1 = new Hospede('João', 'joao@example.com');

// Reserva um quarto para o hóspede
const reserva1 = hotel.reservarQuarto(hotel.quartos[0], hospede1, new Date(2024, 2, 8), new Date(2024, 2, 15));
console.log(`Reserva realizada com sucesso! Custo total:", ${reserva1.custoTotal}`);

// Tenta reservar um quarto ocupado
const reservaInvalida = hotel.reservarQuarto(hotel.quartos[0], hospede1, new Date(2024, 2, 10), new Date(2024, 2, 18));


// Exibe os quartos disponíveis após as reservas
hotel.exibirQuartosDisponiveis();