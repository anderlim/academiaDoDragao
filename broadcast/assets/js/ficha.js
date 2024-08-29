window.onload = function() {
    const manualCharacterData = JSON.parse(localStorage.getItem('characterData'));
    const quizCharacterData = JSON.parse(localStorage.getItem('quizCharacterData'));
    
    let characterData;

    if (quizCharacterData) {
        characterData = quizCharacterData;
    } else if (manualCharacterData) {
        characterData = manualCharacterData;
    } else {
        return; // Sai da função se não houver dados
    }

    document.getElementById('race').value = characterData.race || '';
    document.getElementById('speed').value = convertFeetToMeters(characterData.deslocamento || 0);
    document.getElementById('class').value = characterData.class || '';
    document.getElementById('background').value = characterData.background || '';
    document.getElementById('hp').value = characterData.hp || 0;
    document.getElementById('armor-class').value = characterData.ca || 10;

    const attributes = characterData.atributos || {};
    const raceBonuses = characterData.raceBonuses || {}; // Novo

    // Aplicar bônus raciais aos atributos
    document.getElementById('strength').value = (attributes.strength || 0) + (raceBonuses.strength || 0);
    document.getElementById('dexterity').value = (attributes.dexterity || 0) + (raceBonuses.dexterity || 0);
    document.getElementById('constitution').value = (attributes.constitution || 0) + (raceBonuses.constitution || 0);
    document.getElementById('intelligence').value = (attributes.intelligence || 0) + (raceBonuses.intelligence || 0);
    document.getElementById('wisdom').value = (attributes.wisdom || 0) + (raceBonuses.wisdom || 0);
    document.getElementById('charisma').value = (attributes.charisma || 0) + (raceBonuses.charisma || 0);

    updateSavesAndSkills(characterData);

    document.getElementById('spells').value = characterData.magias?.join(', ') || '';
    document.getElementById('equipment').value = characterData.equipamentos.concat(characterData.armas).join(', ') || '';
    document.getElementById('abilities').value = characterData.habilidades?.join(', ') || '';

    document.getElementById('general-info').value = characterData.proficiencias || '';

    document.querySelectorAll('.attributes input').forEach(input => {
        input.addEventListener('input', updateAllSavesAndSkills);
    });
};

window.addEventListener('beforeunload', function() {
    localStorage.removeItem('characterData');
    localStorage.removeItem('quizCharacterData');
});

function calculateModifier(attributeValue) {
    return Math.floor((attributeValue - 10) / 2);
}

function convertFeetToMeters(feet) {
    return Math.round(feet * 0.3);
}

function toggleBonus(skillId, attributeId) {
    const checkbox = document.getElementById(`${skillId}-checkbox`);
    const inputField = document.getElementById(skillId);
    const attributeValue = parseInt(document.getElementById(attributeId).value);

    let baseValue = calculateModifier(attributeValue);
    if (checkbox.checked) {
        baseValue += 2;
    }
    inputField.value = baseValue;
}

function updateAllSavesAndSkills() {
    toggleBonus('save-strength', 'strength');
    toggleBonus('save-dexterity', 'dexterity');
    toggleBonus('save-constitution', 'constitution');
    toggleBonus('save-intelligence', 'intelligence');
    toggleBonus('save-wisdom', 'wisdom');
    toggleBonus('save-charisma', 'charisma');

    toggleBonus('acrobatics', 'dexterity');
    toggleBonus('arcana', 'intelligence');
    toggleBonus('athletics', 'strength');
    toggleBonus('deception', 'charisma');
    toggleBonus('history', 'intelligence');
    toggleBonus('intimidation', 'charisma');
    toggleBonus('investigation', 'intelligence');
    toggleBonus('medicine', 'wisdom');
    toggleBonus('nature', 'intelligence');
    toggleBonus('perception', 'wisdom');
    toggleBonus('persuasion', 'charisma');
    toggleBonus('sleight-of-hand', 'dexterity');
    toggleBonus('religion', 'intelligence');
    toggleBonus('survival', 'wisdom');
    toggleBonus('stealth', 'dexterity');
    toggleBonus('insight', 'wisdom');
}

