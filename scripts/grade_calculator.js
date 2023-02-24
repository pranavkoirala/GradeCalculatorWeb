// Get the final grade from localStorage
const finalGrade = localStorage.getItem("finalGrade");

// Check if final grade exists in localStorage
if (!finalGrade) {
  // If it does not exist, tell the user to add some assignments and categories
  const resultSection = document.querySelector("#result-section");
  const result = document.querySelector("#result");
  resultSection.style.display = "none";
  result.textContent =
    "Add some assignments and categories before calculating your grade.";
} else {
  // If final grade exists, display the current grade to the user
  const currentGrade = document.querySelector("#current-grade");
  currentGrade.textContent = finalGrade;
}

// Calculate the required grade
const calculateBtn = document.querySelector("#calculate-btn");
calculateBtn.addEventListener("click", () => {
  // Get the target grade from the input field
  const targetGradeInput = document.querySelector("#target-grade-input");
  const targetGrade = parseFloat(targetGradeInput.value);

  // Calculate the required grade
  const requiredGrade = calculateRequiredGrade(finalGrade, targetGrade);

  // Display the result to the user
  const resultSection = document.querySelector("#result-section");
  const result = document.querySelector("#result");
  resultSection.style.display = "block";
  result.textContent = `You need a ${requiredGrade}% on your remaining assignments to achieve your target grade.`;
});

// Calculate the required grade
function calculateRequiredGrade(finalGrade, targetGrade) {
  // Check if target grade is less than or equal to the final grade
  if (targetGrade <= finalGrade) {
    return 0;
  }

  // Calculate the required grade
  const requiredGrade = ((targetGrade - finalGrade) * 100) / (100 - finalGrade);
  return Math.round(100 * requiredGrade) / 100;
}
