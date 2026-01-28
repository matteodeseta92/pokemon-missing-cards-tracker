// Home page - menu a tendina con ricerca testuale

fetch("data/cards.json")
  .then(response => response.json())
  .then(data => {
    const sets = data.sets;
    const select = document.getElementById("setSelect");
    const searchInput = document.getElementById("searchInput");

    // Funzione per popolamento menu
    function renderOptions(filter = "") {
      select.innerHTML = `<option value="">Seleziona un set</option>`;

      sets
        .filter(set =>
          set.nome_set.toLowerCase().includes(filter.toLowerCase())
        )
        .forEach(set => {
          const option = document.createElement("option");
          option.value = set.nome_set;
          option.textContent = set.nome_set;
          select.appendChild(option);
        });
    }

    // Render iniziale
    renderOptions();

    // Ricerca dinamica
    searchInput.addEventListener("input", e => {
      renderOptions(e.target.value);
    });

    // Click sul menu
    select.addEventListener("change", e => {
      if (e.target.value) {
        window.location.href = `set.html?set=${encodeURIComponent(e.target.value)}`;
      }
    });
  })
  .catch(err => console.error("Errore caricamento JSON:", err));