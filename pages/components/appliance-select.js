/**
 * A select menu for recipes using a specific appliance
 */
 export class ApplianceSelect extends HTMLElement {
    constructor() {
        super();
    } 
    
    /**
     * Insert a empty select template then call render()
     */
    connectedCallback () {
        const template = document.createElement('template');
        template.innerHTML = `
            <select type="text" class="appliance bg-white border border-gray-500 border-1 my-4 p-2 rounded-sm">
                <option value="">-- Appareils --</option>
            </select>
      `;
        this.appendChild(template.content);
        this.render();
    }

    /**
     * Check all the recipes to register all the appliance possible in the DB
     * Use Set([]) to avoid duplicate values.
     * Then fill the selec menu with all the differents options.
     */
    render() {
        let allAppliance = new Set([]);
        data.recipes.forEach(recipe => allAppliance.add(recipe.appliance));
        allAppliance.forEach(appliance => {
            this.querySelector(".appliance option").insertAdjacentHTML('afterend', `
                <option value="` + appliance + `">` + appliance + `</option>
            `)
        })
    }
}

// Import the DB with all the recipes
import data from "../../assets/data/data.json"
