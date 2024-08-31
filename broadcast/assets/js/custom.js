document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.getElementById('toggleCalculator');
    const calculatorModal = document.getElementById('calculatorModal');
    const closeCalculator = document.getElementById('closeCalculator');

    toggleButton.addEventListener('click', () => {
        calculatorModal.style.display = calculatorModal.style.display === 'flex' ? 'none' : 'flex';
    });

    closeCalculator.addEventListener('click', () => {
        calculatorModal.style.display = 'none';
    });
});

document.getElementById('helpButton').addEventListener('click', function() {
    document.getElementById('helpPopup').style.display = 'block';
});

document.getElementById('closeHelp').addEventListener('click', function() {
    document.getElementById('helpPopup').style.display = 'none';
});

// Fecha o popup se o usuário clicar fora do conteúdo do popup
window.addEventListener('click', function(event) {
    const helpPopup = document.getElementById('helpPopup');
    if (event.target == helpPopup) {
        helpPopup.style.display = 'none';
    }
});
