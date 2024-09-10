function Calculadora() {
    this.display = document.querySelector('.display');
    const historicDiv = document.querySelector('.historic');
    const toggleHistoryButton = document.querySelector('.btn-hist');
    const clearHistoryButton = document.querySelector('.btn-clear-hist');
    const finalButtons = document.querySelectorAll('.btn-full');

    // Função para detectar se é um dispositivo móvel
    this.isMobileDevice = function() {
        return /Mobi|Android/i.test(navigator.userAgent);
    };

    this.inicia = function () {
        this.carregarHistorico();
        this.cliqueBotoes();
        this.toggleHistory();
        this.clearHistory();
        this.selectHistoric();

        if (!this.isMobileDevice()) {
            this.pressionaTeclado();
        }

        // Limpar localStorage ao fechar o site
        window.addEventListener('beforeunload', function () {
            localStorage.removeItem('historico');
        });
    };

    this.carregarHistorico = function () {
        let historico = JSON.parse(localStorage.getItem('historico')) || [];
        historico.forEach(item => {
            const p = document.createElement('p');
            const line = document.createElement('p');
            p.innerText = item;
            p.id = 'historic-item';
            line.innerText = `-----------------------------------------------`;
            line.id = 'historic-line';
            historicDiv.appendChild(p);
            historicDiv.appendChild(line);
        });
    };

    this.salvarNoHistorico = function (texto) {
        let historico = JSON.parse(localStorage.getItem('historico')) || [];
        historico.push(texto);
        localStorage.setItem('historico', JSON.stringify(historico));
    };

    this.realizaConta = function () {
        let diceList = "";
        let expression = this.display.innerText;
        let dicesRollOut = new DiceRoll(this.display.innerText);
        let rollOut = dicesRollOut.executeRollOut();
        if (rollOut[0] !== false) {
            for (let i = 1; i < rollOut.length; i++) {
                diceList += `\n->${rollOut[i]}`;
            }
            const p = document.createElement('p');
            const line = document.createElement('p');
            const resultado = `${expression} = ${rollOut[0]} (${diceList})`;
            p.innerText = resultado;
            p.id = 'historic-item';
            line.innerText = `-----------------------------------------------`;
            line.id = 'historic-line';

            this.salvarNoHistorico(resultado);

            historicDiv.appendChild(p);
            historicDiv.appendChild(line);

            this.display.innerText = rollOut[0];
        } else {
            historicDiv.innerText = `Não foi possível fazer a conta/lançamento`;
        }
    };

    this.clearDisplay = function () {
        this.display.innerText = '0'; // Reseta para '0'
    };

    this.deleteOne = function () {
        if (this.display.innerText.length > 1) {
            this.display.innerText = this.display.innerText.slice(0, -1); // Remove o último caractere
        } else {
            this.display.innerText = '0'; // Reseta para '0' se restar um caractere
        }
    };

    this.cliqueBotoes = function () {
        document.addEventListener('click', e => {
            const el = e.target;

            if (el.classList.contains('btn-num')) {
                this.btnParaDisplay(el.innerText);
            }

            if (el.classList.contains('btn-clear')) {
                this.clearDisplay();
            }

            if (el.classList.contains('btn-del')) {
                this.deleteOne();
            }

            if (el.classList.contains('btn-eq')) {
                this.realizaConta();
            }
        });
    };

    this.btnParaDisplay = function (valor) {
        if (this.display.innerText === '0') {
            this.display.innerText = valor; // Substitui o zero inicial
        } else {
            this.display.innerText += valor; // Adiciona o valor ao display existente
        }
    }

    this.toggleHistory = function () {
        toggleHistoryButton.addEventListener('click', () => {
            historicDiv.classList.toggle('active');
            if (historicDiv.classList.contains('active')) {
                toggleHistoryButton.innerText = 'Esconder Histórico';
                finalButtons.forEach(button => button.classList.add('reduced-button'));
            } else {
                toggleHistoryButton.innerText = 'Mostrar Histórico';
                finalButtons.forEach(button => button.classList.remove('reduced-button'));
            }
        });
    };

    this.clearHistory = function () {
        clearHistoryButton.addEventListener('click', () => {
            historicDiv.innerHTML = '';
            localStorage.removeItem('historico');
        });
    };

    this.selectHistoric = function () {
        historicDiv.addEventListener('click', e => {
            if (e.target.tagName === 'P') {
                this.display.innerText = e.target.innerText.split('=')[0].trim();
            }
        });
    };

    this.pressionaTeclado = function () {
        document.addEventListener('keydown', e => {
            const key = e.key;
            const isInputFocused = document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA';
    
            // Se o foco estiver em um input ou textarea, permitir o comportamento normal
            if (isInputFocused) {
                return; // Não faz nada, permite o comportamento normal
            }
    
            // Permitindo apenas números, operadores básicos e teclas específicas
            if (!isNaN(key) || ['+', '-', '*', '/', 'd', '.'].includes(key)) {
                this.btnParaDisplay(key);
            }
    
            if (key === 'Enter') {
                e.preventDefault();
                this.realizaConta();
            }
    
            if (key === 'Backspace') {
                e.preventDefault();
                this.deleteOne();
            }
    
            // Prevenindo comportamento padrão para outras teclas
            if (!['Enter', 'Backspace', '+', '-', '*', '/', 'd', '.', ...Array(10).keys().map(String)].includes(key)) {
                e.preventDefault();
            }
        });
    };    
}

const calculadora = new Calculadora();
calculadora.inicia();
