const drawListOptions = [];

const addNewOptionButton = document.getElementById("addOption");
const drawListButton = document.getElementById("draw");
const cleanListButton = document.getElementById("toClean");
const list = document.getElementById("list_options");
const resultElement = document.getElementById("draw_result");
const uploadBtn = document.getElementById("import");
const inputUpload = document.getElementById("file-upload");

function atualizarListaNaTela() {
  list.innerHTML = "";
  drawListOptions.forEach((option) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = option;
    const img = document.createElement("img");
    img.setAttribute("src", "./img/remocao.png");
    img.classList.add("delete");
    li.appendChild(span);
    li.appendChild(img);
    list.appendChild(li);
  });
}

addNewOptionButton.addEventListener("click", () => {
  const optionInput = document.getElementById("choice");
  const optionValue = optionInput.value.trim();
  const normalizedValue = optionValue.toLowerCase();

  if (!optionValue) {
    showPopup("Atenção!", "É necessário informar uma opção.");
    return;
  }

  if (drawListOptions.some((opt) => opt.toLowerCase() === normalizedValue)) {
    showPopup("Atenção!", "Esta opção já está adicionada. Insira outra.");
    return;
  }

  drawListOptions.push(optionValue);
  atualizarListaNaTela();
  optionInput.value = "";
});

list.addEventListener("click", (evento) => {
  if (evento.target.classList.contains("delete")) {
    const li = evento.target.parentElement;
    const liText = li.querySelector("span").textContent;
    const index = drawListOptions.indexOf(liText);
    if (index !== -1) {
      drawListOptions.splice(index, 1);
      atualizarListaNaTela();
    }
  }
});

cleanListButton.addEventListener("click", () => {
  drawListOptions.length = 0;
  atualizarListaNaTela();
  document.getElementById("choice").value = "";
  resultElement.textContent = "";
  showPopup("Concluído", "Lista limpa!");
});

uploadBtn.addEventListener("click", () => {
  inputUpload.click();
});

inputUpload.addEventListener("change", async (evento) => {
  const file = evento.target.files[0];
  if (!file) return;

  const fileSizeInMB = file.size / (1024 * 1024);
  const validExt = ["xls", "xlsx", "txt"];
  const ext = file.name.split(".").pop().toLowerCase();

  if (!validExt.includes(ext)) {
    showPopup(
      "Formato Inválido!",
      "Por favor, selecione um arquivo com os seguintes formatos: .xls, .xlsx ou .txt"
    );
    inputUpload.value = "";
    return;
  }

  if (fileSizeInMB > 10) {
    showPopup("Tamanho Inválido!", "O arquivo deve conter no máximo 10MB");
    inputUpload.value = "";
    return;
  }

  try {
    const arrayBuffer = await file.arrayBuffer();

    if (ext === "xls" || ext === "xlsx") {
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const hasColumnD = json
        .slice(1)
        .some(
          (row) =>
            row[3] !== undefined &&
            row[3] !== null &&
            row[3].toString().trim() !== ""
        );

      let listaImportada = [];

      if (hasColumnD) {
        listaImportada = json
          .slice(1)
          .map((row) => {
            const name = row[0]?.toString().trim();
            const concat = row[3]?.toString().trim();
            return name && concat ? `${name} - ${concat}` : null;
          })
          .filter((item) => item);
      } else {
        listaImportada = json
          .slice(1)
          .map((row) => row[0]?.toString().trim())
          .filter((item) => item);
      }

      if (listaImportada.length === 0) {
        showPopup("Atenção!", "Nenhum nome válido encontrado para sorteio.");
        return;
      }

      drawListOptions.length = 0;
      listaImportada.forEach((item) => drawListOptions.push(item));
      atualizarListaNaTela();

      showPopup("Sucesso!", "Arquivo importado. Agora é só sortear!");
      resultElement.textContent = "";
      console.log("Lista importada:", drawListOptions);
    } else if (ext === "txt") {
      const textContent = await file.text();
      const listaImportada = textContent
        .split("\n")
        .map((linha) => linha.trim())
        .filter((linha) => linha !== "");

      if (listaImportada.length === 0) {
        showPopup("Atenção!", "Nenhum nome válido encontrado no arquivo de texto.");
        return;
      }

      drawListOptions.length = 0;
      listaImportada.forEach((item) => drawListOptions.push(item));
      atualizarListaNaTela();

      showPopup("Sucesso!", "Arquivo TXT importado. Agora é só sortear!");
      resultElement.textContent = "";
      console.log("Lista importada:", drawListOptions);
    }
  } catch (error) {
    console.error(error);
    showPopup("ERRO!", "Não foi possível processar o arquivo.");
  }
});

drawListButton.addEventListener("click", () => {
  if (drawListOptions.length === 0) {
    showPopup("Erro!", "Nenhuma opção para sortear.");
    return;
  }

  if (drawListOptions.length < 2) {
    showPopup("Atenção!", "É necessário adicionar pelo menos duas opções para sortear.");
    return;
  }

  const randomArray = new Uint32Array(1);
  window.crypto.getRandomValues(randomArray);

  const randomIndex = randomArray[0] % drawListOptions.length;
  const selectedOption = drawListOptions[randomIndex];

  resultElement.textContent = `Opção Sorteada: ${selectedOption}`;
  console.log("Sorteado:", selectedOption);
});
