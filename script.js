const gradeButtons = document.querySelectorAll(".grade-buttons button");
const subjectsContainer = document.getElementById("subjects-container");
const topicsContainer = document.getElementById("topics-container");
const themeToggle = document.getElementById("theme-toggle");

// ✅ Toggle Light/Dark Mode
themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  themeToggle.textContent = document.body.classList.contains("dark") ? "🌞" : "🌙";
});

// ✅ Data Structure
const data = {
  "5-7": {
    English: ["Listening_and_Speaking", "Reading_Comprehension", "Vocabulary", "Grammar", "Writing"],
    Science: ["Living_things", "Matter_and_materials", "Energy_and_forces", "Earth_and_space", "Nutrition_and_health", "Forces_and_motion", "Light_and_sound", "Ecosystems_and_environment", "Human_body_system", "Electricity_and_magnetism", "Earths_resources"],
    Mathematics: ["Number_and_numeration", "Algebra", "Geometry", "Measurement", "Data_handling", "Probability_and_statistics"],
    "Social Studies": ["Our_community_Zambia", "Map_skills", "Government_and_leadership", "Zambias_neighbors", "Economic_activities", "Cultural_diversity", "Environmental_conservation", "Zambias_history", "Government_systems", "Economic_development"],
    "Creative and Technology Studies": ["Information_and_communication_technology", "Design_and_technology", "Home_economics", "Art_and_craft", "Music_and_drama"]
  },
  "8-9": {
    Mathematics: ["Numbers_and_numeration", "Algebra_expression", "Linear_equation", "Geometry", "Measurement", "Data_handling", "Probability", "Algebra_expression_and_equation", "Quadratic_equations", "Graphs_and_functions"],
    Science: ["Life_of_science", "Physical_science", "Earth_science", "Digestive_juices_enzymes", "Mental_disorders_and_treatment", "Physical_education"],
    History: ["Pre_colonial_Zambia", "Colonial_era", "Struggle_for_independence", "Post_independence_Zambia", "Global_history"],
    "Social Studies": ["History", "Geography", "Civic_Education", "Economics"],
    Geography: ["Physical_Geography", "Human_Geography", "Environmental_studies"],
    "Civic Education": ["Introduction", "Zambias_political_development", "Governance_and_citizenship", "Human_rights_and_responsibilities", "Democracy_and_democratic_principles", "Leadership_and_leadership_skills"],
    "Computer Studies": ["Introduction", "Computer_and_terminologies", "Types_of_computers", "Main_parts_of_a_Computer", "Input_devices", "Output_devices", "Storage_devices", "Data_integrity", "Computer_safety_and_health", "Uses_of_a_Computer"],
    "Business Studies": ["Entrepreneurship", "Office_management", "Finance", "Business_transactions"],
    "Agricultural Science": ["Plant_science", "Animal_science", "Soil_science", "Agricultural_practices"],
    English: ["Listening_and_Speaking", "Reading_and_Comprehension", "Composition_and_Writing", "Summary_and_note_making", "Structure_and_language", "Literature_and_language"]
  },
  "10-12": {
    Mathematics: ["Arithmetic", "Algebra", "Geometry", "Trigonometry", "Statistics", "Calculus", "Sets_and_logic", "Number_theory", "Graph_theory", "Mathematical_modeling"],
    English: ["Listening_and_Speaking", "Reading_and_Comprehension", "Summary_and_note_making", "Structure_and_language", "Literature_and_language"],
    "Agricultural Science": ["Soil_science", "Crop_production", "Livestock", "Farm_management", "Agricultural_economics"],
    Physics: ["Mechanics", "Thermal_physics", "Waves_and_sound", "Light_and_optics", "Magnetism_and_electricity"],
    Chemistry: ["Atoms_and_molecules", "Chemical_reaction", "Periodic_table", "Acid_base_reaction", "Organic_chemistry", "Physical_chemistry", "Common_acids_and_bases", "Chemical_equilibrium", "Electrochemistry"],
    Biology: ["Living_organisms", "Nutrition", "Respiration", "Excretion", "Homeostasis", "Growth_and_development", "Reproduction", "Genetics", "Evolution", "Microbiology", "Cell_biology", "Physiology", "Ecosystems", "Biodiversity"],
    History: ["Southern_African_history", "World_history"],
    Geography: ["Map_work", "Physical_Geography", "Weather_and_climate", "Vegetation_and_soils", "Environmental_hazards", "Human_Geography"],
    "Civic Education": ["Constitution_and_governance", "Human_rights_and_responsibilities", "Citizenship_and_identity", "Democracy_and_leadership", "Social_and_economic_development", "Global_citizenship"]
  }
};

// ✅ Grade Selection
gradeButtons.forEach(button => {
  button.addEventListener("click", () => {
    const grade = button.getAttribute("data-grade");
    showSubjects(grade);
  });
});

function showSubjects(grade) {
  subjectsContainer.classList.remove("hidden");
  topicsContainer.classList.add("hidden");
  subjectsContainer.innerHTML = `<h2>Subjects (Grade ${grade})</h2><div class='subjects-grid'></div>`;
  const grid = subjectsContainer.querySelector(".subjects-grid");

  Object.keys(data[grade]).forEach(subject => {
    const card = document.createElement("div");
    card.classList.add("subject-card");
    card.innerHTML = `<button onclick="showTopics('${grade}', '${subject}')">${subject}</button>`;
    grid.appendChild(card);
  });
}

function showTopics(grade, subject) {
  subjectsContainer.classList.add("hidden");
  topicsContainer.classList.remove("hidden");
  topicsContainer.innerHTML = `<h2>${subject} - Grade ${grade}</h2><div class='topics-grid'></div>`;
  const grid = topicsContainer.querySelector(".topics-grid");

  data[grade][subject].forEach(topic => {
    const displayName = topic.replace(/_/g, " ");
    const pdfPath = `pdfs/grade${grade}/${subject}/${topic}.pdf`;
    const card = document.createElement("div");
    card.classList.add("topic-card");
    card.innerHTML = `
      <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" alt="PDF">
      <a href="${pdfPath}" target="_blank">${displayName}</a>
    `;
    grid.appendChild(card);
  });
              }
