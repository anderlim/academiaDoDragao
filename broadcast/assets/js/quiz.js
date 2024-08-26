// Função para calcular o modificador de destreza
function calcularModificador(dest) {
    return Math.floor((dest - 10) / 2);
}

// Função para atualizar a Classe de Armadura (CA)
function updateArmorClass() {
    const armor = document.getElementById('armor-select').value;
    const shield = document.getElementById('shield-select').value;
    const dexterityValue = parseInt(document.getElementById('dexterity').value);
    const dexterityModifier = calcularModificador(dexterityValue);
    let ca = 10; // Base CA

    switch (armor) {
        case 'leather':
            ca = 11 + dexterityModifier;
            break;
        case 'chainmail':
            ca = 16; // Chainmail não permite adicionar o modificador de destreza
            break;
        case 'plate':
            ca = 18; // Plate não permite adicionar o modificador de destreza
            break;
    }

    if (shield === 'yes') {
        ca += 2;
    }

    characterData.ca = ca;
    // console.log('Classe de Armadura (CA):', characterData.ca);
}

// Código original que não deve ser alterado
let characterData = {
    race: '',
    class: '',
    background: '',
    deslocamento: 0,
    hp: 0,
    salvaguardas: {},
    pericias: {},
    atributos: {},
    ca: 10,
    equipamentos: [],
    armas: []
};

function updateRace() {
    const selectedRace = document.getElementById('race-select').value;
    if (selectedRace) {
        characterData.race = selectedRace;
        characterData.deslocamento = getRaceSpeed(selectedRace);
        // console.log(`Raça: ${characterData.race}, Deslocamento: ${characterData.deslocamento}`);
    }
}

function updateClass() {
    const selectedClass = document.getElementById('class-select').value;
    if (selectedClass) {
        characterData.class = selectedClass;
        characterData.hp = getClassHP(selectedClass);
        characterData.salvaguardas = getClassSaves(selectedClass);
        characterData.pericias = getClassSkills(selectedClass);
        // console.log(`Classe: ${characterData.class}, HP: ${characterData.hp}`);
    }
}

function updateBackground() {
    const selectedBackground = document.getElementById('background-select').value;
    if (selectedBackground) {
        characterData.background = selectedBackground;
        characterData.pericias = { ...characterData.pericias, ...getBackgroundSkills(selectedBackground) };
        // console.log(`Background: ${characterData.background}`);
    }
}

function updateModifiers() {
    const attributes = {
        strength: parseInt(document.getElementById('strength').value),
        dexterity: parseInt(document.getElementById('dexterity').value),
        constitution: parseInt(document.getElementById('constitution').value),
        intelligence: parseInt(document.getElementById('intelligence').value),
        wisdom: parseInt(document.getElementById('wisdom').value),
        charisma: parseInt(document.getElementById('charisma').value)
    };

    characterData.atributos = attributes;
    // console.log('Atributos e Modificadores:', characterData.atributos);
    updateArmorClass();  // Atualiza a CA com base nos novos valores de Destreza
}

function updateArmorClass() {
    const armor = document.getElementById('armor-select').value;
    const shield = document.getElementById('shield-select').value;
    let ca = 10; // Base CA

    switch (armor) {
        case 'leather':
            ca = 11 + calculateModifier(characterData.atributos.dexterity);
            break;
        case 'chainmail':
            ca = 16;
            break;
        case 'plate':
            ca = 18;
            break;
        case 'none':
            ca = 10 + calculateModifier(characterData.atributos.dexterity);
            break;
    }

    if (shield === 'yes') {
        ca += 2;
    }

    characterData.ca = ca;
    // console.log('Classe de Armadura (CA):', characterData.ca);
}

function calculateModifier(attributeValue) {
    return Math.floor((attributeValue - 10) / 2);
}

