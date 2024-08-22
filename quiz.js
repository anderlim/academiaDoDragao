let characterData = {};

function chooseOption(option) {
    const step1 = document.getElementById('quiz-step-1');
    const step2 = document.getElementById('quiz-step-2');
    const classOptions = document.getElementById('class-options');

    // Esconder a etapa atual
    step1.style.display = 'none';

    if (option === 'lordOfTheRings') {
        characterData = { ...characterData, theme: 'Senhor dos Anéis' };
        step2.style.display = 'block';
        classOptions.innerHTML = `
            <button onclick="chooseClass('guerreiro')">Guerreiro</button>
            <button onclick="chooseClass('arqueiro')">Arqueiro</button>
            <button onclick="chooseClass('mago')">Mago</button>
        `;
    } else if (option === 'harryPotter') {
        characterData = { ...characterData, theme: 'Harry Potter' };
        step2.style.display = 'block';
        classOptions.innerHTML = `
            <button onclick="chooseClass('grifinoria')">Grifinória</button>
            <button onclick="chooseClass('sonserina')">Sonserina</button>
            <button onclick="chooseClass('corvinal')">Corvinal</button>
        `;
    } else if (option === 'dungeonsAndDragons') {
        characterData = { ...characterData, theme: 'Dungeon and Dragons' };
        step2.style.display = 'block';
        classOptions.innerHTML = `
            <button onclick="chooseClass('paladino')">Paladino</button>
            <button onclick="chooseClass('ladino')">Ladino</button>
            <button onclick="chooseClass('feiticeiro')">Feiticeiro</button>
        `;
    }
}

function chooseClass(selectedClass) {
    const step2 = document.getElementById('quiz-step-2');
    const step3 = document.getElementById('quiz-step-3');
    const characterOptions = document.getElementById('character-options');

    step2.style.display = 'none';
    characterData = { ...characterData, class: selectedClass };

    if (selectedClass === 'guerreiro') {
        step3.style.display = 'block';
        characterOptions.innerHTML = `
            <button onclick="chooseCharacter('Aragorn')">Aragorn</button>
            <button onclick="chooseCharacter('Boromir')">Boromir</button>
            <button onclick="chooseCharacter('Gimli')">Gimli</button>
        `;
    } else if (selectedClass === 'arqueiro') {
        step3.style.display = 'block';
        characterOptions.innerHTML = `
            <button onclick="chooseCharacter('Legolas')">Legolas</button>
            <button onclick="chooseCharacter('Thranduil')">Thranduil</button>
            <button onclick="chooseCharacter('Bard')">Bard</button>
        `;
    } else if (selectedClass === 'mago') {
        step3.style.display = 'block';
        characterOptions.innerHTML = `
            <button onclick="chooseCharacter('Gandalf')">Gandalf</button>
            <button onclick="chooseCharacter('Saruman')">Saruman</button>
            <button onclick="chooseCharacter('Radagast')">Radagast</button>
        `;
    }
    // Adicione mais classes e opções de personagem conforme necessário
}

function chooseCharacter(character) {
    characterData = { ...characterData, character: character };
    document.getElementById('quiz-step-3').style.display = 'none';
    document.getElementById('final-step').style.display = 'block';
}

function finalizeQuiz() {
    // Salvar os dados em localStorage para serem recuperados na página de ficha
    localStorage.setItem('characterData', JSON.stringify(characterData));
    // Redirecionar para a página de ficha
    window.location.href = 'ficha.html';
}
