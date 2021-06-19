/**
 * A select menu for recipes using a specific ustensil
 */
 export class UstensilSelect extends HTMLElement {
    constructor() {
        super();
        this.allUstensils = new Set();
    } 
    
    /**
     * Insert a empty select template then call render()
     */
    connectedCallback () {
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="relative my-4">
                <input type="text" placeholder="Rechercher un ustensil..."
                    class="placeholder bg-red-400 text-transparent placeholder-transparent font-bold rounded-md focus:rounded-b-none
                    leading-loose outline-none my-0 w-48 focus:w-96 lg:focus:w-144 focus:text-white focus:placeholder-red-200 transition-width duration-200">
                </input>
                <label class="absolute left-0 text-white font-bold py-4 px-4 leading-loose pointer-events-none">
                    Ustensiles
                </label>
                <ul class="ustensils absolute top-14 flex flex-row flex-wrap bg-red-400 font-bold text-white
                        w-48 h-0 rounded-b-md transition-all duration-200 overflow-hidden">
                </ul>
            </div>
        `;
        this.appendChild(template.content);
        this.queryUstensil();
        this.render("");
        this.test();
        this.listenInput();
    }

    test() {
        this.querySelector("input").addEventListener("focus", () => {
            this.querySelector("input").classList.add("focus");
        })
        window.addEventListener("click", event => {
            if (event.target.parentElement !== this.querySelector("div")) {
                this.querySelector("input").classList.remove("focus")
            }
        })
        window.addEventListener('keyup', event => { 
            if(event.key == "Tab") {
                if (document.activeElement !== this.querySelector("input")) {
                    this.querySelector("input").classList.remove("focus")
                }
            }
        })
    }

    /**
     * 
     */
     queryUstensil() {
        data.recipes.forEach(recipe => recipe.ustensils.forEach(ustensil => this.allUstensils.add(ustensil)));
    }

    /**
     * 
     */
    render(request) {
        this.querySelectorAll("li").forEach(element => {element.remove()})
        let ustensils = [];
        if(request === "") { 
            ustensils = [...this.allUstensils].sort().slice(0,30)
            this.querySelector("ul").classList.remove("search");
        }
        else {
            ustensils = [...this.allUstensils].sort().filter(ustensil => ustensil.toLowerCase().includes(request.toLowerCase())).slice(0,30);
            this.querySelector("ul").classList.add("search");
        }
        ustensils.forEach(ustensil => {
            this.querySelector("ul").insertAdjacentHTML('beforeend', `
                <li class="leading-normal w-48 py-2 px-4 overflow-ellipsis whitespace-nowrap overflow-hidden
                        cursor-pointer hover:bg-red-600">`
                        + ustensil + 
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
