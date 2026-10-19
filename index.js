// API Key
const API_KEY = "OPEN NOTES APP"

// STEP 1: Set up Starting Variables and Select DOM Elements
const URL = "https://api.thecatapi.com/v1/breeds/search"
const searchForm = document.querySelector("form")
const catResults = document.querySelector("section#catResults")
const favoriteCats = document.querySelector("div#favoriteCats")

// Saving Favorites
let favoriteBreeds = []
const savedFavorites = localStorage.getItem("favoriteBreeds")

if (savedFavorites) {
    favoriteBreeds = JSON.parse(savedFavorites)
}


// STEP 2: LISTEN FOR FORM SUBMISSION
searchForm.onsubmit = async (event) => {
    event.preventDefault()
    
    // get what was typed and remove extra spaces
    const catBreed = searchForm.catBreed.value.trim()
    console.log(catBreed)

     // stop if nothing was typed
    if (!catBreed) return

    // storing the completed address
    const searchURL = `${URL}?q=${catBreed}&api_key=${API_KEY}`

    // TRY FUNCTION: retrieving the user input and rendering the info
    try {
        // search API for the breed
        const res = await fetch(searchURL)

        // THROW! If breed isn't found
        if (res.status !== 200) {
            throw new Error("Breed not found")
        }

        // turn response into usable data
        const breedResults = await res.json()
        console.log(breedResults)
        
        //THROW! ALSO! if breed not found
        if (breedResults.length === 0) {
            throw new Error("Breed not found")
        }

        //display the cat
        renderBreed(breedResults[0])

    } catch (err) {
        console.log(err.message)
        catResults.textContent = err.message

    }


}


// STEP 3: Display Cat Breed
function renderBreed(breed) {

    // clear old results if any
    catResults.innerHTML = ""

    // unpack breed (the variable), and afterwards the image
    const { name, origin, temperament, description, image } = breed
    const url = image?.url

    // display search results heading
    const searchResultsHeading = document.createElement("h2")
    searchResultsHeading.textContent = `Search Results`
    catResults.appendChild(searchResultsHeading)
    
    // image displayed ONLY if it exists
    const breedImg = document.createElement("img")
    breedImg.src = url
    breedImg.alt = name
    
    if (url) {
        catResults.appendChild(breedImg)
    }

    // name
    const breedName = document.createElement("h3")
    breedName.textContent = name
    catResults.appendChild(breedName)

    // origin
    const breedOrigin = document.createElement("p")
    const originLabel = document.createElement("strong")
    originLabel.textContent = "Origin: "

    const originText = document.createElement("span")
    originText.textContent = origin

    breedOrigin.appendChild(originLabel)
    breedOrigin.appendChild(originText)
    catResults.appendChild(breedOrigin)

    // temperament
    const temperamentLabel = document.createElement("p")
    temperamentLabel.textContent = "Temperament:"
    temperamentLabel.style.fontWeight = "bold"
    temperamentLabel.style.marginBottom = "4px"
    catResults.appendChild(temperamentLabel)

    const breedTemperament = document.createElement("p")
    breedTemperament.textContent = temperament
    breedTemperament.style.marginTop = "4px"
    catResults.appendChild(breedTemperament)

    // description
    const descriptionLabel = document.createElement("p")
    descriptionLabel.textContent = "Description:"
    descriptionLabel.style.fontWeight = "bold"
    descriptionLabel.style.marginBottom = "4px"
    catResults.appendChild(descriptionLabel)

    const breedDescription = document.createElement("p")
    breedDescription.textContent = description
    breedDescription.style.marginTop = "4px"
    catResults.appendChild(breedDescription)

    // favorites button
    const favoriteBtn = document.createElement("button")
    favoriteBtn.textContent = "❤ Add to Favorites"
    catResults.appendChild(favoriteBtn)

    // add a cat breed to favorites
    favoriteBtn.onclick = () => {
        const alreadyFavorite = favoriteBreeds.some(cat => cat.name === breed.name)
        
        if (!alreadyFavorite) {
            favoriteBreeds.push(breed)
            localStorage.setItem("favoriteBreeds", JSON.stringify(favoriteBreeds))
            renderFavorites()
        }
        
    }


}


// STEP 4: Display Favorite Cats
function renderFavorites() {

    favoriteCats.innerHTML = ""

    for (const breed of favoriteBreeds) {

        const favoriteCard = document.createElement("div")

        const favoriteName = document.createElement("h3")
        favoriteName.textContent = breed.name

        favoriteName.style.cursor = "pointer"

        favoriteName.onclick = () => {
            renderBreed(breed)
        }

        favoriteCard.appendChild(favoriteName)

        const removeBtn = document.createElement("button")
        removeBtn.textContent = `×`
        removeBtn.setAttribute("aria-label", `Remove ${breed.name} from favorites`)
        favoriteCard.appendChild(removeBtn)

        removeBtn.onclick = () => {

            favoriteBreeds = favoriteBreeds.filter(cat => cat.name !== breed.name)
            localStorage.setItem("favoriteBreeds", JSON.stringify(favoriteBreeds))
            renderFavorites()

        }

        
        favoriteCats.appendChild(favoriteCard)


    }

    
}

renderFavorites()