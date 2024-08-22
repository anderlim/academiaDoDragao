window.onload = function() {
    const characterData = JSON.parse(localStorage.getItem('characterData'));

    if (characterData) {
        // Preenchendo os campos básicos
        document.getElementById('race').value = characterData.race || '';
        document.getElementById('speed').value = convertFeetToMeters(characterData.deslocamento || 0);
        document.getElementById('class').value = characterData.class || '';
        document.getElementById('background').value = characterData.background || '';
        document.getElementById('hp').value = characterData.hp || 0;
        document.getElementById('armor-class').value = characterData.ca || 10;

        // Preenchendo os atributos
        const attributes = characterData.atributos || {};
        document.getElementById('strength').value = attributes.strength || 0;
        document.getElementById('dexterity').value = attributes.dexterity || 0;
        document.getElementById('constitution').value = attributes.constitution || 0;
        document.getElementById('intelligence').value = attributes.intelligence || 0;
        document.getElementById('wisdom').value = attributes.wisdom || 0;
        document.getElementById('charisma').value = attributes.charisma || 0;

        // Calculando e preenchendo as salvaguardas
        const saves = characterData.salvaguardas || {};
        document.getElementById('save-strength').value = calculateSave(attributes.strength, saves.strength);
        document.getElementById('save-dexterity').value = calculateSave(attributes.dexterity, saves.dexterity);
        document.getElementById('save-constitution').value = calculateSave(attributes.constitution, saves.constitution);
        document.getElementById('save-intelligence').value = calculateSave(attributes.intelligence, saves.intelligence);
        document.getElementById('save-wisdom').value = calculateSave(attributes.wisdom, saves.wisdom);
        document.getElementById('save-charisma').value = calculateSave(attributes.charisma, saves.charisma);

        // Calculando e preenchendo as perícias
        const skills = characterData.pericias || {};
        document.getElementById('acrobatics').value = calculateSkill(attributes.dexterity, skills.acrobatics);
        document.getElementById('arcana').value = calculateSkill(attributes.intelligence, skills.arcana);
        document.getElementById('athletics').value = calculateSkill(attributes.strength, skills.atletismo);
        document.getElementById('deception').value = calculateSkill(attributes.charisma, skills.enganação);
        document.getElementById('history').value = calculateSkill(attributes.intelligence, skills.historia);
        document.getElementById('intimidation').value = calculateSkill(attributes.charisma, skills.intimidacao);
        document.getElementById('investigation').value = calculateSkill(attributes.intelligence, skills.investigacao);
        document.getElementById('medicine').value = calculateSkill(attributes.wisdom, skills.medicina);
        document.getElementById('nature').value = calculateSkill(attributes.intelligence, skills.natureza);
        document.getElementById('perception').value = calculateSkill(attributes.wisdom, skills.percepcao);
        document.getElementById('persuasion').value = calculateSkill(attributes.charisma, skills.persuasao);
        document.getElementById('sleight-of-hand').value = calculateSkill(attributes.dexterity, skills.prestidigitação);
        document.getElementById('religion').value = calculateSkill(attributes.intelligence, skills.religiao);
        document.getElementById('survival').value = calculateSkill(attributes.wisdom, skills.sobrevivencia);
        document.getElementById('stealth').value = calculateSkill(attributes.dexterity, skills.furtividade);
        document.getElementById('insight').value = calculateSkill(attributes.wisdom, skills.intuicao);

        // Preenchendo as magias e equipamentos
        document.getElementById('spells').value = characterData.magias?.join(', ') || '';
        document.getElementById('equipment').value = characterData.equipamentos.concat(characterData.armas).join(', ') || '';
        document.getElementById('abilities').value = characterData.habilidades?.join(', ') || '';

        console.log("Ficha carregada com sucesso:", characterData);
    } else {
        console.error("Nenhum dado encontrado no localStorage.");
    }
};

// Função de restauração dos valores originais
function restoreOriginal() {
    const originalData = JSON.parse(localStorage.getItem('originalCharacterData'));
    if (originalData) {
        localStorage.setItem('characterData', JSON.stringify(originalData));
        alert("Ficha restaurada aos valores originais.");
        location.reload(); // Recarrega a página para aplicar as mudanças
    } else {
        alert("Não há dados originais para restaurar.");
    }
}

// Funções de cálculo de modificadores
function calculateModifier(attributeValue) {
    return Math.floor((attributeValue - 10) / 2);
}

function calculateSave(attributeValue, isTrained) {
    const modifier = calculateModifier(attributeValue);
    return isTrained ? modifier + 2 : modifier;
}