function saveEdits() {
    const editedData = {
        race: document.getElementById('race').value,
        class: document.getElementById('class').value,
        background: document.getElementById('background').value,
        hp: document.getElementById('hp').value,
        deslocamento: convertMetersToFeet(document.getElementById('speed').value),
        ca: document.getElementById('armor-class').value,
        atributos: {
            strength: parseInt(document.getElementById('strength').value),
            dexterity: parseInt(document.getElementById('dexterity').value),
            constitution: parseInt(document.getElementById('constitution').value),
            intelligence: parseInt(document.getElementById('intelligence').value),
            wisdom: parseInt(document.getElementById('wisdom').value),
            charisma: parseInt(document.getElementById('charisma').value),
        },
        salvaguardas: {
            strength: parseInt(document.getElementById('save-strength').value),
            dexterity: parseInt(document.getElementById('save-dexterity').value),
            constitution: parseInt(document.getElementById('save-constitution').value),
            intelligence: parseInt(document.getElementById('save-intelligence').value),
            wisdom: parseInt(document.getElementById('save-wisdom').value),
            charisma: parseInt(document.getElementById('save-charisma').value),
        },
        pericias: {
            acrobatics: parseInt(document.getElementById('acrobatics').value),
            arcana: parseInt(document.getElementById('arcana').value),
            athletics: parseInt(document.getElementById('athletics').value),
            deception: parseInt(document.getElementById('deception').value),
            history: parseInt(document.getElementById('history').value),
            intimidation: parseInt(document.getElementById('intimidation').value),
            investigation: parseInt(document.getElementById('investigation').value),
            medicine: parseInt(document.getElementById('medicine').value),
            nature: parseInt(document.getElementById('nature').value),
            perception: parseInt(document.getElementById('perception').value),
            persuasion: parseInt(document.getElementById('persuasion').value),
            sleightOfHand: parseInt(document.getElementById('sleight-of-hand').value),
            religion: parseInt(document.getElementById('religion').value),
            survival: parseInt(document.getElementById('survival').value),
            stealth: parseInt(document.getElementById('stealth').value),
            insight: parseInt(document.getElementById('insight').value),
        },        
        magias: document.getElementById('spells').value.split(',').map(magia => magia.trim()),
        equipamentos: document.getElementById('equipment').value.split(',').map(item => item.trim()),
        habilidades: document.getElementById('abilities').value.split(',').map(habilidade => habilidade.trim()),
        informacoesGerais: document.getElementById('general-info').value.trim(),
        checkboxes: {
            saveStrength: document.getElementById('save-strength-checkbox').checked,
            saveDexterity: document.getElementById('save-dexterity-checkbox').checked,
            saveConstitution: document.getElementById('save-constitution-checkbox').checked,
            saveIntelligence: document.getElementById('save-intelligence-checkbox').checked,
            saveWisdom: document.getElementById('save-wisdom-checkbox').checked,
            saveCharisma: document.getElementById('save-charisma-checkbox').checked,
            acrobatics: document.getElementById('acrobatics-checkbox').checked,
            arcana: document.getElementById('arcana-checkbox').checked,
            athletics: document.getElementById('athletics-checkbox').checked,
            deception: document.getElementById('deception-checkbox').checked,
            history: document.getElementById('history-checkbox').checked,
            intimidation: document.getElementById('intimidation-checkbox').checked,
            investigation: document.getElementById('investigation-checkbox').checked,
            medicine: document.getElementById('medicine-checkbox').checked,
            nature: document.getElementById('nature-checkbox').checked,
            perception: document.getElementById('perception-checkbox').checked,
            persuasion: document.getElementById('persuasion-checkbox').checked,
            sleightOfHand: document.getElementById('sleight-of-hand-checkbox').checked,
            religion: document.getElementById('religion-checkbox').checked,
            survival: document.getElementById('survival-checkbox').checked,
            stealth: document.getElementById('stealth-checkbox').checked,
            insight: document.getElementById('insight-checkbox').checked,
        }        
    };

    localStorage.setItem('characterData', JSON.stringify(editedData));
    generatePDF(editedData);
}

