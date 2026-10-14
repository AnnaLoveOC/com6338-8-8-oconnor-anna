// API Key
const API_KEY = "PASTE BACK FROM NOTES APP"

// STEP 1: Set up Starting Variables and Select DOM Elements
const URL = "https://api.thecatapi.com/v1/breeds/search"
const searchForm = document.querySelector("form")
const catResults = document.querySelector("div#catResults")

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

        //display the cat
        renderBreed(breedResults[0])

    } catch (err) {
        console.log(err.message)

    }


}

// STEP 3: Display Cat Breed
function renderBreed(breed) {

    // unpack breed (the variable), and afterwards the image
    const { name, origin, temperament, description, image } = breed
    const { url } = image
    
    // image
    const breedImg = document.createElement("img")
    breedImg.src = url
    breedImg.alt = name
    catResults.appendChild(breedImg)

    // name
    const breedName = document.createElement("h2")
    breedName.textContent = name
    catResults.appendChild(breedName)

    // origin
    const breedOrigin = document.createElement("p")
    breedOrigin.textContent = `Origin: ${origin}`
    catResults.appendChild(breedOrigin)

    // temperament
    const temperamentLabel = document.createElement("p")
    temperamentLabel.textContent = "Temperament:"
    catResults.appendChild(temperamentLabel)

    const breedTemperament = document.createElement("p")
    breedTemperament.textContent = temperament
    catResults.appendChild(breedTemperament)

    // description
    const descriptionLabel = document.createElement("p")
    descriptionLabel.textContent = "Description:"
    catResults.appendChild(descriptionLabel)

    const breedDescription = document.createElement("p")
    breedDescription.textContent = description
    catResults.appendChild(breedDescription)


}


