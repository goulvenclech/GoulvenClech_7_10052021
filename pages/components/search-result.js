/**
 * An imput used for making a new search then display the results
 * 
 * WARNING
 * This component contain a huge amount of logic needed for the
 * front end. [NEED MORE DOCUMENTATION HERE] 
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
            <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            </section>
      `;
        this.appendChild(template.content);
        this.render();
        this.listeners();
        this.observer();
    }

    /**
     * Create a card for each recipe in results
     */
    render() {
        this.results.forEach(recipe => {
            this.querySelector("section").insertAdjacentHTML('afterBegin', `
            <article class="bg-gray-300 overflow-hidden overflow-ellipsis
                        rounded-md" tabindex="0">
                <div class="h-40 overflow-hidden">
                    <img src="` + placeholder + `"
                        class="object-cover">
                    </img>
                </div>
                <div class="p-4">
                    <div class="flex">
                        <h3 class="text-xl flex-1 gap-4">`
                            + recipe.name  +
                        `<h3>
                        <p class="text-xl">`
                            + recipe.time +
                        ` min</p>
                    </div>
                    <div class="flex mt-4 gap-4">
                        <ul class="w-1/2 ingredients text-sm">
                        </ul>
                        <p class="w-1/2 max-h-40 text-sm">`
                            + recipe.description.substr(0, 200) +
                        `...</p>
                    </div>
                </div>
            </article>
            `)
            /**
             * Insert every ingredients in the recipe card
             */
            recipe.ingredients.forEach(ingredient => this.querySelector(".ingredients").insertAdjacentHTML("beforeend",
                `<li><span class="font-bold">` 
                    + ingredient.ingredient + 
                    ":</span>  " + ingredient.quantity + " " + (ingredient.unit || "") + "  " + 
                `</li>`))
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
        document.querySelector("input.ingredient").addEventListener("change", () => {
            document.querySelectorAll("ul.ingredients li").forEach(ingredient => {
                ingredient.addEventListener('click', event => {
                    this.ingredients.push(event.target.innerHTML);
                    this.querySearch();
                }) 
            })
        })
        document.querySelectorAll("ul.appliances li").forEach(appliance => {
            appliance.addEventListener('click', event => {
                this.appliance = event.target.innerHTML;
                this.querySearch();
            }) 
        })
        document.querySelector("input.appliance").addEventListener("change", () => {
            document.querySelectorAll("ul.appliances li").forEach(appliance => {
                appliance.addEventListener('click', event => {
                    this.appliance = event.target.innerHTML;
                    this.querySearch();
                }) 
            })
        })
        document.querySelectorAll("ul.ustensils li").forEach(ustensil => {
            ustensil.addEventListener('click', event => {
                this.ustensil = event.target.innerHTML;
                this.querySearch();
            }) 
        })
        document.querySelector("input.ustensil").addEventListener("change", () => {
            document.querySelectorAll("ul.ustensils li").forEach(ustensil => {
                ustensil.addEventListener('click', event => {
                    this.ustensil = event.target.innerHTML;
                    this.querySearch();
                }) 
            })
        })
    }

    /**
     * mutation observer, to survey if the user delete a params in <search-params>
     */
    observer() {
        let observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(addedNode => {
                    if(addedNode.tagName == "SPAN") {
                        addedNode.addEventListener("click", () => {
                            // Delete the params and make a new search
                            if(addedNode.classList.contains("ingredient")){
                                this.ingredients = this.ingredients.filter(ingredient => ingredient.toLowerCase() !== addedNode.innerHTML.toLowerCase());
                            }else if(addedNode.classList.contains("ustensil")) {
                                this.ustensil = "";
                            }else if(addedNode.classList.contains("appliance")){
                                this.appliance = "";
                            }
                            this.querySearch();
                            // Remove the param on the <search-params>
                            addedNode.remove();
                        })
                    }
                })
            })
        });
        observer.observe(document.querySelector(".searchParams"), {childList: true});
    }

    /**
     * Make a new result based on the user's request, then display the results
     */
     querySearch() {
        // clean old results
        this.querySelectorAll("article").forEach(element => {element.remove()})
        // make a new search, then display all the result's recipes
        this.results = search(this.request, this.appliance, this.ustensil, this.ingredients)
        this.render()
    }
}


// Import the search function
import {search} from "../../search.js"
// Import the placeholder image
import placeholder from "../../assets/placeholder.jpg"
