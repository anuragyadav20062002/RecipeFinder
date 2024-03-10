function shareOnFacebook(recipeName) {
    // URL to share on Facebook
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this recipe: ${recipeName}`);

    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank');
}

function shareOnTwitter(recipeName) {
    // URL to share on Twitter
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`Check out this recipe: ${recipeName}`);

    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
}

function shareViaEmail(recipeName) {
    const subject = encodeURIComponent(`Check out this recipe: ${recipeName}`);
    const body = encodeURIComponent(`Hi,\n\nI found this delicious recipe called "${recipeName}". Check it out here: ${window.location.href}`);

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
}
function submitForm(event) {
    event.preventDefault(); // Prevent default form submission

    // Get form data
    let formData = new FormData(document.getElementById("recipeForm"));
    let name = formData.get("name");
    let email = formData.get("email");
    let favoriteRecipe = formData.get("favoriteRecipe");

    // Store form data in localStorage
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("favoriteRecipe", favoriteRecipe);

    // Redirect to frm.html
    window.location.href = "frm.html";
}

function shareOnFacebook(recipeName) {
    // Implement Facebook sharing logic
}

function shareOnTwitter(recipeName) {
    // Implement Twitter sharing logic
}

function shareViaEmail(recipeName) {
    // Implement email sharing logic
}
