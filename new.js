const searchForm = document.querySelector('.search-form')
const searchInput = document.querySelector('.search-input')
const searchResult = document.querySelector('.search__result')
const container = document.querySelector('.container')
const searchIcon = document.querySelector('.search__icon')
// Function to initialize the Speech Recognition
function initializeSpeechRecognition() {
    if ('webkitSpeechRecognition' in window) {
        var recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = 'en-US'; // Language for speech recognition, you can change it to another language code if needed

        recognition.onresult = function(event) {
            var transcript = event.results[0][0].transcript;
            document.getElementById('search').value = transcript;
        };

        recognition.onerror = function(event) {
            console.error('Speech recognition error:', event.error);
        };

        return recognition;
    } else {
        console.error('Speech recognition not supported');
        return null;
    }
}

// Function to translate text using Google Translate API
async function translateText(text, targetLanguage) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your Google Translate API key
    const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            q: text,
            target: targetLanguage
        })
    });

    const data = await response.json();
    if (data && data.data && data.data.translations && data.data.translations.length > 0) {
        return data.data.translations[0].translatedText;
    // } else {
    //     console.error('Translation error:', data.error);
    //     return 'Translation Error';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Initialize speech recognition
    const recognition = initializeSpeechRecognition();

    // Button click event for speech recognition
    document.getElementById('speechButton').addEventListener('click', function() {
        if (recognition) {
            recognition.start();
        } else {
            console.error('Speech recognition not supported');
        }
    });

    // Button click event for translation
    document.getElementById('translateButton').addEventListener('click', async function() {
        const searchText = document.getElementById('search').value;
        const translatedText = await translateText(searchText, 'es'); // Translate to Spanish, change 'es' to your desired target language code
        document.getElementById('translatedText').innerText = translatedText;
    });
});

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


const APP_ID = '2343a8e9'
const APP_KEY = '570fa7f53e979dd545cf1eac36c8aed9'

let searchValue = ''

const generateHTML = (hits) => {
    let html = ''
    
    if (hits.length === 0) {
        html += `
        <div class="error__container">
            <p class="error__message">
                Oops. No results found. Try Again
            </p>
            <div class="error__image">
                <img src="/not-found.svg" alt="" class="error__img">
            </div>
        </div>
        `
    }

    hits.map((hit) => {
        const rating = hit.recipe.rating ? hit.recipe.rating : 'Not rated';
        const reviews = hit.recipe.reviews ? hit.recipe.reviews : [];

        html += `
        <div class="search__item">
            <div class="rating">
                <p>Rating: ${rating}</p>
                <div class="reviews">
                    <ul>
                        ${reviews.map(review => `<li>${review}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <img src="${hit.recipe.image}" alt="" class="search__item-img">
            <div class="flex__container">
                <h1 class="search__item-title">${hit.recipe.label}</h1>
                <a href="${hit.recipe.url}" class="btn">View</a>
            </div>
            <div class="search__item-data">
                <div class="calories">
                    <ion-icon name="flame-outline" class="calories__icon"></ion-icon>
                    <span class="calories-value">${Math.round(hit.recipe.calories)}</span>
                    <span class="calories-string">kcal</span>
                </div>
                <div class="meal__type">
                    <ion-icon name="pizza-outline" class="meal__type-icon"></ion-icon>
                    <span class="meal__type-value">${hit.recipe.mealType}</span>
                </div>
            </div>
            <div class="search__item-nationality">
                <ion-icon name="flag-outline" class="meal__type-icon"></ion-icon>
                <span class="nationality">${hit.recipe.cuisineType}</span>
            </div>
        </div>
        `;
    })
    searchResult.innerHTML = html;
}
// const queryStrings = {
//     app_id : process.env.REACT_APP_APP_ID,
//     app_key:process.env.REACT_APP_APP_KEY

// }
const fetchAPI = async () => {
    const baseURL = `https://api.edamam.com/search?q=${searchValue}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=20`
    const response = await fetch(baseURL)
    const data = await response.json()
    generateHTML(data.hits)
}

const search = (e) => { 
    e.preventDefault()
    searchValue = searchInput.value
    fetchAPI()
}

searchForm.addEventListener('submit', search)
searchIcon.addEventListener('click', search)