function saveManualCharacter() {
    // Salvar os dados no localStorage para serem recuperados na página de ficha
    localStorage.setItem('characterData', JSON.stringify(characterData));

    // Redirecionar para a página de ficha
    window.location.href = 'ficha.html';
}

function getRaceSpeed(race) {
    const raceData = {
        humano: 30,
        elfo: 35,
        anao: 25,
        // Adicione mais raças conforme necessário
    };
    return raceData[race] || 30;
}

// Função para desabilitar os campos da ficha
function disableFormFields() {
    const formFields = document.querySelectorAll('#character-form input, #character-form select, #character-form textarea');
    formFields.forEach(field => {
        field.disabled = true;
    });
}

// Novo bloco de código adicionado
let quizCharacterData = {
    race: '',
    class: '',
    background: '',
    hp: 0,
    deslocamento: 0,
    ca: 10,
    atributos: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10,
    },
    salvaguardas: {},
    pericias: {},
    magias: [],
    equipamentos: [],
    habilidades: [],
    proficiencias: '',
    universe: ''
};

function chooseOption(option) {
    const step1 = document.getElementById('quiz-step-1');
    const step2 = document.getElementById('quiz-step-2');
    const raceOptions = document.getElementById('race-options');

    step1.style.display = 'none';
    quizCharacterData.universe = option;

    if (option === 'lordOfTheRings' || option === 'dungeonsAndDragons') {
        step2.style.display = 'block';
        raceOptions.innerHTML = `
            <h2>Qual raça você prefere em ${option === 'lordOfTheRings' ? 'Senhor dos Anéis' : 'Dungeons & Dragons'}?</h2>
            <div class="race-option">
                <img src="./images/humano.png" alt="Humano">
                <p>Humanos são versáteis e adaptáveis, conhecidos por sua ambição e inovação. Escolher essa raça da bônus de +1 em todos os atributos e o deslocamento 9 metros.</p>
                <button onclick="chooseRace('Humano')">Humano</button>
            </div>
            <div class="race-option">
                <img src="./images/elfo.png" alt="Elfo">
                <p>Elfos são graciosos e ágeis, com uma longa vida e afinidade com a natureza e magia. Escolher essa raça da bônus de +2 Destreza, +1 Inteligência e o Deslocamento 9 metros.</p>
                <button onclick="chooseRace('Elfo')">Elfo</button>
            </div>
            <div class="race-option">
                <img src="./images/anao.png" alt="Anão">
                <p>Anões são robustos e resistentes, conhecidos por sua habilidade em combate e artesanato. Escolher essa raça da bônus de +2 Constituição, +2 Força e o Deslocamento 9 metros.</p>
                <button onclick="chooseRace('Anão')">Anão</button>
            </div>
        `;
    } else if (option === 'harryPotter') {
        quizCharacterData.race = 'Humano';
        quizCharacterData.deslocamento = 9;

        step2.style.display = 'block';
        raceOptions.innerHTML = `
            <h2>Qual casa você prefere em Harry Potter?</h2>
            <div class="house-option">
                <img src="./images/grifinoria.png" alt="Grifinória">
                <p>Ao escolher essa casa você sera um humano que são versáteis e adaptáveis, conhecidos por sua ambição e inovação.Escolher essa raça da bônus de +1 em todos os atributos e o deslocamento 9 metros e sua classe será feiticeiro que conjura magias de forma natural, com poder inato. Suas habilidades mágicas vêm de uma conexão sanguínea ou evento sobrenatural. Ele da como bônus Fonte de Magia e Truques</p>
                <button onclick="chooseHouse('Grifinória')">Grifinória</button>
            </div>
            <div class="house-option">
                <img src="./images/sonserina.png" alt="Sonserina">
                <p>Ao escolher essa casa você sera um humanos que são versáteis e adaptáveis, conhecidos por sua ambição e inovação.Escolher essa raça da bônus de +1 em todos os atributos e o deslocamento 9 metros e sua classe será bruxo, fez um pacto com uma entidade poderosa para obter habilidades mágicas. Conjura magias através de sua relação com seu patrono sobrenatural. Ele da como bônus Pacto das Trevas e Lâmina Pactual.</p>
                <button onclick="chooseHouse('Sonserina')">Sonserina</button>
            </div>
            <div class="house-option">
                <img src="./images/corvinal.png" alt="Corvinal">
                <p>Ao escolher essa casa você sera um humanos que são versáteis e adaptáveis, conhecidos por sua ambição e inovação.Escolher essa raça da bônus de +1 em todos os atributos e o deslocamento 9 metros. Mago um estudioso da magia, usa seu conhecimento e aprendizado para lançar uma ampla gama de feitiços. Depende de livros de magias e preparação. Ele da como bônus Magia de 1º Nível e Recuperação Arcana.</p>
                <button onclick="chooseHouse('Corvinal')">Corvinal</button>
            </div>
            <div class="house-option">
                <img src="./images/lufa.png" alt="Lufa-Lufa">
                <p>Ao escolher essa casa você sera um humanos que são versáteis e adaptáveis, conhecidos por sua ambição e inovação.Escolher essa raça da bônus de +1 em todos os atributos e o deslocamento 9 metros. Clérigo um devoto de uma divindade, canaliza poder divino para curar, proteger e combater o mal. Suas magias são obtidas através da fé e devoção religiosa. Ele da como bônus Domínio da Vida e Lançamento de Magia.</p>
                <button onclick="chooseHouse('Lufa-Lufa')">Lufa-Lufa</button>
            </div>
        `;
    }
}

