/**
 * SEARCH ALGORITHM 1
 * Here is all the logic to process a user request and return a list of corresponding recipes
 * This first algorithm has not pre-treatment of the data, the array data go throught too much
 * "for of" loops who'll only keep the corresponding recipes.
 */

// Import database with all the recipes
import data from "./assets/data/data.json"
// store last results
let lastSearch = [];
export function getLastSearch() {
    return lastSearch;
}

/**
 * Take an user request, return a list of corresponding recipes
 * @param {string} request - text typed by the user in the input field
 * @param {string} appliance - value of the appliance <select>
 * @param {string} ustensil - value of the ustensil <select>
 * @returns {array} - array of objects (corresponding recipes)
 */
export function search(request, appliance, ustensil, ingredients) {
    console.time("search");
    let recipes = data.recipes;
    recipes = matchAppliance(recipes, appliance.toLowerCase());
    recipes = matchUstensils(recipes, ustensil.toLowerCase());
    recipes = matchIngredients(recipes, ingredients);
    recipes = matchContent(recipes, request.toLowerCase());
    //save the result
    lastSearch = [appliance, ustensil, ingredients, recipes];
    console.timeEnd("search");
    return recipes;
}

/**
 * Check if a recipe match with the requested appliance
 * @param {array} recipes - array of objects
 * @param {string} appliance
 * @returns {array} - array of objects (corresponding recipes)
 */
function matchAppliance(recipes, appliance) {
    let recipesMatched = [];
    for (let recipe of recipes) {
        if (recipe.appliance.toLowerCase().includes(appliance)) {
            recipesMatched.push(recipe)
        }
    }
    return recipesMatched;
}

/**
 * Check if a recipe match with the requested ustensil,
 * @param {array} recipes - array of objects
 * @param {string} ustensil
 * @returns {array} - array of objects (corresponding recipes)
 */
function matchUstensils(recipes, ustensil) {
    let recipesMatched = [];
    for (let recipe of recipes) {
        if (ustensil == "" || recipe.ustensils.filter(usten => usten.includes(ustensil)).length > 0) {
            recipesMatched.push(recipe)
        }
    }
    return recipesMatched;
}

/**
 * Check if a recipe match with the all the tagged ingredients
 * @param {array} recipes - array of objects
 * @param {array} ingredients
 * @returns {array} - array of objects (corresponding recipes)
 */
 function matchIngredients(recipes, ingredients) {
    let recipesMatched = [];
    for (let recipe of recipes) {
        let ingredientsMatch = []
        ingredients.forEach(ingredient => {
            ingredientsMatch.push(
                recipe.ingredients.filter(recIngredient =>
                    recIngredient.ingredient.toLowerCase().includes(ingredient.toLowerCase())    
                ).length > 0 
        )})
        if (ingredientsMatch.every(match => match == true)) {
            recipesMatched.push(recipe)
        }
    }
    return recipesMatched;
}

/**
 * Check if a recipe match with the searched string
 * @param {array} recipes - array of objects
 * @param {string} request
 * @returns {array} - array of objects (corresponding recipes)
 */
function matchContent(recipes, request) {
    let recipesMatched = [];
    for (let recipe of recipes) {
        if (recipe.name.toLowerCase().includes(request) 
            || recipe.description.toLowerCase().includes(request)
            || recipe.ingredients
                .filter(ingredient => ingredient.ingredient
                    .toLowerCase().includes(request)).length > 0) {
            recipesMatched.push(recipe)
        }
    }
    return recipesMatched;
}
