document.addEventListener("DOMContentLoaded", () => {
  const setsList = document.getElementById("setsList");

  fetch("data/cards.json")
    .then(response => response.json())
    .then(data => {
      data.sets.forEach(set => {
        // Calcolo carte mancanti
        const missingCount = set.carte.filter(c => !c.lingua || c.lingua === "").length;

        const row = document.createElement("div");
        row.className = "set-row";
        row.onclick = () => {
          window.location.href = `set.html?set=${encodeURIComponent(set.nome_set)}`;
        };

        const name = document.createElement("div");
        name.className = "set-name";
        name.textContent = set.nome_set;

        const right = document.createElement("div");
        right.className = "set-right";

        const missing = document.createElement("div");
        missing.className = "missing-ring";
        missing.textContent = missingCount;

        const logo = document.createElement("img");
        logo.className = "set-logo";
        logo.src = `loghi/${set.nome_logo}`;
        logo.alt = set.nome_set;

        right.appendChild(missing);
        right.appendChild(logo);

        row.appendChild(name);
        row.appendChild(right);

        setsList.appendChild(row);
      });
    })
    .catch(err => console.error("Errore caricamento cards.json:", err));
});