/**
 * An imput used for making a new search then display the results
 */
 export class SearchResult extends HTMLElement {
    constructor() {
        super();
        this.results = search("Coc", "BLENDER", "", []);
    } 
    
    /**
     * Insert a input template used by the search
     */
    connectedCallback () {
        const template = document.createElement('template');
        template.innerHTML = `
            <section class="grid grid-cols-2 lg:grid-cols-3 gap-4">
            </section>
      `;
        this.appendChild(template.content);
        this.render();
        this.listeners();
    }

    render() {
        this.results.forEach(recipe => {
            this.querySelector("section").insertAdjacentHTML('afterBegin', `
            <article class="bg-gray-400 p-4 h-44 overflow-hidden overflow-ellipsis
                        rounded-md">
                <h3 class="font-bold">`
                    + recipe.name  +
                `<h3>
                <p>`
                    + recipe.description +
                `</p>
            </article>
            `)
        })
    }

    /**
     * Add listeners on the differents menu and on the search bar
     * If the user make a new search, quall query
     */
    listeners() {
        document.querySelector("input").addEventListener('input', input => {
            if(input.target.value.length > 2) {
                this.querySearch(input.target.value);
            }else {
                this.querySearch("");
            }
        })
        document.querySelectorAll("ul.ingredients li").forEach(ingredient => {
            ingredient.addEventListener('click', event => {
                event.stopPropagation();
            }) 
        })
    }

    /**
     * Make a new result based on the user's request, then display the results
     * @param {string} request - the search typed by the user in the search bar
     */
     querySearch(request) {
        // clean old results
        this.querySelectorAll("article").forEach(element => {element.remove()})
        // get the menus values
        let appliance = "";
        let ustensil = "";
        let ingredients = [];
        // make a new search, then display all the result's recipes
        this.results = search(request, appliance, ustensil, ingredients)
        this.render()
    }
}

// Import the search function
import {search} from "../../searchB.js"