function calculateSkill(attributeValue, isTrained) {
    const modifier = calculateModifier(attributeValue);
    return isTrained ? modifier + 2 : modifier;
}

// Função de conversão de deslocamento
function convertFeetToMeters(feet) {
    return Math.round(feet * 0.3);
}

// Função para salvar as alterações feitas na ficha
function saveEdits() {
    // Captura os dados do formulário
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
            sleight_of_hand: parseInt(document.getElementById('sleight-of-hand').value),
            religion: parseInt(document.getElementById('religion').value),
            survival: parseInt(document.getElementById('survival').value),
            stealth: parseInt(document.getElementById('stealth').value),
            insight: parseInt(document.getElementById('insight').value),
        },
        magias: document.getElementById('spells').value.split(',').map(magia => magia.trim()),
        equipamentos: document.getElementById('equipment').value.split(',').map(item => item.trim()),
        habilidades: document.getElementById('abilities').value.split(',').map(habilidade => habilidade.trim()),
    };

    // Salvar no localStorage
    localStorage.setItem('characterData', JSON.stringify(editedData));
    
    // Gerar o PDF
    generatePDF(editedData);

    alert("Alterações salvas e PDF gerado com sucesso!");
}

function convertMetersToFeet(meters) {
    return Math.round(meters / 0.3);
}

function generatePDF(data) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Adiciona título
    doc.setFontSize(20);
    doc.text("Ficha de Personagem D&D 5e", 20, 20);

    // Adiciona informações básicas
    doc.setFontSize(12);
    doc.text(`Raça: ${data.race}`, 20, 30);
    doc.text(`Classe: ${data.class}`, 20, 40);
    doc.text(`Background: ${data.background}`, 20, 50);
    doc.text(`HP: ${data.hp}`, 20, 60);
    doc.text(`Deslocamento: ${convertFeetToMeters(data.deslocamento)} m`, 20, 70);
    doc.text(`Classe de Armadura: ${data.ca}`, 20, 80);

    // Adiciona atributos
    doc.text(`Força: ${data.atributos.strength}`, 20, 90);
    doc.text(`Destreza: ${data.atributos.dexterity}`, 20, 100);
    doc.text(`Constituição: ${data.atributos.constitution}`, 20, 110);
    doc.text(`Inteligência: ${data.atributos.intelligence}`, 20, 120);
    doc.text(`Sabedoria: ${data.atributos.wisdom}`, 20, 130);
    doc.text(`Carisma: ${data.atributos.charisma}`, 20, 140);

    // Adiciona salvaguardas
    doc.text(`Salvaguardas:`, 20, 150);
    doc.text(`- Força: ${data.salvaguardas.strength}`, 30, 160);
    doc.text(`- Destreza: ${data.salvaguardas.dexterity}`, 30, 170);
    doc.text(`- Constituição: ${data.salvaguardas.constitution}`, 30, 180);
    doc.text(`- Inteligência: ${data.salvaguardas.intelligence}`, 30, 190);
    doc.text(`- Sabedoria: ${data.salvaguardas.wisdom}`, 30, 200);
    doc.text(`- Carisma: ${data.salvaguardas.charisma}`, 30, 210);

    // Adiciona perícias
    doc.text(`Perícias:`, 20, 220);
    doc.text(`- Acrobacia: ${data.pericias.acrobatics}`, 30, 230);
    doc.text(`- Arcanismo: ${data.pericias.arcana}`, 30, 240);
    doc.text(`- Atletismo: ${data.pericias.athletics}`, 30, 250);
    doc.text(`- Enganação: ${data.pericias.deception}`, 30, 260);
    doc.text(`- História: ${data.pericias.history}`, 30, 270);
    doc.text(`- Intimidação: ${data.pericias.intimidation}`, 30, 280);
    // Adicione mais perícias conforme necessário

    let yPos = 290;  // Posição Y inicial para a próxima seção

    // Adiciona magias, equipamentos e habilidades
    if (yPos + 20 > 290) {
        doc.addPage();
        yPos = 20;
    }
    doc.text(`Magias: ${data.magias.join(', ')}`, 20, yPos);
    yPos += 10;
    doc.text(`Equipamentos: ${data.equipamentos.join(', ')}`, 20, yPos);
    yPos += 10;
    doc.text(`Habilidades: ${data.habilidades.join(', ')}`, 20, yPos);

    // Salva o PDF
    doc.save('ficha_personagem.pdf');
}