function generatePDF(data) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Ficha de Personagem D&D 5e", 20, 20);

    doc.setFontSize(12);
    doc.text(`Raça: ${data.race}`, 20, 30);
    doc.text(`Classe: ${data.class}`, 20, 40);
    doc.text(`Background: ${data.background}`, 20, 50);
    doc.text(`HP: ${data.hp}`, 20, 60);
    doc.text(`Deslocamento: ${convertFeetToMeters(data.deslocamento)} m`, 20, 70);
    doc.text(`Classe de Armadura: ${data.ca}`, 20, 80);

    doc.text(`Força: ${data.atributos.strength}`, 20, 90);
    doc.text(`Destreza: ${data.atributos.dexterity}`, 20, 100);
    doc.text(`Constituição: ${data.atributos.constitution}`, 20, 110);
    doc.text(`Inteligência: ${data.atributos.intelligence}`, 20, 120);
    doc.text(`Sabedoria: ${data.atributos.wisdom}`, 20, 130);
    doc.text(`Carisma: ${data.atributos.charisma}`, 20, 140);

    doc.text(`Salvaguardas:`, 20, 150);
    doc.text(`- Força: ${data.salvaguardas.strength}`, 30, 160);
    doc.text(`- Destreza: ${data.salvaguardas.dexterity}`, 30, 170);
    doc.text(`- Constituição: ${data.salvaguardas.constitution}`, 30, 180);
    doc.text(`- Inteligência: ${data.salvaguardas.intelligence}`, 30, 190);
    doc.text(`- Sabedoria: ${data.salvaguardas.wisdom}`, 30, 200);
    doc.text(`- Carisma: ${data.salvaguardas.charisma}`, 30, 210);

    doc.text(`Perícias:`, 20, 220);
    doc.text(`- Acrobacia: ${data.pericias.acrobatics}`, 30, 230);
    doc.text(`- Arcanismo: ${data.pericias.arcana}`, 30, 240);
    doc.text(`- Atletismo: ${data.pericias.athletics}`, 30, 250);
    doc.text(`- Enganação: ${data.pericias.deception}`, 30, 260);
    doc.text(`- História: ${data.pericias.history}`, 30, 270);
    doc.text(`- Intimidação: ${data.pericias.intimidation}`, 30, 280);

    let yPos = 290;

    if (yPos + 20 > 290) {
        doc.addPage();
        yPos = 20;
    }
    doc.text(`Magias: ${data.magias.join(', ')}`, 20, yPos);
    yPos += 10;
    doc.text(`Equipamentos: ${data.equipamentos.join(', ')}`, 20, yPos);
    yPos += 10;
    doc.text(`Habilidades: ${data.habilidades.join(', ')}`, 20, yPos);

    yPos += 10;
    if (yPos + 20 > 290) {
        doc.addPage();
        yPos = 20;
    }
    doc.text(`Informações Gerais: ${data.informacoesGerais}`, 20, yPos);

    doc.save('ficha_personagem.pdf');
}

