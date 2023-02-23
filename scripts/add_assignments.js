// Retrieve categories from local storage
const categories = JSON.parse(localStorage.getItem("categories")) || [];

// Get the category select element and clear any existing options
const categorySelect = document.getElementById("category");
categorySelect.innerHTML = "";

// Add each category as an option to the category select element
categories.forEach((category) => {
  const option = document.createElement("option");
  option.value = category.name;
  option.textContent = category.name;
  categorySelect.appendChild(option);
});

// get the form and the message container
const form = document.querySelector("form");
const messageContainer = document.getElementById("message-container");

// add a submit event listener to the form
form.addEventListener("submit", addAssignment);

function addAssignment(event) {
  event.preventDefault();

  // get the input values
  const nameInput = document.getElementById("assignment-name");
  const categoryInput = document.getElementById("category");
  const pointsEarnedInput = document.getElementById("points-earned");
  const pointsPossibleInput = document.getElementById("points-possible");

  const name = nameInput.value;
  const category = categoryInput.value;
  const pointsEarned = parseFloat(pointsEarnedInput.value);
  const pointsPossible = parseFloat(pointsPossibleInput.value);

  // validate the input values
  if (name === "") {
    displayMessage("Please enter a name for the assignment.");
    return;
  }

  if (isNaN(pointsEarned) || isNaN(pointsPossible) || pointsPossible === 0) {
    displayMessage(
      "Please enter valid points earned and points possible values."
    );
    return;
  }

  // check if any categories exist in local storage
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  if (categories.length === 0) {
    displayMessage("No categories have been created yet.");
    return;
  }

  // check if the selected category exists in the list of categories
  if (!categories.some((cat) => cat.name === category)) {
    displayMessage(`Category '${category}' does not exist.`);
    return;
  }

  // calculate the grade and display it
  const grade = (pointsEarned / pointsPossible) * 100;
  const gradeText = `${grade.toFixed(2)}%`;
  displayMessage(
    `Assignment added: ${name}, ${category}, ${pointsEarned} / ${pointsPossible} (${gradeText})`
  );

  // clear the form
  form.reset();

  // store the assignment in Local Storage
  const assignments = JSON.parse(localStorage.getItem("assignments")) || [];
  const newAssignment = { name, category, pointsEarned, pointsPossible, grade };
  assignments.push(newAssignment);
  localStorage.setItem("assignments", JSON.stringify(assignments));
}

function displayMessage(message) {
  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  messageContainer.innerHTML = "";
  messageContainer.appendChild(messageElement);
}
