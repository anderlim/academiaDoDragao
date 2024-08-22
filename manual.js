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
        console.log(`Raça: ${characterData.race}, Deslocamento: ${characterData.deslocamento}`);
    }
}

function updateClass() {
    const selectedClass = document.getElementById('class-select').value;
    if (selectedClass) {
        characterData.class = selectedClass;
        characterData.hp = getClassHP(selectedClass);
        characterData.salvaguardas = getClassSaves(selectedClass);
        characterData.pericias = getClassSkills(selectedClass);
        console.log(`Classe: ${characterData.class}, HP: ${characterData.hp}`);
    }
}

function updateBackground() {
    const selectedBackground = document.getElementById('background-select').value;
    if (selectedBackground) {
        characterData.background = selectedBackground;
        characterData.pericias = { ...characterData.pericias, ...getBackgroundSkills(selectedBackground) };
        console.log(`Background: ${characterData.background}`);
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
    console.log('Atributos e Modificadores:', characterData.atributos);
    updateArmorClass();  // Atualiza a CA com base nos novos valores de Destreza
}

function updateArmorClass() {
    const armor = document.getElementById('armor-select').value;
    const shield = document.getElementById('shield-select').value;
    let ca = 10; // Base CA

    switch (armor) {
        case 'leather':
            ca = 11 + parseInt(document.getElementById('dexterity').value);
            break;
        case 'chainmail':
            ca = 16;
            break;
        case 'plate':
            ca = 18;
            break;
    }

    if (shield === 'yes') {
        ca += 2;
    }

    characterData.ca = ca;
    console.log('Classe de Armadura (CA):', characterData.ca);
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

function getClassHP(className) {
    const classHP = {
        guerreiro: 10,
        arqueiro: 8,
        mago: 6,
        // Adicione mais classes conforme necessário
    };
    return classHP[className] || 8;
}

function getClassSaves(className) {
    const classSaves = {
        guerreiro: { strength: true, constitution: true },
        arqueiro: { dexterity: true, intelligence: true },
        mago: { intelligence: true, wisdom: true },
        // Adicione mais classes conforme necessário
    };
    return classSaves[className] || {};
}

function getClassSkills(className) {
    const classSkills = {
        guerreiro: { atletismo: true, intimidacao: true },
        arqueiro: { furtividade: true, percepcao: true },
        mago: { arcana: true, historia: true },
        // Adicione mais classes conforme necessário
    };
    return classSkills[className] || {};
}

function getBackgroundSkills(backgroundName) {
    const backgroundSkills = {
        forasteiro: { sobrevivencia: true, percepcao: true },
        nobre: { persuasao: true, historia: true },
        artesao: { prestidigitação: true, investigacao: true },
        // Adicione mais backgrounds conforme necessário
    };
    return backgroundSkills[backgroundName] || {};
}
