// 🔧 DATA STRUCTURE FOR SUBJECTS
const subjectsData = {
  "5-7": ["English", "Science", "Mathematics", "Social Studies", "Creative and Technology Studies"],
  "8-9": ["Mathematics", "Science", "History", "Social Studies", "Geography", "Civic Education", "Computer Studies", "Business Studies", "Agricultural Science"],
  "10-12": ["Mathematics", "English Language", "Agricultural Science", "Physics", "Biology", "Chemistry", "History", "Geography", "Civic Education"]
};

// 🔧 DOM ELEMENTS
const gradeButtons = document.querySelectorAll(".grade-btn");
const subjectsSection = document.getElementById("subjects-section");
const pdfsSection = document.getElementById("pdfs-section");
const subjectsContainer = document.getElementById("subjects-container");
const pdfsContainer = document.getElementById("pdfs-container");
const selectedGradeTitle = document.getElementById("selected-grade");
const selectedSubjectTitle = document.getElementById("selected-subject");
const pdfUpload = document.getElementById("pdf-upload");

let currentGroup = null;
let currentSubject = null;

// 🎓 SHOW SUBJECTS
gradeButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const group = btn.dataset.group;
    currentGroup = group;
    showSubjects(group);
  });
});

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

// 📄 SHOW PDF QUIZZES
function showPDFs(subject) {
  currentSubject = subject;
  selectedSubjectTitle.textContent = `${subject} (Grades ${currentGroup})`;

  const storedPDFs = JSON.parse(localStorage.getItem("pdfData")) || {};
  const pdfList = storedPDFs[currentGroup]?.[subject] || [];

  pdfsContainer.innerHTML = "";

  if (pdfList.length === 0) {
    pdfsContainer.innerHTML = `<p style="text-align:center; color:#666;">No quizzes uploaded yet.</p>`;
  } else {
    pdfList.forEach(pdf => {
      const div = document.createElement("div");
      div.className = "pdf-card";
      div.innerHTML = `
        <img src="https://cdn-icons-png.flaticon.com/512/337/337946.png" alt="PDF Icon">
        <a href="${pdf.url}" target="_blank">${pdf.name}</a>
      `;
      pdfsContainer.appendChild(div);
    });
  }

  pdfsSection.classList.remove("hidden");
}

// 📤 UPLOAD PDF HANDLER
pdfUpload.addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const fileURL = URL.createObjectURL(file);

  // Save PDF info to localStorage
  const storedPDFs = JSON.parse(localStorage.getItem("pdfData")) || {};
  if (!storedPDFs[currentGroup]) storedPDFs[currentGroup] = {};
  if (!storedPDFs[currentGroup][currentSubject]) storedPDFs[currentGroup][currentSubject] = [];

  storedPDFs[currentGroup][currentSubject].push({
    name: file.name,
    url: fileURL
  });

  localStorage.setItem("pdfData", JSON.stringify(storedPDFs));

  // Update UI instantly
  showPDFs(currentSubject);
  e.target.value = ""; // reset input
});
