const backButton = document.getElementById("go-back-btn");
backButton.addEventListener("click", function () {
  window.location.href = "index.html";
});

// Get assignments from local storage
const assignments = JSON.parse(localStorage.getItem("assignments")) || [];

// Get table body element
const tbody = document.querySelector("tbody");

// Loop through each assignment and add it to the table
assignments.forEach((assignment) => {
  // Create table row element
  const row = document.createElement("tr");

  // Create table data elements for each column
  const name = document.createElement("td");
  name.textContent = assignment.name;
  row.appendChild(name);

  const category = document.createElement("td");
  category.textContent = assignment.category;
  row.appendChild(category);

  const pointsEarned = document.createElement("td");
  pointsEarned.textContent = assignment.pointsEarned;
  row.appendChild(pointsEarned);

  const pointsPossible = document.createElement("td");
  pointsPossible.textContent = assignment.pointsPossible;
  row.appendChild(pointsPossible);

  const grade = document.createElement("td");
  if (isNaN(assignment.grade)) {
    grade.textContent = (
      (assignment.pointsEarned / assignment.pointsPossible) *
      100
    ).toFixed(2);
  } else {
    grade.textContent = assignment.grade + "%"; // Round to 2 decimal places
    row.appendChild(grade);
  }

  // Add the row to the table body
  tbody.appendChild(row);
});
