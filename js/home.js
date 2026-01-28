document.addEventListener("DOMContentLoaded", async () => {

  const searchInput = document.getElementById("searchInput");
  const dropdownList = document.getElementById("dropdownList");

  function renderOptions(sets) {
    dropdownList.innerHTML = "";

    sets.forEach(set => {
      const div = document.createElement("div");
      div.className = "dropdown-item";

      div.innerHTML = `
        <img src="loghi/${set.nome_logo}" alt="${set.nome_set}">
        <span>${set.nome_set}</span>
      `;

      div.addEventListener("click", () => {
        window.location.href = `set.html?set=${encodeURIComponent(set.nome_set)}`;
      });

      dropdownList.appendChild(div);
    });
  }

  const response = await fetch("data/sets.json");
  const allSets = await response.json();

  renderOptions(allSets);

  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();

    const filtered = allSets.filter(set =>
      set.nome_set.toLowerCase().includes(value)
    );

    renderOptions(filtered);
  });

});