/**
 * SEARCH ALGORITHM 2
 * Here is all the logic to process a user request and return a list of corresponding recipes
 * 
 * In this algorithm, the data pretreatment makes the readability and maintainability much better:
 * -> in the event of a change in the DB structure, only the pretreatment needs to be changed
 * -> the functions are shorter and more readable
 *
 * I also used a filter() method rather than for loops, which makes the code a lot more logical. 
 * The only flaw is the fact that the pretreatment must be canceled before returning the results.
 */

// Import database with all the recipes
import rawData from "./assets/data/data.json"
const recipes = pretreatData(rawData);
// store last results
let lastSearch = [];
export function getLastSearch() {
    return lastSearch;
}

/**
 * Transform the raw data from the JSON to a clean object array
 * @param {object} rawData - all the raw recipes from the JSON
 * @returns {object} - all the recipes but make them ✨ clean ✨
 */
function pretreatData(rawData) {
    let data = [];
    rawData.recipes.forEach(recipe => {
        data.push({
            "name": recipe.name.toLowerCase(),
            "description": recipe.description.toLowerCase(),
            "appliance": recipe.appliance.toLowerCase(),
            "ingredients": [...recipe.ingredients.map(ingredient => {return ingredient.ingredient.toLowerCase()})],
            "ustensils": recipe.ustensils,
            "raw": recipe,
        })
    })
    return data;
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
     // lower case all the request and params
    request = request.toLowerCase();
    appliance = appliance.toLowerCase();
    ustensil = ustensil.toLowerCase();
    ingredients = ingredients.map(ingredient => ingredient.toLowerCase());
    // toLowerCase() all the request
    let preResult = recipes.filter(recipe =>
        matchAppliance(recipe, appliance)
        && matchUstensils(recipe, ustensil)
        && matchTagsIngredients(recipe, ingredients)
        && ( matchName(recipe, request) || matchDescriptions(recipe, request) || matchIngredients(recipe, request))
    );
    // Cancels pretreatment to recover originals objects
    let result = preResult.map(x => x = x.raw)
    console.timeEnd("search");
    //save the result
    lastSearch = [appliance, ustensil, ingredients, result];
    return result;
}

/**
 * Check if a recipe match with the requested appliance
 * @param {object} recipe - recipe currently looked
 * @param {string} appliance
 * @returns {boolean} - true if match
 */
function matchAppliance(recipe, appliance) {
    return recipe.appliance.indexOf(appliance) !== -1;
}

/**
 * Check if a recipe match with the requested ustensil,
 * @param {object} recipe - recipe currently looked
 * @param {string} ustensil 
 * @returns {boolean} - true if match
 */
function matchUstensils(recipe, ustensil) {
    //  if no ustensil requested return true
     return ustensil == 0 ? true : recipe.ustensils.indexOf(ustensil) !== -1;
}

/**
 * Check if a recipe match with the all the tagged ingredients
 * @param {object} recipe - recipe currently looked
 * @param {array} ingredients 
 * @returns {boolean} - true if match
 */
 function matchTagsIngredients(recipe, ingredients) {
    return ingredients.every(ingredient => recipe.ingredients.includes(ingredient));
}

/**
 * Check if a recipe's name match with the request
 * @param {object} recipe - recipe currently looked
 * @param {string} request 
 * @returns {boolean} - true if match
 */
function matchName(recipe, request) {
    return recipe.name.includes(request);
}

/**
 * Check if a recipe's description match with the request
 * @param {object} recipe - recipe currently looked
 * @param {string} request 
 * @returns {boolean} - true if match
 */
function matchDescriptions(recipe, request) {
    return recipe.description.includes(request);
}

/**
 * Check if a recipe's list of ingredients match with the request
 * @param {object} recipe - recipe currently looked
 * @param {string} request 
 * @returns {boolean} - true if match
 */
function matchIngredients(recipe, request) {
    return recipe.ingredients.filter(ingredient => ingredient.includes(request)).length > 0;
}
