document.addEventListener("DOMContentLoaded", () => {
  const setsList = document.getElementById("sets-list");

  fetch("sets.json")
    .then(response => response.json())
    .then(sets => {
      sets.forEach(set => {
        const row = document.createElement("div");
        row.className = "set-row";
        row.onclick = () => {
          window.location.href = `set.html?set=${set.id}`;
        };

        const name = document.createElement("div");
        name.className = "set-name";
        name.textContent = set.name;

        const right = document.createElement("div");
        right.className = "set-right";

        const missing = document.createElement("div");
        missing.className = "missing-ring";
        missing.textContent = set.missing;

        const logo = document.createElement("img");
        logo.className = "set-logo";
        logo.src = `loghi/${set.logo}`;
        logo.alt = set.name;

        right.appendChild(missing);
        right.appendChild(logo);

        row.appendChild(name);
        row.appendChild(right);

        setsList.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Errore nel caricamento dei set:", error);
    });
});