function chooseRace(selectedRace) {
    const step2 = document.getElementById('quiz-step-2');
    const step3 = document.getElementById('quiz-step-3');
    const classOptions = document.getElementById('class-options');

    step2.style.display = 'none';
    quizCharacterData.race = selectedRace;

    // Define o deslocamento baseado na raça escolhida
    switch (selectedRace) {
        case 'Humano':
            quizCharacterData.deslocamento = 9;
            applyRaceBonus('Humano');
            break;
        case 'Elfo':
            quizCharacterData.deslocamento = 9;
            applyRaceBonus('Elfo');
            break;
        case 'Anão':
            quizCharacterData.deslocamento = 9;
            applyRaceBonus('Anão');
            break;
    }

    step3.style.display = 'block';

    // Exibir opções de classe com imagens
    classOptions.innerHTML = `
        <h2>Qual classe você mais gosta?</h2>
        <div class="class-option">
            <img src="./images/guerreiro.png" alt="Guerreiro">
            <p>Guerreiros são mestres em combate corpo-a-corpo, com habilidades de defesa excepcionais. Ele da como bônus +1 CA e Ataque Extra.</p>
            <button onclick="chooseClass('guerreiro')">Guerreiro</button>
        </div>
        <div class="class-option">
            <img src="./images/arqueiro.png" alt="Patrulheiro">
            <p>Patrulheiros são especialistas em combate à distância e sobrevivência na natureza. Ele da como bônus Estilo de Combate (Arqueiro) e Flecha Rápida.</p>
            <button onclick="chooseClass('Patrulheiro')">Patrulheiro</button>
        </div>
        <div class="class-option">
            <img src="./images/mago.png" alt="Mago">
            <p>Magos são estudiosos da magia, capazes de conjurar feitiços poderosos e versáteis. Ele da como bônus Magia de 1º Nível e Recuperação Arcana.</p>
            <button onclick="chooseClass('mago')">Mago</button>
        </div>
    `;
}

