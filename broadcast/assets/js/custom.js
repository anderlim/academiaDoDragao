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
