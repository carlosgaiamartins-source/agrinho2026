let production = 0;
const productionDisplay = document.getElementById('production');
const messageDisplay = document.getElementById('message');
const plantButton = document.getElementById('plantButton');

plantButton.addEventListener('click', () => {
    // Incrementa a produção aleatoriamente entre 1 e 5
    const increment = Math.floor(Math.random() * 5) + 1;
    production += increment;
    productionDisplay.textContent = production;

    // Mensagens educativas
    if (production < 20) {
        messageDisplay.textContent = "Continue plantando e cuidando da sua fazenda!";
    } else if (production < 50) {
        messageDisplay.textContent = "Ótimo! Sua produção está crescendo!";
    } else {
        messageDisplay.textContent = "Parabéns! Você está se tornando um agricultor experiente!";
    }
});