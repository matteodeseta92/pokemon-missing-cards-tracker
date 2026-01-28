fetch("data/cards.json")
  .then(response => response.json())
  .then(data => {
    const select = document.getElementById("setSelect");
    const searchInput = document.getElementById("searchInput");

    const sets = data.sets;

    function renderOptions(filter = "") {
      select.innerHTML = `<option value="">Seleziona un set</option>`;

      sets
        .filter(s =>
          s.nome_set.toLowerCase().includes(filter.toLowerCase())
        )
        .forEach(set => {
          const option = document.createElement("option");
          option.value = set.nome_set;
          option.textContent = set.nome_set;
          select.appendChild(option);
        });
    }

    renderOptions();

    searchInput.addEventListener("input", e => {
      renderOptions(e.target.value);
    });

    select.addEventListener("change", e => {
      if (e.target.value) {
        window.location.href = `set.html?set=${encodeURIComponent(e.target.value)}`;
      }
    });
  });