function chooseHouse(selectedHouse) {
    const step2 = document.getElementById('quiz-step-2');
    const step4 = document.getElementById('quiz-step-4');
    const characterOptions = document.getElementById('character-options');

    step2.style.display = 'none';

    switch (selectedHouse) {
        case 'Grifinória':
            quizCharacterData.class = 'feiticeiro';
            applyRaceBonus('Humano'); // A raça é sempre Humano nas casas de Harry Potter
            setQuizCharacterData('feiticeiro');
            break;
        case 'Sonserina':
            quizCharacterData.class = 'bruxo';
            applyRaceBonus('Humano');
            setQuizCharacterData('bruxo');
            break;
        case 'Corvinal':
            quizCharacterData.class = 'mago';
            applyRaceBonus('Humano');
            setQuizCharacterData('mago');
            break;
        case 'Lufa-Lufa':
            quizCharacterData.class = 'clerigo';
            applyRaceBonus('Humano');
            setQuizCharacterData('clerigo');
            break;
    }

    step4.style.display = 'block';

    if (selectedHouse === 'Grifinória') {
        characterOptions.innerHTML = `
            <h2>Qual personagem você mais gosta?</h2>
            <button onclick="chooseCharacter('Harry')">Harry Potter</button>
            <button onclick="chooseCharacter('Hermione')">Hermione Granger</button>
            <button onclick="chooseCharacter('Ron')">Ron Weasley</button>
        `;
    } else if (selectedHouse === 'Sonserina') {
        characterOptions.innerHTML = `
            <h2>Qual personagem você mais gosta?</h2>
            <button onclick="chooseCharacter('Draco')">Draco Malfoy</button>
            <button onclick="chooseCharacter('Snape')">Severus Snape</button>
            <button onclick="chooseCharacter('Bellatrix')">Bellatrix Lestrange</button>
        `;
    } else if (selectedHouse === 'Corvinal') {
        characterOptions.innerHTML = `
            <h2>Qual personagem você mais gosta?</h2>
            <button onclick="chooseCharacter('Luna')">Luna Lovegood</button>
            <button onclick="chooseCharacter('Cho')">Cho Chang</button>
            <button onclick="chooseCharacter('Filius')">Filius Flitwick</button>
        `;
    } else if (selectedHouse === 'Lufa-Lufa') {
        characterOptions.innerHTML = `
            <h2>Qual personagem você mais gosta?</h2>
            <button onclick="chooseCharacter('Cedric')">Cedric Diggory</button>
            <button onclick="chooseCharacter('Newt')">Newt Scamander</button>
            <button onclick="chooseCharacter('Pomona')">Pomona Sprout</button>
        `;
    }
}

function chooseClass(selectedClass) {
    const step3 = document.getElementById('quiz-step-3');
    const step4 = document.getElementById('quiz-step-4');
    const characterOptions = document.getElementById('character-options');

    step3.style.display = 'none';
    quizCharacterData.class = selectedClass;
    setQuizCharacterData(selectedClass);

    step4.style.display = 'block';
    
    if (quizCharacterData.universe === 'lordOfTheRings') {
        if (selectedClass === 'guerreiro') {
            characterOptions.innerHTML = `
                <h2>Qual personagem você mais gosta?</h2>
                <button onclick="chooseCharacter('Aragorn')">Aragorn</button>
                <button onclick="chooseCharacter('Boromir')">Boromir</button>
                <button onclick="chooseCharacter('Gimli')">Gimli</button>
            `;
        } else if (selectedClass === 'Patrulheiro') {
            characterOptions.innerHTML = `
                <h2>Qual personagem você mais gosta?</h2>
                <button onclick="chooseCharacter('Legolas')">Legolas</button>
                <button onclick="chooseCharacter('Thranduil')">Thranduil</button>
                <button onclick="chooseCharacter('Bard')">Bard</button>
            `;
        } else if (selectedClass === 'mago') {
            characterOptions.innerHTML = `
                <h2>Qual personagem você mais gosta?</h2>
                <button onclick="chooseCharacter('Gandalf')">Gandalf</button>
                <button onclick="chooseCharacter('Saruman')">Saruman</button>
                <button onclick="chooseCharacter('Radagast')">Radagast</button>
            `;
        }
    } else if (quizCharacterData.universe === 'dungeonsAndDragons') {
        if (selectedClass === 'guerreiro') {
            characterOptions.innerHTML = `
                <h2>Qual personagem você mais gosta?</h2>
                <button onclick="chooseCharacter('Holga')">Holga</button>
                <button onclick="chooseCharacter('Xenk')">Xenk</button>
            `;
        } else if (selectedClass === 'Patrulheiro') {
            characterOptions.innerHTML = `
                <h2>Qual personagem você mais gosta?</h2>
                <button onclick="chooseCharacter('Edgin')">Edgin</button>
                <button onclick="chooseCharacter('Simon')">Simon</button>
            `;
        } else if (selectedClass === 'mago') {
            characterOptions.innerHTML = `
                <h2>Qual personagem você mais gosta?</h2>
                <button onclick="chooseCharacter('Sofina')">Sofina</button>
                <button onclick="chooseCharacter('Zenk')">Zenk</button>
            `;
        }
    }
}

