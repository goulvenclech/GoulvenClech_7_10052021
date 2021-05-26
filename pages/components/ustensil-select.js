/**
 * A select menu for recipes using a specific ustensil
 */
 export class UstensilSelect extends HTMLElement {
    constructor() {
        super();
    } 
    
    /**
     * Insert a empty select template then call render()
     */
    connectedCallback () {
        const template = document.createElement('template');
        template.innerHTML = `
            <select type="text" class="ustensils bg-white border border-gray-500 border-1 my-4 p-2 rounded-sm">
                <option value="">-- Ustensiles --</option>
            </select>
      `;
        this.appendChild(template.content);
        this.render();
    }

    /**
     * Check all the recipes to register all the ustensils possible in the DB
     * Use Set([]) to avoid duplicate values.
     * Then fill the selec menu with all the differents options.
     */
    render() {
        let allUstensils = new Set([]);
        data.recipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => allUstensils.add(ustensil));
        }) 
        allUstensils.forEach(ustensil => {
            this.querySelector(".ustensils option").insertAdjacentHTML('afterend', `
                <option value="` + ustensil + `">` + ustensil + `</option>
            `)
        })
    }
}

// Import the DB with all the recipes
import data from "../../assets/data/data.json"
