function saveFormData(event) {
    event.preventDefault();
    alert("Form submitted!"); // For testing

    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let favoriteRecipe = document.getElementById("favoriteRecipe").value;

    // Save form data to localStorage
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("favoriteRecipe", favoriteRecipe);

    window.location.href = "frm.html"; // Redirect to new.html
}

function goToRecipePage() {
    console.log("Next button clicked!"); // For testing
    window.location.href = "new.html";
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("recipeForm");

    // Event listener for form submission
    form.addEventListener("submit", saveFormData);

    // Event listener for the Next button
    const nextButton = document.getElementById("nextButton");
    if (nextButton) {
        nextButton.addEventListener("click", goToRecipePage);
    }
});


// function goToRecipePage() {
//     console.log("Next button clicked!"); // Add this line for testing
//     window.location.href = "new.html";
// }
