const drawListOptions = [];

const addNewOptionButton = document.getElementById("addOption");
const drawListButton = document.getElementById("draw");
const cleanListButton = document.getElementById("toClean");
const list = document.getElementById("list_options");

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
  const optionsImg = document.createElement("img");
  optionsImg.setAttribute("src", "./img/remocao.png");
  optionsImg.classList.add("delete");

  if (!optionValue) {
    showPopup("Atenção!", messages.emptyField);
    return;
  }

  if (drawListOptions.some((opt) => opt.toLowerCase() === normalizedValue)) {
    showPopup("Atenção!", messages.duplicateValue);
    return;
  }

  drawListOptions.push(optionValue);

  const newOptionItem = document.createElement("li");
  const spanOptions = document.createElement("span");
  spanOptions.textContent = optionValue;
  newOptionItem.appendChild(spanOptions);
  newOptionItem.appendChild(optionsImg);
  list.appendChild(newOptionItem);

  optionInput.value = "";
}

document.getElementById("list_options").addEventListener("click", (evento) => {
  if (evento.target.classList.contains("delete")) {
    const li = evento.target.parentElement;
    const liText = li.querySelector("span").textContent;

    const indexLi = drawListOptions.indexOf(liText);
    if (indexLi !== -1) {
      drawListOptions.splice(indexLi, 1);
    }

    li.remove();
  }
});

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
