const btn = document.getElementById("add-transaction");
const form = document.getElementById("transaction-form");

const soldeEl = document.getElementById("solde");
const totalRevenusEl = document.querySelector(".text-success + h3");
const totalDepensesEl = document.querySelector(".text-danger + h3");

let totalRevenus = 0;
let totalDepenses = 0;


btn.addEventListener("click", () => {
  if (form.style.display === "none" || form.style.display === "") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
});


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const type = document.getElementById("type").value;
  const montant = parseFloat(document.getElementById("montant").value);

  if (!type || isNaN(montant)) {
    alert("⚠️ Remplissez le type et le montant !");
    return;
  }

  if (type === "revenu") {
    totalRevenus += montant;
  } else if (type === "depense") {
    totalDepenses += montant;
  }

  const solde = totalRevenus - totalDepenses;

  totalRevenusEl.textContent = `${totalRevenus} DH`;
  totalDepensesEl.textContent = `${totalDepenses} DH`;
  soldeEl.textContent = `${solde} DH`;

  form.reset();
  form.style.display = "none";
});