function chooseCharacter(character) {
    quizCharacterData.character = character;

    switch (character) {
        case 'Harry':
        case 'Hermione':
        case 'Ron':
            quizCharacterData.background = 'Herói do povo';
            break;
        case 'Draco':
        case 'Snape':
        case 'Bellatrix':
            quizCharacterData.background = 'Nobre';
            break;
        case 'Luna':
        case 'Cho':
        case 'Filius':
            quizCharacterData.background = 'Sábio';
            break;
        case 'Cedric':
        case 'Newt':
        case 'Pomona':
            quizCharacterData.background = 'Forasteiro';
            break;
        case 'Aragorn':
            quizCharacterData.background = 'Herói do povo';
            break;
        case 'Boromir':
        case 'Gimli':
        case 'Bard':
            quizCharacterData.background = 'Soldado';
            break;
        case 'Legolas':
        case 'Thranduil':
            quizCharacterData.background = 'Nobre';
            break;
        case 'Gandalf':
        case 'Saruman':
        case 'Radagast':
            quizCharacterData.background = 'Sábio';
            break;
        case 'Holga':
            quizCharacterData.background = 'Forasteiro';
            break;
        case 'Xenk':
            quizCharacterData.background = 'Herói do povo';
            break;
        case 'Edgin':
        case 'Simon':
            quizCharacterData.background = 'Artista';
            break;
        case 'Sofina':
            quizCharacterData.background = 'Sábio';
            break;
    }

    document.getElementById('quiz-step-4').style.display = 'none';
    document.getElementById('final-step').style.display = 'block';
}

