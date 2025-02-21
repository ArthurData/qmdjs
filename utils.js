document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("starwarsChart").getContext("2d");

  function updateChart(selectedSpecies) {
    const filteredData = selectedSpecies === "All"
      ? starwars
      : starwars.filter(d => d.species === selectedSpecies);

    const newChartData = {
      labels: filteredData.map(d => d.name),
      datasets: [{
        label: "Taille vs Poids",
        data: filteredData.map(d => ({ x: d.height, y: d.mass })),
        backgroundColor: "rgba(54, 162, 235, 0.7)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        pointRadius: 5
      }]
    };

    starwarsChart.data = newChartData;
    starwarsChart.update();
  }

  // Création initiale du graphique
  const starwarsChart = new Chart(ctx, {
    type: "scatter",
    data: {
      labels: starwars.map(d => d.name),
      datasets: [{
        label: "Taille vs Poids",
        data: starwars.map(d => ({ x: d.height, y: d.mass })),
        backgroundColor: "rgba(54, 162, 235, 0.4)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        pointRadius: 5
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { title: { display: true, text: "Taille (cm)" } },
        y: { title: { display: true, text: "Poids (kg)" } }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: function (context) {
              return `${context.label}: ${context.raw.x} cm, ${context.raw.y} kg`;
            }
          }
        }
      }
    }
  });

  const domElement = document.querySelector("#treeselect-container");
  const treeSelect = new Treeselect({
    parentHtmlContainer: domElement,
    isSingleSelect: true,
    showTags: false,
    clearable: false,
    value: "All",
    options: [
      { name: "All", value: "All" },
      ...[...new Set(starwars.map(d => d.species).filter(Boolean))].map(species => ({
        name: species,
        value: species
      }))
    ]
  });

  treeSelect.srcElement.addEventListener("input", (e) => {
    updateChart(e.detail);
  });
});
