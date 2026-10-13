// API Key
const API_KEY = "live_V0osqrpzWl39kkfPqAlMgXaKQSmxrNn61ZBfXEqe4PBMflopzBKjmf8MAKA36Ayy"

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


    } catch (err) {
        console.log(err.message)

    }




}

