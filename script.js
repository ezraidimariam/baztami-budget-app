const btn = document.getElementById("add-transaction");
const form = document.getElementById("transaction-form");

const soldeEl = document.getElementById("solde");
const totalRevenusEl = document.querySelector(".text-success + h3");
const totalDepensesEl = document.querySelector(".text-danger + h3");

const list = document.getElementById("transactions-list");

let totalRevenus = 0;
let totalDepenses = 0;

// afficher/cacher formulaire
btn.addEventListener("click", () => {
  form.style.display = form.style.display === "none" || form.style.display === "" ? "block" : "none";
});

// soumettre formulaire
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const type = document.getElementById("type").value;
  const montant = parseFloat(document.getElementById("montant").value);
  const description = document.getElementById("description").value;
  const date = document.getElementById("date").value;

  if (!type || isNaN(montant)) {
    alert("Remplissez le type et le montant !");
    return;
  }

  // إنشاء كارت المعاملة
  const div = document.createElement("div");
  div.className = "card p-2 mb-2 shadow-sm";
  div.style.borderLeft = type === "revenu" ? "6px solid green" : "6px solid red";
  div.innerHTML = `
    <b>${description || "(Sans description)"}</b> - 
    ${type === "revenu" ? "+" : "-"}${montant} DH 
    <small class="text-muted">(${date})</small>
  `;
  list.prepend(div);

  // تحديث الحسابات
  if (type === "revenu") totalRevenus += montant;
  else totalDepenses += montant;

  const solde = totalRevenus - totalDepenses;

  totalRevenusEl.textContent = `${totalRevenus} DH`;
  totalDepensesEl.textContent = `${totalDepenses} DH`;
  soldeEl.textContent = `${solde} DH`;

  form.reset();
  form.style.display = "none";

  saveData();
});

// الحفظ فـlocalStorage
function saveData() {
  const data = {
    totalRevenus,
    totalDepenses,
    html: list.innerHTML,
  };
  localStorage.setItem("baztami", JSON.stringify(data));
}

// استرجاع البيانات ملي تفتح الصفحة
function loadData() {
  const saved = localStorage.getItem("baztami");
  if (saved) {
    const data = JSON.parse(saved);
    totalRevenus = data.totalRevenus;
    totalDepenses = data.totalDepenses;
    list.innerHTML = data.html;

    const solde = totalRevenus - totalDepenses;
    totalRevenusEl.textContent = `${totalRevenus} DH`;
    totalDepensesEl.textContent = `${totalDepenses} DH`;
    soldeEl.textContent = `${solde} DH`;
  }
}

window.addEventListener("load", loadData);
