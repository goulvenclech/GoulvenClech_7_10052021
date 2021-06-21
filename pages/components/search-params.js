/**
 * An imput used for the search
 */
 export class SearchParams extends HTMLElement {
    constructor() {
        super();
        this.lastSearch = [];
    } 
    
    /**
     * Insert a input template used by the search
     */
    connectedCallback () {
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="searchParams">
                
            </div>
      `;
        this.appendChild(template.content);
        this.render();
    }

    render() {
        this.lastSearch = getLastSearch();
        this.querySelector("div").innerHTML = "";
        if(this.lastSearch[2]) {
            let ingredients = this.lastSearch[2];
            ingredients.forEach(ingredient => {
                this.querySelector("div").insertAdjacentHTML('beforeEnd', `
                <span class="ingredient">` + ingredient + `</span>
                `)
            });
        }
        if(this.lastSearch[0]) {
            this.querySelector("div").insertAdjacentHTML('beforeEnd', `
            <span class="appliance">` + this.lastSearch[0] + `</span>
            `)
        }
        if(this.lastSearch[1]) {
            this.querySelector("div").insertAdjacentHTML('beforeEnd', `
            <span class="ustensil">` + this.lastSearch[1] + `</span>
            `)
        }
        this.listeners();
    }

    listeners() {
        window.addEventListener("DOMContentLoaded", () => {
            console.log("Bouh")
            document.querySelectorAll("ul.ingredients li").forEach(ingredient => {
                ingredient.addEventListener('click', () => {
                    this.render();
                }) 
            })
            document.querySelectorAll("ul.appliances li").forEach(appliance => {
                appliance.addEventListener('click', () => {
                    this.render();
                }) 
            })
            document.querySelectorAll("ul.ustensils li").forEach(ustensil => {
                ustensil.addEventListener('click', () => {
                    this.render();
                }) 
            })
        })
    }
}

// Import the search function
import {getLastSearch} from "../../search.js"