// Estado inicial da fazenda virtual
let estadoJogo = {
    recursos: 1000,
    producao: 0,
    sustentabilidade: 100,
    mes: 1,
    melhoriasAtivas: []
};

// Dicionário de dados das tecnologias disponíveis
const tecnologias = {
    irrigacao: { custo: 200, producaoBonus: 25, sustBonus: 5, nome: "Irrigação Inteligente" },
    drone: { custo: 400, producaoBonus: 60, sustBonus: 10, nome: "Mapeamento por Drone" },
    adubo: { custo: 150, producaoBonus: 15, sustBonus: 20, nome: "Adubação Orgânica" }
};

// Atualiza os dados mostrados no painel HTML
function atualizarInterface() {
    document.getElementById('recursos-val').innerText = estadoJogo.recursos;
    document.getElementById('producao-val').innerText = estadoJogo.producao;
    document.getElementById('sustentabilidade-val').innerText = estadoJogo.sustentabilidade;
}

// Executa a compra de tecnologia sustentável
function investir(tipo) {
    const tech = tecnologias[tipo];

    if (estadoJogo.melhoriasAtivas.includes(tipo)) {
        document.getElementById('game-feedback').innerText = `A tecnologia ${tech.nome} já está ativa na sua propriedade!`;
        return;
    }

    if (estadoJogo.recursos >= tech.custo) {
        estadoJogo.recursos -= tech.custo;
        estadoJogo.melhoriasAtivas.push(tipo);
        document.getElementById('game-feedback').innerText = `Sucesso! Você implementou ${tech.nome}. Avance o mês para ver os benefícios na colheita.`;
        atualizarInterface();
    } else {
        document.getElementById('game-feedback').innerText = "Recursos insuficientes para investir nesta melhoria.";
    }
}

// Executa os ciclos de crescimento e colheita
function avancarMes() {
    if (estadoJogo.mes >= 3) {
        let feedbackFinal = `Safra finalizada! Você produziu ${estadoJogo.producao} sacas com ${estadoJogo.sustentabilidade}% de sustentabilidade ambiental. `;
        
        // Critério de vitória do Projeto Agrinho Programação 2026
        if (estadoJogo.sustentabilidade >= 115 && estadoJogo.producao >= 80) {
            feedbackFinal += "Parabéns! Você alcançou a pontuação máxima e conquistou o Selo Fazenda de Ouro Agrinho 2026! 🏆🌱";
        } else {
            feedbackFinal += "Bom trabalho! Experimente combinar mais tecnologias ecológicas para ganhar o selo de ouro na próxima tentativa.";
        }
        document.getElementById('game-feedback').innerText = feedbackFinal;
        return;
    }

    let ganhoProducao = 10; // Crescimento natural base
    let ganhoSustentabilidade = 0;

    // Processa o impacto acumulado de cada tecnologia ativa
    estadoJogo.melhoriasAtivas.forEach(techTipo => {
        ganhoProducao += tecnologias[techTipo].producaoBonus;
        ganhoSustentabilidade += tecnologias[techTipo].sustBonus;
    });

    estadoJogo.producao += ganhoProducao;
    estadoJogo.sustentabilidade += ganhoSustentabilidade;
    estadoJogo.recursos += ganhoProducao * 12; // Transforma sacas colhidas em capital financeiro

    estadoJogo.mes++;
    document.getElementById('game-feedback').innerText = `Mês ${estadoJogo.mes - 1} concluído. Sua produção cresceu +${ganhoProducao} sacas! Melhore sua estratégia para o próximo ciclo.`;
    
    atualizarInterface();
}

// Reseta o simulador para o ponto inicial
function reiniciarJogo() {
    estadoJogo = {
        recursos: 1000,
        producao: 0,
        sustentabilidade: 100,
        mes: 1,
        melhoriasAtivas: []
    };
    document.getElementById('game-feedback').innerText = "O simulador foi reiniciado. Trace um novo plano sustentável!";
    atualizarInterface();
}

// Roda automaticamente ao iniciar o site
atualizarInterface();