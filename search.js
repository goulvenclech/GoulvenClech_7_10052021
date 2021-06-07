/**
 * SEARCH ALGORITHM 1
 * Here is all the logic to process a user request and return a list of corresponding recipes
 * This first algorithm has not pre-treatment of the data. He query the all DB, filter() on it
 * and try to match with the request.
 */

// Import database with all the recipes
import data from "./assets/data/data.json"
// store last results
let lestSearchResult = [];

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
    recipes = matchContent(recipes, request.toLowerCase());
    //save the result
    lestSearchResult = recipes;
    console.timeEnd("search");
    return recipes;
}

/**
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
 */
function matchUstensils(recipes, ustensil) {
    let recipesMatched = [];
    console.log(ustensil)
    for (let recipe of recipes) {
        if (ustensil == "" || recipe.ustensils.filter(usten => usten.includes(ustensil)).length > 0) {
            recipesMatched.push(recipe)
        }
    }
    return recipesMatched;
}

/**
 */
 function matchIngredients(recipe, ingredients) {
    
}

/**
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