function setQuizCharacterData(selectedClass) {
    // Primeiro, definir os valores padrão dos atributos da classe
    const baseAttributes = {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
    };

    switch (selectedClass) {
        case 'guerreiro':
            baseAttributes.strength = 15;
            baseAttributes.constitution = 14;
            baseAttributes.dexterity = 13;
            baseAttributes.intelligence = 10;
            baseAttributes.wisdom = 12;
            baseAttributes.charisma = 8;
            quizCharacterData.hp = 12;
            quizCharacterData.equipamentos = ['Espada longa', 'Armadura de malha', 'Escudo'];
            quizCharacterData.habilidades = ['Ataque extra', 'Estilo de combate(defesa +1 CA)'];
            quizCharacterData.proficiencias = 'Armaduras: Todas, Armas: Simples e Marciais';
            quizCharacterData.ca = 18;
            break;
        case 'Patrulheiro':
            baseAttributes.strength = 13;
            baseAttributes.constitution = 12;
            baseAttributes.dexterity = 15;
            baseAttributes.intelligence = 8;
            baseAttributes.wisdom = 14;
            baseAttributes.charisma = 10;
            quizCharacterData.hp = 11;
            quizCharacterData.equipamentos = ['Arco longo', 'Aljava com flechas', 'Meia armadura'];
            quizCharacterData.habilidades = ['Estilo de combate (Arqueiro)', 'Flecha rápida'];
            quizCharacterData.proficiencias = 'Armaduras: Leves, Armas: Simples e Marciais';
            quizCharacterData.ca = 13;
            break;
        case 'mago':
            baseAttributes.strength = 8;
            baseAttributes.constitution = 10;
            baseAttributes.dexterity = 12;
            baseAttributes.intelligence = 15;
            baseAttributes.wisdom = 13;
            baseAttributes.charisma = 14;
            quizCharacterData.hp = 6;
            quizCharacterData.equipamentos = ['Cajado', 'Livro de magias', 'Roupas de mago'];
            quizCharacterData.magias = ['Mísseis Mágicos', 'Escudo Arcano', 'Mãos Mágicas'];
            quizCharacterData.habilidades = ['Recuperação Arcana', 'Magia de 1º Nível'];
            quizCharacterData.proficiencias = 'Armaduras: Nenhuma, Armas: Simples, Ferramentas: Nenhuma';
            quizCharacterData.ca = 10;
            break;
        case 'paladino':
            baseAttributes.strength = 15;
            baseAttributes.constitution = 13;
            baseAttributes.dexterity = 8;
            baseAttributes.intelligence = 10;
            baseAttributes.wisdom = 12;
            baseAttributes.charisma = 14;
            quizCharacterData.hp = 11;
            quizCharacterData.equipamentos = ['Espada longa', 'Armadura completa', 'Escudo','símbolo sagrado'];
            quizCharacterData.habilidades = ['Sentido Divino', 'Imposição das Mãos'];
            quizCharacterData.proficiencias = 'Armaduras: Todas, Armas: Simples e Marciais';
            quizCharacterData.ca = 21;
            break;
        case 'ladino':
            baseAttributes.strength = 8;
            baseAttributes.constitution = 12;
            baseAttributes.dexterity = 15;
            baseAttributes.intelligence = 14;
            baseAttributes.wisdom = 10;
            baseAttributes.charisma = 13;
            quizCharacterData.hp = 9;
            quizCharacterData.equipamentos = ['Adaga', 'Armadura de couro', 'Ferramentas de ladrão'];
            quizCharacterData.habilidades = ['Ataque Furtivo', 'Ação Ardilosa'];
            quizCharacterData.proficiencias = 'Armaduras: Leves, Armas: Simples e Armas de Fogo';
            quizCharacterData.ca = 11;
            break;
        case 'feiticeiro':
            baseAttributes.strength = 8;
            baseAttributes.constitution = 12;
            baseAttributes.dexterity = 14;
            baseAttributes.intelligence = 13;
            baseAttributes.wisdom = 10;
            baseAttributes.charisma = 15;
            quizCharacterData.hp = 7;
            quizCharacterData.equipamentos = ['Varinha mágica', 'Roupas de feiticeiro', 'Bolsa de componentes'];
            quizCharacterData.magias = ['Raio de Gelo', 'Mãos Flamejantes', 'Leque das Sombras'];
            quizCharacterData.habilidades = ['Fonte de Magia', 'Truques'];
            quizCharacterData.proficiencias = 'Armaduras: Nenhuma, Armas: Simples, Ferramentas: Nenhuma';
            quizCharacterData.ca = 10;
            break;
        case 'clerigo':
            baseAttributes.strength = 13;
            baseAttributes.constitution = 14;
            baseAttributes.dexterity = 8;
            baseAttributes.intelligence = 10;
            baseAttributes.wisdom = 15;
            baseAttributes.charisma = 12;
            quizCharacterData.hp = 10;
            quizCharacterData.equipamentos = ['Maça', 'Escudo', 'Armadura de cota de malha', 'Símbolo Sagrado'];
            quizCharacterData.magias = ['Curar Ferimentos', 'Luz Sagrada'];
            quizCharacterData.habilidades = ['Domínio da Vida', 'Lançamento de Magia'];
            quizCharacterData.proficiencias = 'Armaduras: Leves e Médias, Escudos, Armas: Simples';
            quizCharacterData.ca = 19;
            break;
        case 'bruxo':
            baseAttributes.strength = 10;
            baseAttributes.constitution = 12;
            baseAttributes.dexterity = 14;
            baseAttributes.intelligence = 13;
            baseAttributes.wisdom = 8;
            baseAttributes.charisma = 15;
            quizCharacterData.hp = 8;
            quizCharacterData.equipamentos = ['Varinha', 'Livro de Sombras', 'Roupas Negras'];
            quizCharacterData.magias = ['Rajada Mística', 'Armadura de Agathys'];
            quizCharacterData.habilidades = ['Pacto das Trevas', 'Lâmina Pactual'];
            quizCharacterData.proficiencias = 'Armaduras: Leves, Armas: Simples';
            quizCharacterData.ca = 12;
            break;
    }

    // Aplicar os bônus de atributos da raça
    applyRaceBonus(quizCharacterData.race);

    // Somar os valores finais dos atributos com os bônus da raça
    quizCharacterData.atributos.strength = baseAttributes.strength + quizCharacterData.atributos.strength;
    quizCharacterData.atributos.dexterity = baseAttributes.dexterity + quizCharacterData.atributos.dexterity;
    quizCharacterData.atributos.constitution = baseAttributes.constitution + quizCharacterData.atributos.constitution;
    quizCharacterData.atributos.intelligence = baseAttributes.intelligence + quizCharacterData.atributos.intelligence;
    quizCharacterData.atributos.wisdom = baseAttributes.wisdom + quizCharacterData.atributos.wisdom;
    quizCharacterData.atributos.charisma = baseAttributes.charisma + quizCharacterData.atributos.charisma;
}

