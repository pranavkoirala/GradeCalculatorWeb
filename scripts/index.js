// Add Assignment button
const addAssignmentBtn = document.querySelector("#add-assignment-btn");
addAssignmentBtn.addEventListener("click", () => {
  // Navigate to Add Assignment page
  window.location.href = "./pages/add_assignment.html";
});

// View Assignment button
const viewAssignmentBtn = document.querySelector("#view-assignment-btn");
viewAssignmentBtn.addEventListener("click", () => {
  // Navigate to View Assignment page
  window.location.href = "./pages/view_assignments.html";
});

// Grade Calculator button
const gradeCalculatorBtn = document.querySelector("#grade-calculator-btn");
gradeCalculatorBtn.addEventListener("click", () => {
  // Navigate to Grade Calculator page
  window.location.href = "./pages/grade_calculator.html";
});

// Add Category button
const addCategoryBtn = document.querySelector("#add-category-btn");
addCategoryBtn.addEventListener("click", () => {
  // Navigate to Add Category page
  window.location.href = "./pages/add_category.html";
});

// View Category button
const viewCategoryBtn = document.querySelector("#view-category-btn");
viewCategoryBtn.addEventListener("click", () => {
  // Navigate to View Category page
  window.location.href = "./pages/view_categories.html";
});

// Default text for final grade
const finalGradeText = document.querySelector("#final-grade-text");
const defaultFinalGradeText = finalGradeText.textContent;

// Update final grade text
function updateFinalGradeText() {
  const categories = JSON.parse(localStorage.getItem("categories"));
  const assignments = JSON.parse(localStorage.getItem("assignments"));

  if (
    !categories ||
    !assignments ||
    categories.length === 0 ||
    assignments.length === 0
  ) {
    // If there are no assignments or categories, or if their length is 0, display the default text
    finalGradeText.textContent = defaultFinalGradeText;
    return;
  }

  // Calculate final grade based on assignments and categories
  const finalGrade = calculateFinalGrade();

  // Update final grade text
  finalGradeText.textContent = `Your current final grade is: ${finalGrade}%`;

  // Save final grade to local storage
  localStorage.setItem("finalGrade", finalGrade);
}

// Calculate final grade based on assignments and categories
function calculateFinalGrade() {
  const categories = JSON.parse(localStorage.getItem("categories"));
  const assignments = JSON.parse(localStorage.getItem("assignments"));

  if (
    !categories ||
    !assignments ||
    categories.length === 0 ||
    assignments.length === 0
  ) {
    return "Add some assignments and categories!";
  }

  let totalScore = 0;
  let totalWeight = 0;

  categories.forEach((category) => {
    const categoryAssignments = assignments.filter(
      (assignment) => assignment.category === category.name
    );

    if (categoryAssignments.length > 0) {
      const categoryScore = categoryAssignments.reduce(
        (accumulator, assignment) => accumulator + assignment.grade,
        0
      );
      const categoryWeight = category.weight;
      totalScore +=
        (categoryScore / categoryAssignments.length) * (categoryWeight / 100);
      totalWeight += categoryWeight;
    }
  });

  let finalWeight = totalWeight > 0 ? (totalScore / totalWeight) * 100 : 0;
  return Math.round(100 * finalWeight) / 100;
}

// Call updateFinalGradeText() when page is loaded
window.addEventListener("load", updateFinalGradeText);

// Import Assignments button
const importAssignmentsBtn = document.getElementById("import-assignments-btn");
importAssignmentsBtn.addEventListener("click", handleImportAssignments);

function handleImportAssignments() {
  const fileInput = document.getElementById("import-assignments-input");
  const file = fileInput.files[0];

  const reader = new FileReader();
  reader.onload = (event) => {
    const data = new Uint8Array(event.target.result);
    const workbook = XLSX.read(data, { type: "array" });

    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    const assignments = [];

    jsonData.forEach((item) => {
      const firstCell = Object.keys(item)[0];
      const regex = /^[0-9]+$/;

      if (regex.test(item[firstCell])) {
        const assignment = {
          name: item.__EMPTY_1,
          category: item.__EMPTY,
          pointsEarned: item.__EMPTY_7,
          pointsPossible: item.__EMPTY_9,
          grade: ((item.__EMPTY_7 / item.__EMPTY_9) * 100).toFixed(2),
        };

        assignments.push(assignment);
      }
    });

    localStorage.setItem("assignments", JSON.stringify(assignments));
  };
  reader.readAsArrayBuffer(file);
}

// TODO: Add extra credit support