function disableFormFields() {
    const formFields = document.querySelectorAll('#character-form input, #character-form select, #character-form textarea');
    formFields.forEach(field => {
        field.disabled = true;
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const isFromQuiz = localStorage.getItem('quizCharacterData') !== null;
    if (isFromQuiz) {
        disableFormFields();
    }
});

function getClassSaves(className) {
    const classSaves = {
        guerreiro: { strength: true, constitution: true },
        Patrulheiro: { dexterity: true, intelligence: true },
        mago: { intelligence: true, wisdom: true },
        paladino: { wisdom: true, charisma: true },
        ladino: { dexterity: true, intelligence: true },
        feiticeiro: { constitution: true, charisma: true },
        clerigo: { wisdom: true, charisma: true },
        bruxo: { wisdom: true, charisma: true },
        Barbaro: { strength: true, constitution: true },  
        Bardo: { dexterity: true, charisma: true },  
        Druida: { intelligence: true, wisdom: true },  
        Monge: { strength: true, dexterity: true },    
        Bruxo: { wisdom: true, charisma: true },  
        Feiticeiro: { constitution: true, charisma: true }, 
        // Adicione mais classes conforme necessário
    };
    return classSaves[className] || {};
}

function getClassSkills(className) {
    const classSkills = {
        guerreiro: { athletics: true, intimidation: true },
        mago: { arcana: true, history: true },
        paladino: { persuasion: true, religion: true },
        ladino: { stealth: true, 'sleight-of-hand': true, deception: true, investigation: true }, // Adicionadas mais habilidades típicas de Ladino
        feiticeiro: { arcana: true, persuasion: true },
        clerigo: { medicine: true, persuasion: true, religion: true },  // Adicionado religião para Clérigo
        bruxo: { arcana: true, deception: true, intimidation: true, investigation: true },  // Adicionadas mais habilidades típicas de Bruxo
        Barbaro: { athletics: true, intimidation: true, survival: true },  // Adicionado para Bárbaro
        Bardo: { acrobatics: true, deception: true, performance: true, persuasion: true, sleightOfHand: true },  // Adicionado para Bardo
        Druida: { animalHandling: true, nature: true, perception: true, survival: true },  // Adicionado para Druida
        Monge: { acrobatics: true, athletics: true, history: true, insight: true, religion: true },  // Adicionado para Monge
        Patrulheiro: { animalHandling: true, athletics: true, insight: true, nature: true, perception: true, survival: true },  // Adicionado para Patrulheiro
        Feiticeiro: { arcana: true, deception: true, intimidation: true, persuasion: true },  // Adicionado para Feiticeiro
        // Adicione mais classes conforme necessário
    };
    return classSkills[className] || {};
}

function getBackgroundSkills(backgroundName) {
    const backgroundSkills = {
        forasteiro: { survival: true, perception: true },
        nobre: { persuasion: true, history: true },
        artesao: { 'sleight-of-hand': true, investigation: true },
        heroiDoPovo: { athletics: true, survival: true },
        sabio: { arcana: true, history: true },
        soldado: { athletics: true, intimidation: true },
        artista: { acrobatics: true, performance: true },
        // Adicione mais backgrounds conforme necessário
    };
    return backgroundSkills[backgroundName] || {};
}

function updateSavesAndSkills(characterData) {
    const saves = getClassSaves(characterData.class);
    const skills = { ...getClassSkills(characterData.class), ...getBackgroundSkills(characterData.background) };
    markSavesCheckboxes(saves);
    markSkillsCheckboxes(skills);
    updateAllSavesAndSkills();
}

function markSavesCheckboxes(saves) {
    for (let save in saves) {
        if (saves[save]) {
            document.getElementById(`save-${save}-checkbox`).checked = true;
        }
    }
}

function markSkillsCheckboxes(skills) {
    for (let skill in skills) {
        const checkbox = document.getElementById(`${skill}-checkbox`);
        if (checkbox) {
            checkbox.checked = true;
        } else {
            console.warn(`Checkbox para habilidade ${skill} não encontrada.`);
        }
    }
}

function toggleMenu() {
    var menu = document.getElementById("sideMenu");
    if (menu.style.width === "250px") {
        menu.style.width = "0";
    } else {
        menu.style.width = "250px";
    }
}
