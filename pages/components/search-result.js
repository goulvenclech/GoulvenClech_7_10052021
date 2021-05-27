/**
 * An imput used for making a new search then display the results
 */
 export class SearchResult extends HTMLElement {
    constructor() {
        super();
    } 
    
    /**
     * Insert a input template used by the research
     */
    connectedCallback () {
        const template = document.createElement('template');
        template.innerHTML = `
            <ul>
            </ul>
      `;
        this.appendChild(template.content);
        this.listeners();
    }

    /**
     * Add listeners on the differents menu and on the search bar
     * If the user make a new search, quall query
     */
    listeners() {
        document.querySelector("input").addEventListener('input', input => {
            this.querySearch(input.target.value);
        })
        document.querySelector(".appliance").addEventListener('change', () => {
            this.querySearch(document.querySelector("input").value);
        })
        document.querySelector(".ustensils").addEventListener('change', () => {
            this.querySearch(document.querySelector("input").value);
        })
    }

    /**
     * Make a new result based on the user's request, then display the results
     * @param {string} request - the search typed by the user in the search bar
     */
     querySearch(request) {
        if(request.length >= 3) {
            // clean old results
            this.querySelectorAll("li").forEach(element => {element.remove()})
            // get the menus values
            let appliance = document.querySelector(".appliance").value;
            let ustensil = document.querySelector(".ustensils").value;
            // make a new search, then display all the result's recipes
            research(request, appliance, ustensil).forEach(recipe => {
                this.querySelector("ul").insertAdjacentHTML('afterBegin', `
                <li class="list-disc ml-5">`+ recipe.name  +`</li>
                `)
            })
        }else {
            // clean old results
            this.querySelectorAll("li").forEach(element => {element.remove()});
        }
    }
}

// Import the research function
import {research} from "../../research.js"
