/**
 * A select menu for recipes using a specific appliance
 */
 export class IngredientsSelect extends HTMLElement {
    constructor() {
        super();
        this.allIngredients = new Set();
    } 
    
    /**
     * Insert a empty select template then call render()
     */
    connectedCallback () {
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="relative my-4">
                <input type="text" placeholder="Rechercher un ingrédient..."
                    class="ingredient placeholder bg-blue-500 text-transparent placeholder-transparent font-bold rounded-md focus:rounded-b-none
                    leading-loose outline-none my-0 w-48 focus:w-96 lg:focus:w-144 focus:text-white focus:placeholder-blue-200 transition-width duration-200">
                </input>
                <label class="absolute left-0 text-white font-bold py-4 px-4 leading-loose pointer-events-none">
                    Ingrédients
                </label>
                <ul class="ingredients absolute top-14 flex flex-row flex-wrap bg-blue-500 font-bold text-white
                        w-48 h-0 rounded-b-md transition-all duration-200 overflow-hidden">
                </ul>
            </div>
      `;
        this.appendChild(template.content);
        this.queryIngredients();
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
    queryIngredients() {
        data.recipes.forEach(recipe => recipe.ingredients.forEach(ingredient => this.allIngredients.add(ingredient.ingredient)))
    }

    /**
     * 
     */
    render(request) {
        this.querySelectorAll("li").forEach(element => {element.remove()})
        let ingredients = [];
        if(request === "") { 
            ingredients = [...this.allIngredients].sort().slice(0,30);
            this.querySelector("ul").classList.remove("search");
        }
        else {
            ingredients = [...this.allIngredients].sort().filter(ingredient => ingredient.toLowerCase().includes(request.toLowerCase())).slice(0,30);
            this.querySelector("ul").classList.add("search");
        }
        ingredients.forEach(ingredient => {
            this.querySelector("ul").insertAdjacentHTML('beforeend', `
                <li class="leading-normal w-48 py-2 px-4 overflow-ellipsis whitespace-nowrap overflow-hidden
                        cursor-pointer hover:bg-blue-700">`
                        + ingredient + 
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
