function updateText() {
  const now = new Date();
  const hours = now.getHours();
  const textElement = document.getElementById("text");

  if (hours >= 9 && hours < 19) {
    textElement.textContent = "Сейчас работаем";
    textElement.style.color = "#53DB4D";
  } else {
    textElement.textContent = "Сейчас не работаем";
    textElement.style.color = "red";
  }
}

updateText();

setInterval(updateText, 60000);

function openModal() {
  document.getElementById("callbackModal").style.display = "block";
}

function closeModal() {
  document.getElementById("callbackModal").style.display = "none";
}

const forms = document.querySelectorAll("#visitForm, #callbackForm");

forms.forEach((form) => {
  const inputs = form.querySelectorAll("input");

  inputs.forEach((input) => {
    input.addEventListener("input", () => {
      validateInput(input);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    inputs.forEach((input) => {
      if (!validateInput(input)) {
        isValid = false;
      }
    });

    const agreementCheckbox = form.querySelector("#agreement");
    const callbackAgreementCheckbox = form.querySelector("#callback-agreement");
    if (agreementCheckbox && !agreementCheckbox.checked) {
      isValid = false;
      alert("Пожалуйста, примите пользовательское соглашение.");
    }
    if (callbackAgreementCheckbox && !callbackAgreementCheckbox.checked) {
      isValid = false;
      alert("Пожалуйста, примите условия передачи данных.");
    }

    if (isValid) {
      alert("Форма успешно отправлена!");
      form.reset();
      if (form.id === "callbackForm") {
        closeModal();
      }
    }
  });
});

function validateInput(input) {
  const errorElement = document.getElementById(`${input.id}-error`);
  if (input.validity.valid) {
    errorElement.style.display = "none";
    return true;
  } else {
    errorElement.style.display = "block";
    return false;
  }
}
ы