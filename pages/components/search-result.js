/**
 * An imput used for making a new search then display the results
 */
 export class SearchResult extends HTMLElement {
    constructor() {
        super();
        this.results = search("", "", "", []);
        this.request = "";
        this.appliance = "";
        this.ustensil = "";
        this.ingredients = [];
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
                // blabla
                this.request = document.querySelector("input").value;
                this.querySearch();
            }else {
                // blabla
                this.request = "";
                this.querySearch();
            }
        })
        document.querySelectorAll("ul.ingredients li").forEach(ingredient => {
            ingredient.addEventListener('click', event => {
                this.ingredients.push(event.target.innerHTML);
                this.querySearch();
            }) 
        })
        document.querySelectorAll("ul.appliances li").forEach(appliance => {
            appliance.addEventListener('click', event => {
                this.appliance = event.target.innerHTML;
                this.querySearch();
            }) 
        })
        document.querySelectorAll("ul.ustensils li").forEach(ustensil => {
            ustensil.addEventListener('click', event => {
                this.ustensil = event.target.innerHTML;
                this.querySearch();
            }) 
        })
    }

    /**
     * Make a new result based on the user's request, then display the results
     */
     querySearch() {
        // clean old results
        this.querySelectorAll("article").forEach(element => {element.remove()})
        // make a new search, then display all the result's recipes
        console.log(this.request + ", " + this.appliance + ", " + this.ustensil + ", [" + this.ingredients + "]")
        this.results = search(this.request, this.appliance, this.ustensil, this.ingredients)
        this.render()
    }
}

// Import the search function
import {search} from "../../search.js"
