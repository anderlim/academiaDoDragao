function Calculadora() {
    this.display = document.querySelector('.display');
    const historicDiv = document.querySelector('.historic');
    const toggleHistoryButton = document.querySelector('.btn-hist');
    const clearHistoryButton = document.querySelector('.btn-clear-hist');
    const finalButtons = document.querySelectorAll('.btn-full'); // Selecionar os botões finais

    this.inicia = function () {
        this.carregarHistorico(); // Carrega o histórico salvo no localStorage
        this.cliqueBotoes();
        this.pressionaBackSpace();
        this.pressionaEnter();
        this.toggleHistory();
        this.clearHistory();
        this.selectHistoric();

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

    this.pressionaEnter = function () {
        this.display.addEventListener('keyup', e => {
            if (e.key === 'Enter') { // Código da tecla Enter
                this.realizaConta();
            }
        });
    };

    this.pressionaBackSpace = function () {
        this.display.addEventListener('keydown', e => {
            if (e.key === 'Backspace') { // Código da tecla Backspace
                e.preventDefault(); // Previne o comportamento padrão
                this.deleteOne();   // Chama a função deleteOne para apagar o último caractere
            }
        });
    };

    this.realizaConta = function () {
        let diceList = "";
        let expression = this.display.value;
        let dicesRollOut = new DiceRoll(this.display.value);
        let rollOut = dicesRollOut.executeRollOut();
        if (rollOut[0] !== false) {
            for (let i = 1; i < rollOut.length; i++) {
                diceList += `\n->${rollOut[i]}`;
            }
            const p = document.createElement('p');
            const line = document.createElement('p');
            const resultado = `${expression} = ${rollOut[0]} (${diceList})`;
            p.innerText = resultado;
            p.id = 'historic-item'; // Adiciona o ID ao elemento <p>
            line.innerText = `-----------------------------------------------`;
            line.id = 'historic-line'; // Adiciona o ID ao elemento <p>

            // Salvar no localStorage
            this.salvarNoHistorico(resultado);

            historicDiv.appendChild(p);
            historicDiv.appendChild(line);

            // Atualizar o display com o resultado
            this.display.value = rollOut[0];
        } else {
            historicDiv.innerText = `Não foi possível fazer a conta/lançamento`;
        }
    };

    this.clearDisplay = function () {
        this.display.value = '';
        this.display.focus(); // Adiciona o foco após limpar o display
    };

    this.deleteOne = function () {
        this.display.value = this.display.value.slice(0, -1);
        this.display.focus(); // Adiciona o foco após deletar um caractere
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

            this.display.focus(); // Adiciona o foco após clicar em um botão
        });
    };

    this.btnParaDisplay = function (valor) {
        this.display.value += valor;
        this.display.focus(); // Adiciona o foco após adicionar um valor ao display
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
                this.display.value = e.target.innerText.split('=')[0].trim();
                this.display.focus(); // Adiciona o foco após selecionar um item do histórico
            }
        });
    };
}

const calculadora = new Calculadora();
calculadora.inicia();