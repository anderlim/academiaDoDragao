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
        elfo: 30,
        anao: 25,
        draconato: 30,
        'meio-elfo': 30,
        tiefling: 30,
        'meio-orc': 30,
        halfling: 25,
        gnomo: 25
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

    if (option === 'dungeonsAndDragons') {
        step2.style.display = 'block';
        raceOptions.innerHTML = `
            <h2>Qual raça você prefere em ${option === 'lordOfTheRings' ? 'Senhor dos Anéis' : 'Dungeons & Dragons'}?</h2>
            <div class="race-option">
                <img src="./images/humano.png" alt="Humano">
                <p>Humanos são conhecidos por sua incrível adaptabilidade e diversidade. Eles são ambiciosos, inovadores e capazes de se destacar em qualquer profissão ou caminho de vida. Sua presença é comum em praticamente todos os reinos, e eles são famosos por sua habilidade de se adaptar e crescer em qualquer ambiente. Escolher essa raça dá um bônus de +1 em todos os atributos, refletindo sua versatilidade natural, e o deslocamento é de 9 metros. Além disso, os humanos costumam ter um talento natural para aprender e se desenvolver rapidamente.</p>
                <button onclick="chooseRace('Humano')">Humano</button>
            </div>
            <div class="race-option">
                <img src="./images/elfo.png" alt="Elfo">
                <p>Elfos são graciosos, ágeis e têm uma afinidade natural com a natureza e a magia. Eles vivem vidas extremamente longas e são conhecidos por sua beleza etérea e habilidades sobrenaturais. Com uma conexão intrínseca ao mundo mágico, elfos geralmente têm uma perspectiva profunda e um entendimento das forças naturais e arcanas. Escolher essa raça dá um bônus de +2 Destreza e +1 Inteligência, além de um deslocamento de 9 metros. Elfos também possuem visão no escuro, resistência a encantamentos, e uma habilidade de percepção aguçada que os torna difíceis de serem surpreendidos.</p>
                <button onclick="chooseRace('Elfo')">Elfo</button>
            </div>
            <div class="race-option">
                <img src="./images/anao.png" alt="Anão">
                <p>Anões são conhecidos por sua robustez, resiliência e habilidades em combate e artesanato. Eles são teimosos e leais, com um profundo senso de honra e tradição. Os anões geralmente vivem em montanhas ou subterrâneos, onde constroem fortalezas impressionantes e minas prósperas. Escolher essa raça dá um bônus de +2 Constituição e +2 Força, o que reflete sua resistência física e força natural. O deslocamento é de 7,5 metros, ligeiramente reduzido devido à sua baixa estatura. Anões possuem visão no escuro, resistência ao veneno e uma afinidade com o trabalho em pedra e metalurgia.</p>
                <button onclick="chooseRace('Anão')">Anão</button>
            </div>
            <div class="race-option">
                <img src="./images/draconato.png" alt="Draconato">
                <p>Draconatos são descendentes de dragões e possuem características dracônicas evidentes, como escamas, garras e um hálito poderoso. Eles são orgulhosos, determinados e, muitas vezes, seguem um forte código de honra. Escolher essa raça dá um bônus de +2 Força, +1 Carisma, e o deslocamento é de 9 metros. Além disso, eles possuem resistência a fogo relacionado ao dragão ancestral e podem usar um ataque de sopro 4,5 mestros.</p>
                <button onclick="chooseRace('Draconato')">Draconato</button>
            </div>
            <div class="race-option">
                <img src="./images/meio.png" alt="Meio elfo">
                <p>Meio-elfos combinam a adaptabilidade dos humanos com a graça dos elfos, o que os torna carismáticos e versáteis. Eles são conhecidos por sua capacidade de se encaixar em diversos ambientes e são muitas vezes mediadores naturais. Escolher essa raça dá um bônus de +2 Carisma, +1 em Força e +1 Constituição. O deslocamento é de 9 metros, e eles possuem visão no escuro e resistência a encantamentos.</p>
                <button onclick="chooseRace('Meio-elfo')">Meio elfo</button>
            </div>
            <div class="race-option">
                <img src="./images/tiefling.png" alt="Tiefling">
                <p>Tieflings são seres com uma herança infernal, frequentemente identificáveis por seus chifres e caudas. Eles são sagazes e resilientes, muitas vezes sendo vistos com desconfiança devido às suas origens infernais. Escolher essa raça dá um bônus de +2 Carisma e +1 Inteligência. O deslocamento é de 9 metros. Tieflings têm resistência ao dano de fogo, visão no escuro e podem lançar magias menores relacionadas ao fogo.</p>
                <button onclick="chooseRace('Tiefling')">Tiefling</button>
            </div>
            <div class="race-option">
                <img src="./images/orc.png" alt="Meio Orc">
                <p>Meio-orcs possuem uma força física impressionante e um espírito indomável, resultado da união entre humanos e orcs. Eles são corajosos e destemidos, conhecidos por sua ferocidade em combate. Escolher essa raça dá um bônus de +2 Força, +1 Constituição e o deslocamento é de 9 metros. Meio-orcs têm a habilidade de resistir à morte uma vez por descanso longo e possuem vantagens em ataques críticos.</p>
                <button onclick="chooseRace('Meio-Orc')">Meio Orc</button>
            </div>
            <div class="race-option">
                <img src="./images/halfling.png" alt="Halfiling">
                <p>Halflings são pequenos, mas corajosos e sortudos. Conhecidos por sua natureza despreocupada e amigável, eles têm um espírito resiliente e são mestres em escapar de perigos. Escolher essa raça dá um bônus de +2 Destreza e o deslocamento é de 7,5 metros. Halflings possuem uma habilidade única de re-rolar um dado 1 em jogadas de ataque, testes de habilidade, ou testes de resistência.</p>
                <button onclick="chooseRace('Halfiling')">Halfiling</button>
            </div>
            <div class="race-option">
                <img src="./images/gnomo.png" alt="Gnomo">
                <p>Gnomos são pequenos, curiosos e com uma afinidade natural para a magia e invenções. Eles são engenhosos e têm um grande amor por aventuras intelectuais. Escolher essa raça dá um bônus de +2 Inteligência e o deslocamento é de 7,5 metros. Gnomos possuem visão no escuro e resistência a magias que afetam a mente.</p>
                <button onclick="chooseRace('Gnomo')">Gnomo</button>
            </div>
        `;
    } else if (option === 'lordOfTheRings') {
        step2.style.display = 'block';
        raceOptions.innerHTML = `
            <h2>Qual raça você prefere em Senhor dos Anéis?</h2>
            <div class="race-option">
                <img src="./images/humano.png" alt="Humano">
                <p>Humanos são conhecidos por sua incrível adaptabilidade e diversidade. Escolher essa raça dá um bônus de +1 em todos os atributos, e o deslocamento é de 9 metros.</p>
                <button onclick="chooseRace('Humano')">Humano</button>
            </div>
            <div class="race-option">
                <img src="./images/elfo.png" alt="Elfo">
                <p>Elfos são graciosos, ágeis e têm uma afinidade natural com a natureza e a magia. Escolher essa raça dá um bônus de +2 Destreza e +1 Inteligência, além de um deslocamento de 9 metros.</p>
                <button onclick="chooseRace('Elfo')">Elfo</button>
            </div>
            <div class="race-option">
                <img src="./images/anao.png" alt="Anão">
                <p>Anões são conhecidos por sua robustez, resiliência e habilidades em combate e artesanato. Escolher essa raça dá um bônus de +2 Constituição e +2 Força, e o deslocamento é de 7,5 metros.</p>
                <button onclick="chooseRace('Anão')">Anão</button>
            </div>
            <div class="race-option">
                <img src="./images/halfling.png" alt="Halfiling">
                <p>Halflings(Hobbits) são pequenos, mas corajosos e sortudos. Conhecidos por sua natureza despreocupada e amigável, eles têm um espírito resiliente e são mestres em escapar de perigos. Escolher essa raça dá um bônus de +2 Destreza e o deslocamento é de 7,5 metros. Halflings possuem uma habilidade única de re-rolar um dado 1 em jogadas de ataque, testes de habilidade, ou testes de resistência.</p>
                <button onclick="chooseRace('Halfiling')">Halfling (Hobbit)</button>
            </div>
            <div class="race-option">
                <img src="./images/meio.png" alt="Meio elfo">
                <p>Meio-elfos combinam a adaptabilidade dos humanos com a graça dos elfos, o que os torna carismáticos e versáteis. Eles são conhecidos por sua capacidade de se encaixar em diversos ambientes e são muitas vezes mediadores naturais. Escolher essa raça dá um bônus de +2 Carisma, +1 em Força e +1 Constituição. O deslocamento é de 9 metros, e eles possuem visão no escuro e resistência a encantamentos.</p>
                <button onclick="chooseRace('Meio-elfo')">Meio elfo</button>
            </div>
            <div class="race-option">
                <img src="./images/orc.png" alt="Meio Orc">
                <p>Meio-orcs possuem uma força física impressionante e um espírito indomável, resultado da união entre humanos e orcs. Eles são corajosos e destemidos, conhecidos por sua ferocidade em combate. Escolher essa raça dá um bônus de +2 Força, +1 Constituição e o deslocamento é de 9 metros. Meio-orcs têm a habilidade de resistir à morte uma vez por descanso longo e possuem vantagens em ataques críticos.</p>
                <button onclick="chooseRace('Meio-Orc')">Meio Orc</button>
            </div>
        `;
    }else if (option === 'harryPotter') {
        quizCharacterData.race = 'Humano';
        quizCharacterData.deslocamento = 30;

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
            quizCharacterData.deslocamento = 30;
            applyRaceBonus('Humano');
            break;
        case 'Elfo':
            quizCharacterData.deslocamento = 30;
            applyRaceBonus('Elfo');
            break;
        case 'Anão':
            quizCharacterData.deslocamento = 25;
            applyRaceBonus('Anão');
            break;
            case 'Draconato':
            quizCharacterData.deslocamento = 30;
            applyRaceBonus('Draconato');
            break;
        case 'Meio-elfo':
            quizCharacterData.deslocamento = 30;
            applyRaceBonus('Meio-elfo');
            break;
        case 'Halfiling':
            quizCharacterData.deslocamento = 25;
            applyRaceBonus('Halfiling');
            break;
            case 'Tiefling':
            quizCharacterData.deslocamento = 30;
            applyRaceBonus('Tiefling');
            break;
        case 'Meio-Orc':
            quizCharacterData.deslocamento = 30;
            applyRaceBonus('Meio-Orc');
            break;
        case 'Gnomo':
            quizCharacterData.deslocamento = 25;
            applyRaceBonus('Gnomo');
            break;
    }

    step3.style.display = 'block';
    step3.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Exibir opções de classe com imagens
    classOptions.innerHTML = `
        <h2>Qual classe você mais gosta?</h2>
        <div class="class-option">
            <img src="./images/guerreiro.png" alt="Guerreiro">
            <p>Guerreiros são mestres do combate corpo-a-corpo, treinados em uma ampla variedade de armas e estilos de luta. Eles possuem uma força e resistência excepcionais, sendo capazes de suportar os mais duros confrontos. Escolher essa classe concede o bônus de Ataque Extra, permitindo mais de um ataque por rodada, e Estilo de Combate, que aprimora uma especialização específica em batalha.</p>
            <button onclick="chooseClass('guerreiro')">Guerreiro</button>
        </div>
        <div class="class-option">
            <img src="./images/arqueiro.png" alt="Patrulheiro">
            <p>Patrulheiros são especialistas em sobrevivência e combate à distância, conhecidos por suas habilidades de rastreamento e conexão com a natureza. Eles protegem terras selvagens e caçam monstros, utilizando táticas de guerrilha. Escolher essa classe concede o bônus de Estilo de Combate (Arqueiro), melhorando ataques à distância, e Inimigo Predileto, conferindo vantagens contra tipos específicos de criaturas.</p>
            <button onclick="chooseClass('Patrulheiro')">Patrulheiro</button>
        </div>
        <div class="class-option">
            <img src="./images/mago.png" alt="Mago">
            <p>Magos são estudiosos arcanos que dominam a arte da magia através de longos anos de estudo e pesquisa. Eles têm acesso a uma vasta gama de feitiços, permitindo uma grande versatilidade em combate e utilidade. Escolher essa classe concede o bônus de Magias de 1º Nível, permitindo lançar uma variedade de feitiços poderosos, e Recuperação Arcana, que permite recuperar magia durante um descanso curto.</p>
            <button onclick="chooseClass('mago')">Mago</button>
        </div>
        <div class="class-option">
            <img src="./images/barbaro.png" alt="Barbaro">
            <p>Bárbaros são guerreiros ferozes conhecidos por sua fúria em combate e sua incrível resistência. Quando entram em fúria, tornam-se mais fortes e difíceis de derrotar, ignorando o medo e atacando com força bruta. Escolher essa classe concede o bônus de Fúria, que aumenta o dano de ataque e oferece resistência a danos físicos, e Defesa Sem Armadura, que aumenta a Classe de Armadura (CA) com base na Constituição e Destreza.</p>
            <button onclick="chooseClass('Barbaro')">Barbaro</button>
        </div>
         <div class="class-option">
            <img src="./images/bardo.png" alt="Bardo">
            <p>Bardos são mestres do conhecimento e da magia, usando sua arte para inspirar aliados e confundir inimigos. Eles têm uma habilidade inata para aprender e adaptar magias de outras classes, tornando-os extremamente versáteis. Escolher essa classe concede o bônus de Inspiração de Bardo, que permite conceder dados de bônus a aliados, e Magia de 1º Nível, permitindo lançar feitiços que encantam, iludem e causam dano.</p>
            <button onclick="chooseClass('Bardo')">Bardo</button>
        </div>
         <div class="class-option">
            <img src="./images/bruxo.png" alt="Bruxo">
            <p>Bruxos fazem pactos com seres poderosos para obter acesso a magias e habilidades especiais. Eles têm uma conexão mágica com seus patronos e são capazes de canalizar poder sobrenatural em combate. Escolher essa classe concede o bônus de Magias de Bruxo, incluindo feitiços únicos concedidos pelo patrono, e Recuperação Mística, que permite recuperar espaços de magia durante um descanso curto.</p>
            <button onclick="chooseClass('Bruxo')">Bruxo</button>
        </div>
         <div class="class-option">
            <img src="./images/clerigo.png" alt="clerigo">
            <p>Clérigos são servos divinos que canalizam o poder de seus deuses para curar, proteger e destruir o mal. Eles têm acesso a uma ampla gama de magias que os tornam essenciais em qualquer grupo de aventureiros. Escolher essa classe concede o bônus de Magia Divina, permitindo lançar magias de cura, proteção e dano, e Canalizar Divindade, uma habilidade única que varia conforme o domínio de seu deus.</p>
            <button onclick="chooseClass('clerigo')">Clerigo</button>
        </div>
         <div class="class-option">
            <img src="./images/druida.png" alt="Druida">
            <p>Druidas são guardiões da natureza que utilizam o poder dos elementos e a magia selvagem para proteger o equilíbrio natural. Eles têm a habilidade de se transformar em animais e lançar poderosas magias naturais. Escolher essa classe concede o bônus de Magia Druidica, permitindo lançar feitiços relacionados à natureza, e Mudança de Forma, permitindo transformar-se em diferentes criaturas.</p>
            <button onclick="chooseClass('Druida')">Druida</button>
        </div>
         <div class="class-option">
            <img src="./images/feiticeiro.png" alt="Feiticeiro">
            <p>Feiticeiros nascem com uma conexão inata com a magia, canalizando seu poder de uma fonte mágica interna, como uma linhagem dracônica ou um evento arcano. Eles são capazes de manipular magias de maneiras únicas. Escolher essa classe concede o bônus de Magias de Feiticeiro e Pontos de Feitiçaria, que permitem modificar e aumentar os efeitos de suas magias.</p>
            <button onclick="chooseClass('Feiticeiro')">Feiticeiro</button>
        </div>
         <div class="class-option">
            <img src="./images/ladino.png" alt="Ladino">
            <p>Ladinos são mestres da furtividade, astúcia e precisão. Eles são especialistas em ataques surpresa e desarmar armadilhas, tornando-se indispensáveis em incursões e infiltrações. Escolher essa classe concede o bônus de Ataque Furtivo, aumentando o dano quando atacam inimigos desavisados, e Especialidade em Furtividade, permitindo mover-se silenciosamente e evitar detecção.</p>
            <button onclick="chooseClass('Ladino')">Ladino</button>
        </div>
         <div class="class-option">
            <img src="./images/monge.png" alt="Monge">
            <p>Monges são guerreiros disciplinados que combinam técnicas de artes marciais com o poder místico de seu próprio espírito. Eles são rápidos, ágeis e capazes de canalizar sua energia interior para realizar feitos extraordinários. Escolher essa classe concede o bônus de Artes Marciais, permitindo atacar sem armas com eficácia aumentada, e Ki, uma fonte de energia que alimenta habilidades especiais.</p>
            <button onclick="chooseClass('Monge')">Monge</button>
        </div>
         <div class="class-option">
            <img src="./images/paladino.png" alt="Paladino">
            <p>Paladinos são guerreiros sagrados que juram combater o mal e proteger os inocentes. Eles combinam habilidades de combate com magia divina para curar e abençoar aliados, além de causar dano significativo aos inimigos. Escolher essa classe concede o bônus de Imposição das Mãos, que cura ferimentos e doenças, e Magias de Paladino, permitindo lançar magias que aumentam a proteção e dano.</p>
            <button onclick="chooseClass('Paladino')">Paladino</button>
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
            quizCharacterData.class = 'Feiticeiro';
            applyRaceBonus('Humano'); // A raça é sempre Humano nas casas de Harry Potter
            setQuizCharacterData('Feiticeiro');
            break;
        case 'Sonserina':
            quizCharacterData.class = 'Bruxo';
            applyRaceBonus('Humano');
            setQuizCharacterData('Bruxo');
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

    // Mostrar todos os personagens do filme/universo selecionado
    let charactersHTML = '<h2>Qual personagem você mais gosta?</h2>';
    if (quizCharacterData.universe === 'lordOfTheRings') {
        charactersHTML += `
            <button onclick="chooseCharacter('Aragorn')">Aragorn</button>
            <button onclick="chooseCharacter('Legolas')">Legolas</button>
            <button onclick="chooseCharacter('Gimli')">Gimli</button>
            <button onclick="chooseCharacter('Boromir')">Boromir</button>
            <button onclick="chooseCharacter('Gandalf')">Gandalf</button>
            <button onclick="chooseCharacter('Saruman')">Saruman</button>
            <button onclick="chooseCharacter('Radagast')">Radagast</button>
            <button onclick="chooseCharacter('Frodo')">Frodo</button>
            <button onclick="chooseCharacter('Sam')">Sam</button>
            <button onclick="chooseCharacter('Merry')">Merry</button>
            <button onclick="chooseCharacter('Pippin')">Pippin</button>
            <button onclick="chooseCharacter('Thranduil')">Thranduil</button>
            <button onclick="chooseCharacter('Bard')">Bard</button>
        `;
    } else if (quizCharacterData.universe === 'dungeonsAndDragons') {
        charactersHTML += `
            <button onclick="chooseCharacter('Holga')">Holga</button>
            <button onclick="chooseCharacter('Xenk')">Xenk</button>
            <button onclick="chooseCharacter('Edgin')">Edgin</button>
            <button onclick="chooseCharacter('Simon')">Simon</button>
            <button onclick="chooseCharacter('Sofina')">Sofina</button>
            <button onclick="chooseCharacter('Forge')">Forge</button>
            <button onclick="chooseCharacter('Doric')">Doric</button>
            <button onclick="chooseCharacter('Zenk')">Zenk</button>
        `;
    } else if (quizCharacterData.universe === 'harryPotter') {
        charactersHTML += `
            <button onclick="chooseCharacter('Harry')">Harry Potter</button>
            <button onclick="chooseCharacter('Hermione')">Hermione Granger</button>
            <button onclick="chooseCharacter('Ron')">Ron Weasley</button>
            <button onclick="chooseCharacter('Draco')">Draco Malfoy</button>
            <button onclick="chooseCharacter('Snape')">Severus Snape</button>
            <button onclick="chooseCharacter('Bellatrix')">Bellatrix Lestrange</button>
            <button onclick="chooseCharacter('Luna')">Luna Lovegood</button>
            <button onclick="chooseCharacter('Cho')">Cho Chang</button>
            <button onclick="chooseCharacter('Filius')">Filius Flitwick</button>
            <button onclick="chooseCharacter('Cedric')">Cedric Diggory</button>
            <button onclick="chooseCharacter('Newt')">Newt Scamander</button>
            <button onclick="chooseCharacter('Pomona')">Pomona Sprout</button>
        `;
    }

    characterOptions.innerHTML = charactersHTML;
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
        case 'Frodo':
        case 'Sam':
        case 'Merry':
        case 'Pippin':
            quizCharacterData.background = 'Aventureiro';
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
        case 'Forge':
            quizCharacterData.background = 'Criminoso';
            break;
        case 'Doric':
            quizCharacterData.background = 'Forasteiro';
            break;
        case 'Zenk':
            quizCharacterData.background = 'Herói do povo';
            break;
        case 'Thranduil':
            quizCharacterData.background = 'Nobre';
            break;
        case 'Radagast':
            quizCharacterData.background = 'Sábio';
            break;
        case 'Bard':
            quizCharacterData.background = 'Soldado';
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
            quizCharacterData.magias = ['Mãos Mágicas','Raio de Fogo','Raio de Gelo', 'Armadura Arcana', 'Mãos Flamejantes', 'Detectar Magia', 'Convocar Familiar', 'Riso Estérico de Tasha', 'Orbe Cromática'];
            quizCharacterData.habilidades = ['Recuperação Arcana', 'Magia de 1º Nível'];
            quizCharacterData.proficiencias = 'Armaduras: Nenhuma, Armas: Simples, Ferramentas: Nenhuma';
            quizCharacterData.ca = 10;
            break;
        case 'Barbaro':
            baseAttributes.strength = 15;
            baseAttributes.constitution = 14;
            baseAttributes.dexterity = 13;
            baseAttributes.intelligence = 8;
            baseAttributes.wisdom = 10;
            baseAttributes.charisma = 12;
            quizCharacterData.hp = 14;
            quizCharacterData.equipamentos = ['Machado de batalha', 'Armadura de peles'];
            quizCharacterData.habilidades = ['Fúria', 'Defesa sem Armadura'];
            quizCharacterData.proficiencias = 'Armaduras: Leves, Médias, Escudos, Armas: Simples e Marciais';
            quizCharacterData.ca = 13;
            break;
        case 'Bardo':
            baseAttributes.strength = 10;
            baseAttributes.constitution = 12;
            baseAttributes.dexterity = 14;
            baseAttributes.intelligence = 13;
            baseAttributes.wisdom = 8;
            baseAttributes.charisma = 15;
            quizCharacterData.hp = 7;
            quizCharacterData.equipamentos = ['Instrumento musical', 'Roupas elegantes'];
            quizCharacterData.magias = ['Disfarçar-se','Sono','Enfeitiçar Pessoa','Palavra Curativa', 'Zombaria viciosa', 'Ilusão menor'];
            quizCharacterData.habilidades = ['Inspiração de Bardo', 'Magia de 1º Nível'];
            quizCharacterData.proficiencias = 'Armaduras: Leves, Armas: Simples';
            quizCharacterData.ca = 12;
            break;
        case 'Bruxo':
            baseAttributes.strength = 8;
            baseAttributes.constitution = 12;
            baseAttributes.dexterity = 14;
            baseAttributes.intelligence = 13;
            baseAttributes.wisdom = 10;
            baseAttributes.charisma = 15;
            quizCharacterData.hp = 9;
            quizCharacterData.equipamentos = ['Livro de Sombras', 'Roupas Negras'];
            quizCharacterData.magias = ['Rajada Mística', 'Prestigitação', 'Armadura de Agathys', 'Repreensão Infernal'];
            quizCharacterData.habilidades = ['Pacto da Arquifada', 'Fogo das Fadas', 'Sono', 'Presença Feérica'];
            quizCharacterData.proficiencias = 'Armaduras: Leves, Armas: Simples';
            quizCharacterData.ca = 12;
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
            quizCharacterData.magias = ['Chama Sagrada','Curar Ferimentos', 'Luz Sagrada', 'Benção','Detectar o Bem e Mal', 'Escudo da Fé', 'Inflingir Feriments'];
            quizCharacterData.habilidades = ['Domínio da Vida', 'Lançamento de Magia', 'Dominio da Vida'];
            quizCharacterData.proficiencias = 'Armaduras: Leves, Médias e Pesadas, Escudos, Armas: Simples';
            quizCharacterData.ca = 16;
            break;
        case 'Druida':
            baseAttributes.strength = 8;
            baseAttributes.constitution = 14;
            baseAttributes.dexterity = 12;
            baseAttributes.intelligence = 10;
            baseAttributes.wisdom = 15;
            baseAttributes.charisma = 13;
            quizCharacterData.hp = 10;
            quizCharacterData.equipamentos = ['Cajado', 'Roupas de druida', 'Bolsa de Componentes'];
            quizCharacterData.magias = ['Rajada de Veneno', 'Druidismo', 'Fogo das Fadas', 'Curar Ferimentos','Amizade Animal'];
            quizCharacterData.habilidades = ['Druidico', 'Magia Druidica'];
            quizCharacterData.proficiencias = 'Armaduras: Leves e Médias, Escudos, Armas: Simples';
            quizCharacterData.ca = 11;
            break;
        case 'Feiticeiro':
            baseAttributes.strength = 8;
            baseAttributes.constitution = 12;
            baseAttributes.dexterity = 14;
            baseAttributes.intelligence = 13;
            baseAttributes.wisdom = 10;
            baseAttributes.charisma = 15;
            quizCharacterData.hp = 7;
            quizCharacterData.equipamentos = ['Bolsa de componentes'];
            quizCharacterData.magias = ['Raio de Gelo','Raio de Fogo', 'Toque Arrepiante','Toque Chocante', 'Onda Trovejante', 'Escudo Arcano'];
            quizCharacterData.habilidades = ['Origem dsa Feitiçaria: Dracônico Vermelho', 'Truques'];
            quizCharacterData.proficiencias = 'Armaduras: Nenhuma, Armas: Simples, Ferramentas: Nenhuma';
            quizCharacterData.ca = 13;
            break;
        case 'Ladino':
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
            quizCharacterData.ca = 13;
            break;
        case 'Monge':
            baseAttributes.strength = 10;
            baseAttributes.constitution = 12;
            baseAttributes.dexterity = 15;
            baseAttributes.intelligence = 8;
            baseAttributes.wisdom = 14;
            baseAttributes.charisma = 9;
            quizCharacterData.hp = 10;
            quizCharacterData.equipamentos = ['Bastão', 'Roupas de monge'];
            quizCharacterData.habilidades = ['Artes Marciais', 'Ki'];
            quizCharacterData.proficiencias = 'Armaduras: Nenhuma, Armas: Simples e de Monge';
            quizCharacterData.ca = 14;
            break;
        case 'Paladino':
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
            quizCharacterData.ca = 20;
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
        case 'Draconato':
            quizCharacterData.atributos.strength += 2;
            quizCharacterData.atributos.charisma += 1;
            break;
        case 'Meio-elfo':
            quizCharacterData.atributos.charisma += 2;
            quizCharacterData.atributos.strength += 1;
            quizCharacterData.atributos.constitution += 1;
            break;
        case 'Tiefling':
            quizCharacterData.atributos.charisma += 2;
            quizCharacterData.atributos.intelligence += 1;
            break;
        case 'Meio-Orc':
            quizCharacterData.atributos.strength += 2;
            quizCharacterData.atributos.constitution += 1;
            break;
        case 'Halfiling':
            quizCharacterData.atributos.dexterity += 2;
            break;
        case 'Gnomo':
            quizCharacterData.atributos.intelligence += 2;
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
