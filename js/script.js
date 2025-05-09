const drawListOptions = [];

const addNewOptionButton = document.getElementById("addOption");
const drawListButton = document.getElementById("draw");
const cleanListButton = document.getElementById("toClean");

const messages = {
  emptyField: "É necessário informar uma opção.",
  duplicateValue: "Esta opção já está adicionada. Insira outra.",
  emptyList: "Nenhuma opção para sortear.",
  minimumList: "É necessário adicionar pelo menos duas opções para sortear.",
};

addNewOptionButton.addEventListener("click", addOptions);
drawListButton.addEventListener("click", drawList);
cleanListButton.addEventListener("click", cleanList);

function addOptions() {
  const optionInput = document.getElementById("choice");
  const optionValue = optionInput.value.trim();
  const normalizedValue = optionValue.toLowerCase();

  if (!optionValue) {
    showPopup("Atenção!", messages.emptyField);
    return;
  }

  if (drawListOptions.some((opt) => opt.toLowerCase() === normalizedValue)) {
    showPopup("Atenção!", messages.duplicateValue);
    return;
  }

  drawListOptions.push(optionValue);

  const list = document.getElementById("list_options");
  const newOptionItem = document.createElement("li");
  newOptionItem.document.createElement("img");
  newOptionItem.setAttribute("src", "./img/remocao.png");
  newOptionItem.textContent = optionValue;
  list.appendChild(newOptionItem);

  optionInput.value = "";
}

function drawList() {
  if (drawListOptions.length === 0) {
    showPopup("Erro!", messages.emptyList);
    return;
  }

  if (drawListOptions.length < 2) {
    showPopup("Atenção!", messages.minimumList);
    return;
  }

  const randomArray = new Uint32Array(1);
  window.crypto.getRandomValues(randomArray);

  const randomIndex = randomArray[0] % drawListOptions.length;
  const selectedOption = drawListOptions[randomIndex];

  const resultElement = document.getElementById("draw_result");
  resultElement.textContent = `Opção Sorteada: ${selectedOption}`;
}

function cleanList() {
  drawListOptions.length = 0;

  document.getElementById("list_options").innerHTML = "";
  document.getElementById("choice").value = "";
  document.getElementById("draw_result").innerHTML = "";

  showPopup("Concluído", "Lista Limpa!");
}
