/**
 * A select menu for recipes using a specific appliance
 */
 export class ApplianceSelect extends HTMLElement {
    constructor() {
        super();
        this.allAppliances = new Set();
    } 
    
    /**
     * Insert a empty select template then call render()
     */
    connectedCallback () {
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="relative my-4">
                <input type="text" placeholder="Rechercher un appareil..."
                    class="appliance placeholder bg-green-400 text-transparent placeholder-transparent font-bold rounded-md focus:rounded-b-none
                    leading-loose outline-none my-0 w-48 focus:w-96 lg:focus:w-144 focus:text-white focus:placeholder-green-200 transition-width duration-200">
                </input>
                <label class="absolute left-0 text-white font-bold py-4 px-4 leading-loose pointer-events-none">
                    Appareils
                </label>
                <ul class="appliances absolute top-14 flex flex-row flex-wrap bg-green-400 font-bold text-white
                        w-48 h-0 rounded-b-md transition-all duration-200 overflow-hidden">
                </ul>
            </div>
        `;
        this.appendChild(template.content);
        this.queryAppliance();
        this.render("");
        this.listenInput();
    }

    /**
     * 
     */
     queryAppliance() {
        data.recipes.forEach(recipe => this.allAppliances.add(recipe.appliance));
    }

    /**
     * 
     */
    render(request) {
        this.querySelectorAll("li").forEach(element => {element.remove()})
        let appliances = [];
        if(request === "") { 
            appliances = [...this.allAppliances].sort().slice(0,30)
            this.querySelector("ul").classList.remove("search");
        }
        else {
            appliances = [...this.allAppliances].sort().filter(appliance => appliance.toLowerCase().includes(request.toLowerCase())).slice(0,30);
            this.querySelector("ul").classList.add("search");
        }
        appliances.forEach(appliance => {
            this.querySelector("ul").insertAdjacentHTML('beforeend', `
                <li class="leading-normal w-48 py-2 px-4 overflow-ellipsis whitespace-nowrap overflow-hidden
                        cursor-pointer hover:bg-green-700">`
                        + appliance + 
                `</li>
            `)
        })
    }

    /**
     * 
     */
    listenInput() {
        this.querySelector("input").addEventListener('input', input => {
            this.render(input.target.value);
        })
    }
}

// Import the DB with all the recipes
import data from "../../assets/data/data.json"
