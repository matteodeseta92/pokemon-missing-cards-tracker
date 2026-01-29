fetch("data/cards.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("setsList");

    data.sets.forEach(set => {
      const missing = set.carte.length;

      const row = document.createElement("div");
      row.className = "set-row";

      row.innerHTML = `
        <span class="set-name">${set.nome_set}</span>

        <div class="set-right">
          <div class="missing-ring">
            ${missing}
          </div>

          <img
            src="loghi/${set.nome_logo}"
            alt="${set.nome_set}"
            class="set-logo"
          >
        </div>
      `;

      row.addEventListener("click", () => {
        window.location.href =
          \`set.html?set=\${encodeURIComponent(set.nome_set)}\`;
      });

      container.appendChild(row);
    });
  })
  .catch(err => console.error("Errore caricamento JSON:", err));