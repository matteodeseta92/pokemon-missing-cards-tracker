const params = new URLSearchParams(window.location.search);
const setNameParam = params.get("set");

fetch("data/cards.json")
  .then(response => response.json())
  .then(data => {
    const set = data.sets.find(s => s.nome_set === setNameParam);
    if (!set) return;

    document.getElementById("setName").textContent = set.nome_set;
    document.getElementById("logoDisegnato").src = `assets/${set.logo_disegnato}`;
    document.getElementById("logoUfficiale").src = `loghi/${set.nome_logo}`;

    const tbody = document.getElementById("cardsTableBody");

    set.carte.forEach(carta => {
      const tr = document.createElement("tr");

      const flag =
        carta.lingua === "IT"
          ? "assets/ita.png"
          : "assets/en.png";

      tr.innerHTML = `
        <td>${carta.numero}</td>
        <td>${carta.nome}</td>
        <td><img src="${flag}" class="flag"></td>
        <td>${carta.rarita}</td>
      `;

      tbody.appendChild(tr);
    });
  });