function applyRaceBonus(race) {
    // Inicializar os bônus de raça para zero
    quizCharacterData.atributos.strength = 0;
    quizCharacterData.atributos.dexterity = 0;
    quizCharacterData.atributos.constitution = 0;
    quizCharacterData.atributos.intelligence = 0;
    quizCharacterData.atributos.wisdom = 0;
    quizCharacterData.atributos.charisma = 0;

    // Aplicar bônus específicos da raça
    switch (race) {
        case 'Humano':
            quizCharacterData.atributos.strength += 1;
            quizCharacterData.atributos.constitution += 1;
            quizCharacterData.atributos.dexterity += 1;
            quizCharacterData.atributos.intelligence += 1;
            quizCharacterData.atributos.wisdom += 1;
            quizCharacterData.atributos.charisma += 1;
            break;
        case 'Elfo':
            quizCharacterData.atributos.dexterity += 2;
            quizCharacterData.atributos.intelligence += 1;
            break;
        case 'Anão':
            quizCharacterData.atributos.strength += 2;
            quizCharacterData.atributos.constitution += 2;
            break;
    }
}

function finalizeQuiz() {
    // Salvar os dados em localStorage para serem recuperados na página de ficha
    localStorage.setItem('quizCharacterData', JSON.stringify(quizCharacterData));
    // Redirecionar para a página de ficha
    window.location.href = 'ficha.html';
}

// Adicionar evento para desabilitar os campos quando a página de ficha carregar
document.addEventListener('DOMContentLoaded', function() {
    const isFromQuiz = localStorage.getItem('quizCharacterData');
    if (isFromQuiz) {
        disableFormFields(); // Desabilita os campos se a ficha vier do quiz
    }
});

function toggleMenu() {
    var menu = document.getElementById("sideMenu");
    if (menu.style.width === "250px") {
        menu.style.width = "0";
    } else {
        menu.style.width = "250px";
    }
}
