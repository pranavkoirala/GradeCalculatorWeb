// Get reference to the category list element
const categoryList = document.getElementById("category-list");

// Retrieve categories from local storage
let categories = JSON.parse(localStorage.getItem("categories"));

// If there are no categories, display a message
if (!categories || categories.length === 0) {
  const noCategoriesMsg = document.createElement("p");
  noCategoriesMsg.textContent = "You haven't added any categories yet.";
  categoryList.appendChild(noCategoriesMsg);
} else {
  // Otherwise, loop through each category and display it on the page
  categories.forEach((category) => {
    const categoryItem = document.createElement("li");
    categoryItem.classList.add("category-item");

    const categoryName = document.createElement("h2");
    categoryName.textContent = category.name;
    categoryName.classList.add("category-name");
    categoryItem.appendChild(categoryName);

    const categoryWeight = document.createElement("p");
    categoryWeight.textContent = `Weight: ${category.weight}%`;
    categoryWeight.classList.add("category-weight");
    categoryItem.appendChild(categoryWeight);

    categoryList.appendChild(categoryItem);
  });
}
