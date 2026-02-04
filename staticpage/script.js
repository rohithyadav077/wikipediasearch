// Given JSON (example)
const projects = [
  {
    id: 1,
    title: "AI Product Thinking",
    description: "Break problems into first principles.",
    active: true
  },
  {
    id: 2,
    title: "DeepTech Psychology",
    description: "Understanding how humans learn.",
    active: false
  }
];

// DOM reference
const cardContainer = document.getElementById("cards");

// Render logic
function renderCards(data) {
  cardContainer.innerHTML = "";

  data.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    card.innerHTML = `
      <h3>${item.title}</h3>
      <p>${item.description}</p>
      <button onclick="toggleStatus(${item.id})">
        ${item.active ? "Deactivate" : "Activate"}
      </button>
    `;

    cardContainer.appendChild(card);
  });
}

// Toggle functionality
function toggleStatus(id) {
  const project = projects.find(p => p.id === id);
  project.active = !project.active;
  renderCards(projects);
}

// Initial render
renderCards(projects);
