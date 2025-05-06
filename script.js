document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("calc-form");
  const nome = document.getElementById("nome");
  const altura = document.getElementById("altura");
  const peso = document.getElementById("peso");
  let resultado = document.getElementById("resultado");
  let categoriaImc = document.getElementById("categoriaImc");
  let categoriaColor = "";
  let imc = 0;
  const inputs = [nome, altura, peso];

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let hasError = false;

    inputs.forEach((element) => {
      let value = element.value;

      if (value.trim() === "") {
        showError(element, "Este campo é obrigatório.");
        hasError = true;
      } else {
        showError(element, "");
      }
    });
    if (hasError === false) {
      calculaImc();
      resultadoMessage();
      geraFormData(form);
    }
  });

  function showError(element, message) {
    let msgErro = element.nextElementSibling;
    if (msgErro) {
      msgErro.textContent = message;
    }
  }
  function calculaImc() {
    const pesoValue = parseFloat(peso.value);
    const alturaValue = parseFloat(altura.value);
    imc = (pesoValue / alturaValue ** 2).toFixed(2);
    let categoria = "";

    if (imc < 18.5) {
      categoria = "Abaixo do Peso";
      categoriaColor = "#83c635";
    } else if (imc < 24.99) {
      categoria = "Normal";
      categoriaColor = "#c0d90c";
    } else if (imc < 29.99) {
      categoria = "Sobrepeso";
      categoriaColor = "#fca502";
    } else {
      categoria = "Obesidade";
      categoriaColor = "#f67600";
    }
    categoriaImc.value = categoria;
  }

  function resultadoMessage() {
    const nomeValue = nome.value;
    const categoriaImcValue = categoriaImc.value;
    resultado.style.backgroundColor = categoriaColor;

    resultado.querySelector(
      "p"
    ).textContent = `Nome ${nomeValue},\n IMC: ${imc},\n Categoria: ${categoriaImcValue}`;
  }

  function geraFormData(formElement) {
    const formData = new FormData(formElement);
    let text = "";
    for (const [key, value] of formData.entries()) {
      text += `${key}: ${value}\n`;
    }

    let details = document.createElement("details");
    details.className = "formData-text";
    details.id = "formData-text";

    let summary = document.createElement("summary");
    summary.textContent = "Conteúdo do Form Data";
    details.appendChild(summary);

    resultado.appendChild(details);
  }
});
