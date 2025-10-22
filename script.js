// SUBJECT DATA
const subjectsData = {
  "5-7": ["English", "Science", "Mathematics", "Social Studies", "Creative and Technology Studies"],
  "8-9": ["Mathematics", "Science", "History", "Social Studies", "Geography", "Civic Education", "Computer Studies", "Business Studies", "Agricultural Science"],
  "10-12": ["Mathematics", "English Language", "Agricultural Science", "Physics", "Biology", "Chemistry", "History", "Geography", "Civic Education"]
};

// DOM ELEMENTS
const gradeButtons = document.querySelectorAll(".grade-btn");
const subjectsSection = document.getElementById("subjects-section");
const pdfsSection = document.getElementById("pdfs-section");
const subjectsContainer = document.getElementById("subjects-container");
const pdfsContainer = document.getElementById("pdfs-container");
const selectedGradeTitle = document.getElementById("selected-grade");
const selectedSubjectTitle = document.getElementById("selected-subject");

let currentGroup = null;

// GRADE SELECTION
gradeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    currentGroup = btn.dataset.group;
    showSubjects(currentGroup);
  });
});

// SHOW SUBJECTS
function showSubjects(group) {
  selectedGradeTitle.textContent = `Subjects for Grades ${group}`;
  subjectsContainer.innerHTML = "";
  const subjects = subjectsData[group];

  subjects.forEach(sub => {
    const div = document.createElement("div");
    div.className = "subject-card";
    div.textContent = sub;
    div.onclick = () => showPDFs(sub);
    subjectsContainer.appendChild(div);
  });

  subjectsSection.classList.remove("hidden");
  pdfsSection.classList.add("hidden");
}

// LOAD PDFs FROM data/pdfs.json
async function showPDFs(subject) {
  selectedSubjectTitle.textContent = `${subject} (Grades ${currentGroup})`;
  pdfsContainer.innerHTML = "";

  try {
    const response = await fetch("data/pdfs.json");
    const pdfData = await response.json();

    const pdfList = pdfData[currentGroup]?.[subject] || [];

    if (pdfList.length === 0) {
      pdfsContainer.innerHTML = `<p style="text-align:center; color:#666;">No quizzes uploaded yet.</p>`;
      return;
    }

    pdfList.forEach(pdf => {
      const div = document.createElement("div");
      div.className = "pdf-card";
      div.innerHTML = `
        <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" alt="PDF Icon">
        <a href="${pdf.file}" target="_blank">${pdf.name}</a>
      `;
      pdfsContainer.appendChild(div);
    });

  } catch (error) {
    pdfsContainer.innerHTML = `<p style="text-align:center; color:red;">Error loading quizzes.</p>`;
    console.error(error);
  }

  pdfsSection.classList.remove("hidden");
  }
