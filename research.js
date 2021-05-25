/**
 * RESEARCH ALGORITHM 1
 * Here is all the logic to process a user request and return a list of corresponding recipes
 * This first algorithm has not pre-treatment of the data. He query the all DB, filter() on it
 * and try to match with the request.
 */

// Import database with all the recipes
import data from "./assets/data/data.json"

/**
 * Take an user request, return a list of corresponding recipes
 * @param {string} request - text typed by the user in the input field
 * @param {string} appliance - value of the appliance <select>
 * @param {string} ustensil - value of the ustensil <select>
 * @returns {array} - array of objects (corresponding recipes)
 */
export function research(request, appliance, ustensil) {
    return data.recipes.filter(recipe => 
        matchAppliance(recipe, appliance) 
        && matchUstensils(recipe, ustensil) 
        && ( matchName(recipe, request) || matchDescriptions(recipe, request) || matchIngredients(recipe, request))
    );
}

/**
 * Check if a recipe match with the requested appliance
 * @param {object} recipe - recipe currently looked
 * @param {string} appliance
 * @returns {boolean} - true if match
 */
function matchAppliance(recipe, appliance) {
    return recipe.appliance.toLowerCase().includes(appliance.toLowerCase());
}

/**
 * Check if a recipe match with the requested ustensil
 * @param {object} recipe - recipe currently looked
 * @param {string} ustensil 
 * @returns {boolean} - true if match
 */
function matchUstensils(recipe, ustensil) {
    return recipe.ustensils.filter(recipeUstensil => recipeUstensil.toLowerCase().includes(ustensil.toLowerCase())).length > 0;
}

/**
 * Check if a recipe's name match with the request
 * @param {object} recipe - recipe currently looked
 * @param {string} request 
 * @returns {boolean} - true if match
 */
function matchName(recipe, request) {
    return recipe.name.toLowerCase().includes(request.toLowerCase());
}

/**
 * Check if a recipe's description match with the request
 * @param {object} recipe - recipe currently looked
 * @param {string} request 
 * @returns {boolean} - true if match
 */
function matchDescriptions(recipe, request) {
    return recipe.description.toLowerCase().includes(request.toLowerCase());
}

/**
 * Check if a recipe's list of ingredients match with the request
 * @param {object} recipe - recipe currently looked
 * @param {string} request 
 * @returns {boolean} - true if match
 */
function matchIngredients(recipe, request) {
    return recipe.ingredients.filter(ingredient => ingredient.ingredient.toLowerCase().includes(request.toLowerCase())).length > 0;
}
