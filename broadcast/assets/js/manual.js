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
    armas: [],
    origin: 'manual',  // Indica que esses dados vieram da ficha manual
    raceBonuses: {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
    },
};

function applyRaceBonus(race) {
    // Inicializar os bônus de raça para zero
    characterData.raceBonuses = {
        strength: 0,
        dexterity: 0,
        constitution: 0,
        intelligence: 0,
        wisdom: 0,
        charisma: 0
    };

    // Aplicar bônus específicos da raça
    switch (race) {
        case 'humano':
            characterData.raceBonuses.strength += 1;
            characterData.raceBonuses.constitution += 1;
            characterData.raceBonuses.dexterity += 1;
            characterData.raceBonuses.intelligence += 1;
            characterData.raceBonuses.wisdom += 1;
            characterData.raceBonuses.charisma += 1;
            break;
        case 'elfo':
            characterData.raceBonuses.dexterity += 2;
            characterData.raceBonuses.intelligence += 1;
            break;
        case 'anao':
            characterData.raceBonuses.strength += 2;
            characterData.raceBonuses.constitution += 2;
            break;
        case 'draconato':
            characterData.raceBonuses.strength += 2;
            characterData.raceBonuses.charisma += 1;
            break;
        case 'meio-elfo':
            characterData.raceBonuses.charisma += 2;
            characterData.raceBonuses.strength += 1;
            characterData.raceBonuses.constitution += 1;
            break;
        case 'tiefling':
            characterData.raceBonuses.charisma += 2;
            characterData.raceBonuses.intelligence += 1;
            break;
        case 'meio-orc':
            characterData.raceBonuses.strength += 2;
            characterData.raceBonuses.constitution += 1;
            break;
        case 'halfling':
            characterData.raceBonuses.dexterity += 2;
            break;
        case 'gnomo':
            characterData.raceBonuses.intelligence += 2;
            break;
    }
}

function updateRace() {
    const selectedRace = document.getElementById('race-select').value;
    if (selectedRace) {
        characterData.race = selectedRace;
        characterData.deslocamento = getRaceSpeed(selectedRace);
        applyRaceBonus(selectedRace);  // Aplicar bônus raciais
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
        // Armaduras Leves
        case 'acolchoada':
        case 'couro':
            ca = 11 + dexterityModifier;
            break;
        case 'couro-batido':
            ca = 12 + dexterityModifier;
            break;
        // Armaduras Médias (máx. +2 no modificador de Destreza)
        case 'gibao-de-peles':
            ca = 12 + Math.min(dexterityModifier, 2);
            break;
        case 'camisao-de-malha':
            ca = 13 + Math.min(dexterityModifier, 2);
            break;
        case 'brunea':
            ca = 14 + Math.min(dexterityModifier, 2);
            break;
        case 'peitoral':
            ca = 14 + Math.min(dexterityModifier, 2);
            break;
        case 'meia-armadura':
            ca = 15 + Math.min(dexterityModifier, 2);
            break;
        // Armaduras Pesadas
        case 'cota-de-aneis':
            ca = 14;
            break;
        case 'cota-de-malha':
            ca = 16;
            break;
        case 'cota-de-talas':
            ca = 17;
            break;
        case 'placas':
            ca = 18;
            break;
        case 'none':
        default:
            ca = 10 + dexterityModifier; // Caso nenhuma armadura seja escolhida
    }

    if (shield === 'yes') {
        ca += 2; // Adiciona bônus de escudo se estiver selecionado
    }

    characterData.ca = ca;
    // console.log('Classe de Armadura (CA):', characterData.ca);
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

function getClassHP(className) {
    const classHP = {
        guerreiro: 10,     
        Patrulheiro: 10,   
        mago: 6,           
        Barbaro: 12,      
        Bardo: 8,          
        Bruxo: 8,         
        clerigo: 8,        
        Druida: 8,         
        Feiticeiro: 6,     
        Ladino: 8,         
        Monge: 8,          
        Paladino: 10       
        // Adicione mais classes conforme necessário
    };
    return classHP[className] || 8; // Retorna 8 como padrão se a classe não for encontrada
}


function getClassSaves(className) {
    const classSaves = {
        guerreiro: { strength: true, constitution: true },
        Patrulheiro: { dexterity: true, strength: true },
        mago: { intelligence: true, wisdom: true },
        Barbaro: { strength: true, constitution: true },
        Bardo: { dexterity: true, charisma: true },
        Bruxo: { wisdom: true, charisma: true },
        clerigo: { wisdom: true, charisma: true },
        Druida: { intelligence: true, wisdom: true },
        Feiticeiro: { constitution: true, charisma: true },
        Ladino: { dexterity: true, intelligence: true },
        Monge: { strength: true, dexterity: true },
        Paladino: { wisdom: true, charisma: true }
        // Adicione mais classes conforme necessário
    };
    return classSaves[className] || {};
}


function getClassSkills(className) {
    const classSkills = {
        guerreiro: { athletics: true, perception: true },
        Patrulheiro: { insight: true, perception: true, survival: true },
        mago: { arcana: true, history: true },
        Barbaro: { athletics: true, insight: true },
        Bardo: { acrobatics: true, performance: true, persuasion: true },
        Bruxo: { arcana: true, deception: true },
        clerigo: { medicine: true, religion: true },
        Druida: { nature: true, survival: true },
        Feiticeiro: { arcana: true, deception: true },
        Ladino: { stealth: true, 'sleight-of-hand': true, deception: true,investigation: true },
        Monge: { acrobatics: true, athletics: true },
        Paladino: { athletics: true, persuasion: true }
        // Adicione mais classes conforme necessário
    };
    return classSkills[className] || {};
}

function getBackgroundSkills(backgroundName) {
    const backgroundSkills = {
        acólito: { insight: true, religion: true },
        artesao_de_guilda: { insight: true, persuasion: true },
        artista: { acrobatics: true, performance: true },
        charlatão: { deception: true, sleightOfHand: true },
        criminoso: { deception: true, stealth: true },
        eremita: { medicine: true, religion: true },
        forasteiro: { athletics: true, survival: true },
        herói_do_povo: { animalHandling: true, survival: true },
        marinheiro: { athletics: true, perception: true },
        nobre: { history: true, persuasion: true },
        órfão: { stealth: true, sleightOfHand: true },
        sábio: { arcana: true, history: true },
        soldado: { athletics: true, intimidation: true }
    };
    return backgroundSkills[backgroundName] || {};
}

function toggleMenu() {
    var menu = document.getElementById("sideMenu");
    if (menu.style.width === "250px") {
        menu.style.width = "0";
    } else {
        menu.style.width = "250px";
    }
}
