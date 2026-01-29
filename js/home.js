document.addEventListener("DOMContentLoaded", function () {
  var setsList = document.getElementById("setsList");
  if (!setsList) return;

  fetch("data/cards.json")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      data.sets.forEach(function (set) {

        // ✔ Carte mancanti = totale carte del set
        var missingCount = set.carte.length;

        var row = document.createElement("div");
        row.className = "set-row";
        row.addEventListener("click", function () {
          window.location.href =
            "set.html?set=" + encodeURIComponent(set.nome_set);
        });

        var name = document.createElement("div");
        name.className = "set-name";
        name.textContent = set.nome_set;

        var right = document.createElement("div");
        right.className = "set-right";

        var missing = document.createElement("div");
        missing.className = "missing-ring";
        missing.textContent = missingCount;

        var logo = document.createElement("img");
        logo.className = "set-logo";
        logo.src = "loghi/" + set.nome_logo;
        logo.alt = set.nome_set;

        right.appendChild(missing);
        right.appendChild(logo);

        row.appendChild(name);
        row.appendChild(right);
        setsList.appendChild(row);
      });
    })
    .catch(function (err) {
      console.error("Errore caricamento cards.json:", err);
    });
});