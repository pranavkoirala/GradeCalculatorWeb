// get the form and the message container
const form = document.querySelector("form");
const messageContainer = document.getElementById("message-container");

// add a submit event listener to the form
form.addEventListener("submit", addCategory);

function addCategory(event) {
  event.preventDefault();

  // get the input values
  const nameInput = document.getElementById("category-name");
  const weightInput = document.getElementById("category-weight");

  const name = nameInput.value;
  const weight = parseFloat(weightInput.value);

  // validate the input values
  if (name === "") {
    displayMessage("Please enter a name for the category.");
    return;
  }

  if (isNaN(weight) || weight <= 0 || weight > 100) {
    displayMessage("Please enter a valid weight value between 0 and 100.");
    return;
  }

  // check if total weight is already 100%
  const categories = JSON.parse(localStorage.getItem("categories")) || [];
  const totalWeight = categories.reduce((acc, curr) => acc + curr.weight, 0);
  if (totalWeight + weight > 100) {
    displayMessage("Cannot add category. Total weight cannot exceed 100%.");
    return;
  }

  // store the category in Local Storage
  const newCategory = { name, weight };
  categories.push(newCategory);
  localStorage.setItem("categories", JSON.stringify(categories));

  // display success message and clear the form
  displayMessage(`Category added: ${name} (${weight}%)`);
  form.reset();
}

function displayMessage(message) {
  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  messageContainer.appendChild(messageElement);
}
