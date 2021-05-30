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
            <div class="relative my-4 transition-all duration-300">
                <input type="text" placeholder="Rechercher un ingrédient..."
                    class="placeholder bg-blue-500 text-transparent placeholder-transparent font-bold rounded-sm focus:rounded-b-none
                    leading-loose outline-none my-0 w-48 focus:w-96 focus:text-white focus:placeholder-blue-200 transition-all duration-300">
                </input>
                <label class="absolute left-0 text-white font-bold p-2 leading-loose pointer-events-none">
                    Ingrédients
                </label>
                <ul class="absolute flex flex-row flex-wrap justify-between bg-blue-500 font-bold text-white
                        w-48 h-0 rounded-b-sm transition-all duration-300 overflow-hidden">
                </ul>
            </div>
      `;
        this.appendChild(template.content);
        this.queryIngredients();
        this.render("");
        this.listenInput();
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
        if(request === "") {
            [...this.allIngredients].sort().forEach(ingredient => {
                this.querySelector("ul").insertAdjacentHTML('beforeend', `
                    <li class="leading-normal w-44 p-2 overflow-ellipsis whitespace-nowrap overflow-hidden
                            cursor-pointer hover:bg-blue-700">`
                            + ingredient + 
                    `</li>
                `)
            })
        } else {
            let ingredients = [...this.allIngredients].sort().filter(ingredient => ingredient.includes(request));
            ingredients.forEach(ingredient => {
                this.querySelector("ul").insertAdjacentHTML('beforeend', `
                    <li class="leading-normal w-44 p-2 overflow-ellipsis whitespace-nowrap overflow-hidden
                            cursor-pointer hover:bg-blue-700">`
                            + ingredient + 
                    `</li>
                `)
            })
        }
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
