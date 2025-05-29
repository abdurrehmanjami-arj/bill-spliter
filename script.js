const billAmountInput = document.querySelector("#bill-amount");
const customTipInput = document.querySelector(".custom-tip");
const numberOfPeopleInput = document.querySelector(".number-of-people");
const generateBillBtn = document.querySelector(".generate-bill-btn");
const tipAmountOutput = document.querySelector(".tip-amount span");
const totalBillOutput = document.querySelector(".total span");
const eachPersonBillOutput = document.querySelector(".each-person-bill span");
const tipsContainer = document.querySelector(".tip-container");
const resetBtn = document.querySelector(".reset-btn");

let tipPercentage = 0;

generateBillBtn.addEventListener("click", () => {
  const billAmount = parseInt(billAmountInput.value);
  const numberOfPeople = parseInt(numberOfPeopleInput.value);
  const tipAmount = billAmount * (tipPercentage / 100);
  const totalBill = billAmount + tipAmount;
  const eachPersonBill = totalBill / numberOfPeople;

  tipAmountOutput.innerText = `Rs ${tipAmount}`;
  totalBillOutput.innerText = `Rs ${totalBill}`;
  eachPersonBillOutput.innerText = `Rs ${eachPersonBill}`;

  resetBtn.disabled = false;
});

tipsContainer.addEventListener("click", (event) => {
  if (tipsContainer.classList.contains("disabled")) return;
  if (event.target !== tipsContainer) {
    [...tipsContainer.children].forEach((tip) =>
      tip.classList.remove("selected")
    );
    event.target.classList.add("selected");
    tipPercentage = parseInt(event.target.innerText);
    customTipInput.value = "";
    if (numberOfPeopleInput.value && tipPercentage) {
      generateBillBtn.disabled = false;
    } else {
      generateBillBtn.disabled = true;
    }
  }
});

customTipInput.addEventListener("input", () => {
  tipPercentage = parseInt(customTipInput.value);
  [...tipsContainer.children].forEach((tip) =>
    tip.classList.remove("selected")
  );
  if (numberOfPeopleInput.value && tipPercentage) {
    generateBillBtn.disabled = false;
  } else {
    generateBillBtn.disabled = true;
  }
});

resetBtn.addEventListener("click", () => {
  tipPercentage = 0;
  billAmountInput.value = "";
  customTipInput.value = "";
  numberOfPeopleInput.value = "";
  [...tipsContainer.children].forEach((tip) =>
    tip.classList.remove("selected")
  );
  tipAmountOutput.innerText = "";
  totalBillOutput.innerText = "";
  eachPersonBillOutput.innerText = "";
  generateBillBtn.disabled = true;
  resetBtn.disabled = true;
});

billAmountInput.addEventListener("input", () => {
  if (billAmountInput.value) {
    customTipInput.disabled = false;
    numberOfPeopleInput.disabled = false;
    tipsContainer.classList.remove("disabled");
    generateBillBtn.disabled = true;
  } else {
    customTipInput.disabled = true;
    numberOfPeopleInput.disabled = true;
    tipsContainer.classList.add("disabled");
    generateBillBtn.disabled = false;
  }
  if (billAmountInput.value === "") {
    customTipInput.value = "";
    numberOfPeopleInput.value = "";
    [...tipsContainer.children].forEach((tip) =>
      tip.classList.remove("selected")
    );
    generateBillBtn.disabled = true;
  }
});

numberOfPeopleInput.addEventListener("input", () => {
  if (numberOfPeopleInput.value && tipPercentage) {
    generateBillBtn.disabled = false;
  } else {
    generateBillBtn.disabled = true;
  }
});
