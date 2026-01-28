fetch("data/cards.json")
  .then(res => res.json())
  .then(data => {
    const input = document.getElementById("searchInput");
    const list = document.getElementById("dropdownList");
    const sets = data.sets;

    function render(filter = "") {
      list.innerHTML = "";

      const filtered = sets.filter(s =>
        s.nome_set.toLowerCase().includes(filter.toLowerCase())
      );

      filtered.forEach(set => {
        const item = document.createElement("div");
        item.className = "dropdown-item";

        item.innerHTML = `
          <img src="loghi/${set.nome_logo}" class="dropdown-logo">
          <span>${set.nome_set}</span>
        `;

        item.onclick = () => {
          window.location.href =
            `set.html?set=${encodeURIComponent(set.nome_set)}`;
        };

        list.appendChild(item);
      });

      list.style.display = filtered.length ? "block" : "none";
    }

    input.addEventListener("input", e => {
      render(e.target.value);
    });

    document.addEventListener("click", e => {
      if (!e.target.closest(".dropdown")) {
        list.style.display = "none";
      }
    });
  });