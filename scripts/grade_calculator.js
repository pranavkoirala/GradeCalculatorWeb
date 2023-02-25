// Get current grade from local storage and display it if it exists
const currentGrade = localStorage.getItem("finalGrade");
const currentGradeSpan = document.getElementById("current-grade");
if (currentGrade) {
  currentGradeSpan.textContent = currentGrade + "%";
} else {
  currentGradeSpan.textContent = "N/A";
  const resultSection = document.getElementById("result-section");
  resultSection.style.display = "none";
  const calculateBtn = document.getElementById("calculate-btn");
  calculateBtn.disabled = true;
  alert("Please add some assignments and categories first.");
}

// Calculate required points for each category
function calculateRequiredPoints(targetGrade) {
  const categories = JSON.parse(localStorage.getItem("categories"));
  const assignments = JSON.parse(localStorage.getItem("assignments"));
  let requiredPointsByCategory = {};

  // Calculate total earned points and total possible points for each category
  categories.forEach((category) => {
    requiredPointsByCategory[category.name] = {
      weight: category.weight,
      earnedPoints: 0,
      possiblePoints: 0,
    };
  });
  assignments.forEach((assignment) => {
    const categoryName = assignment.category;
    requiredPointsByCategory[categoryName].earnedPoints +=
      assignment.pointsEarned;
    requiredPointsByCategory[categoryName].possiblePoints +=
      assignment.pointsPossible;
  });

  // Calculate required points for each category
  categories.forEach((category) => {
    const categoryName = category.name;
    const categoryWeight = category.weight;
    const categoryRequiredPoints =
      ((targetGrade / 100) *
        requiredPointsByCategory[categoryName].possiblePoints -
        requiredPointsByCategory[categoryName].earnedPoints) /
      (categoryWeight / 100);
    requiredPointsByCategory[categoryName].requiredPoints =
      categoryRequiredPoints.toFixed(2);
  });

  return requiredPointsByCategory;
}

// Handle click on Calculate button
const calculateBtn = document.getElementById("calculate-btn");
calculateBtn.addEventListener("click", () => {
  const targetGradeInput = document.getElementById("target-grade-input");
  const targetGrade = targetGradeInput.value;
  const resultSection = document.getElementById("result-section");
  const result = document.getElementById("result");

  if (isNaN(targetGrade) || targetGrade < 0 || targetGrade > 100) {
    resultSection.style.display = "none";
    alert("Please enter a valid target grade between 0 and 100.");
  } else {
    const requiredPointsByCategory = calculateRequiredPoints(targetGrade);
    let resultText = "";
    for (const [categoryName, categoryData] of Object.entries(
      requiredPointsByCategory
    )) {
      const requiredPoints = categoryData.requiredPoints;
      resultText += `You need ${requiredPoints} more points in the ${categoryName} category to achieve your target grade.<br>`;
    }
    result.innerHTML = resultText;
    resultSection.style.display = "block";
  }
});
