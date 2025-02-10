function showPopup(message) {
    document.getElementById('popup-message').textContent = message;

    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');

    popup.classList.add('show');
    overlay.classList.add('show');
}

function closePopup() {
    const popup = document.getElementById('popup');
    const overlay = document.getElementById('overlay');

    popup.classList.remove('show');
    overlay.classList.remove('show');
}

const drawListOptions = [];

const addNewoptionButton = document.getElementById('addOption');
const drawListButton = document.getElementById('draw');
const cleanListButton = document.getElementById('toClean');

addNewoptionButton.addEventListener('click', addOptions);
drawListButton.addEventListener('click', drawList);
cleanListButton.addEventListener('click', cleanList);

function addOptions() {

    const optionInput = document.getElementById('choice');
    const optionValue = optionInput.value.trim();

    if (optionValue === '') {
        showPopup('É necessário informar uma opção.');
        return;
    }

    if (drawListOptions.includes(optionValue)) {
        showPopup('Está opção já está adicionada. Insira outra.');
        return;
    }

    drawListOptions.push(optionValue);

    const list = document.getElementById('list_options');
    const newOptionItem = document.createElement('li');
    newOptionItem.textContent = optionValue;
    list.appendChild(newOptionItem);

    optionInput.value = '';
}

function drawList() {
    if (drawListOptions.length === 0){
        showPopup('Nenhuma opção para sortear.');
        return;
    }
    if (drawListOptions.length < 2) {
        showPopup('É necessário adicionar pelo menos duas opções para sortear.');
        return;
    }

    const randomOption = drawListOptions[Math.floor(Math.random() * drawListOptions.length)];

    const resultElement = document.getElementById('draw_result');
    resultElement.textContent = `Está foi a opção sorteada: ${randomOption}`;
}


function cleanList() {

    drawListOptions.length = 0;
    document.getElementById('list_options').innerHTML = '';
    document.getElementById('choice').value = '';
    document.getElementById('draw_result').innerHTML = '';
    showPopup('Lista Limpa!');
}