// Add Assignment button
const addAssignmentBtn = document.querySelector("#add-assignment-btn");
addAssignmentBtn.addEventListener("click", () => {
  // Navigate to Add Assignment page
  window.location.href = "add_assignment.html";
});

// View Assignment button
const viewAssignmentBtn = document.querySelector("#view-assignment-btn");
viewAssignmentBtn.addEventListener("click", () => {
  // Navigate to View Assignment page
  window.location.href = "view_assignments.html";
});

// Add Category button
const addCategoryBtn = document.querySelector("#add-category-btn");
addCategoryBtn.addEventListener("click", () => {
  // Navigate to Add Category page
  window.location.href = "add_category.html";
});

// View Category button
const viewCategoryBtn = document.querySelector("#view-category-btn");
viewCategoryBtn.addEventListener("click", () => {
  // Navigate to View Category page
  window.location.href = "view_categories.html";
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
