# The Cat-alog!

**COM 6338 – Project 1 (Assignment 8)**  
Create a Web Application Using ES6 and New JavaScript Features

## Project Description
The Cat-alog uses The Cat API to search for different cat breeds. It displays an image of the breed, followed by its name, origin, temperament, and description. Underneath the breed information is an "Add to Favorites" button, which allows users to save their favorite breeds using `localStorage`. Saved breeds are displayed in the "My Favorite Cats" section below the search results.

From the favorites section, users can click on a breed's name to display its information again or click the × button to remove it from their favorites. The favorites list is saved in `localStorage`, so it remains available even after the page is refreshed.

## API Used
This project uses The Cat API to retrieve cat breed information, including images, names, origins, temperaments, and descriptions.

## ES6 Features Implemented
- **`let` and `const`:** Used throughout `index.js` to declare variables, including the API URL, DOM elements, and the array of favorite cat breeds.
- **Template literals:** Used to create the API request URL using the cat breed entered in the search form.
- **Destructuring:** Used in the `renderBreed()` function to extract breed information, including the name, origin, temperament, and description.
- **Arrow functions:** Used for event handlers and array methods, including adding and removing favorite breeds.
- **`async`/`await`:** Used in the form submission function to retrieve breed information from The Cat API and wait for the response before displaying the results.

## Local Storage
The Cat-alog uses `localStorage` to save the user's favorite cat breeds. This allows the favorites list to remain available even after the page is refreshed.