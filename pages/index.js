/**
 * Home page of the application
 */
 export class IndexPage extends HTMLElement {
    constructor() {
        super();
    } 
    
    /**
     * Insert the page template
     */
    connectedCallback () {
        const template = document.createElement('template');
        template.innerHTML = `
            <div class="m-12">
            <h1 class="text-yellow-500 font-semibold text-4xl">
                Les Petits Plats
            </h1>
            <p>Ca va faire de l'algo ici...</p>
            <section class="flex gap-8">
                <div class="w-72">
                    <input type="text" class="my-4 border border-gray-500 p-2 border-1 rounded-sm w-72">
                    </input>
                    <ul>
                    </ul>
                </div>
                <div>
                    <select type="text" class="appliance bg-white border border-gray-500 border-1 my-4 p-2 rounded-sm">
                        <option value="">-- Appareils --</option>
                    </select>
                </div>
                <div>
                    <select type="text" class="ustensils bg-white border border-gray-500 border-1 my-4 p-2 rounded-sm">
                        <option value="">-- Ustensiles --</option>
                    </select>
                </div>
            </section>
            </div>
      `;
        this.appendChild(template.content);
        this.applianceSelect();
        this.ustensilSelect();
        this.listener();
    }

    listener() {
        this.querySelector("input").addEventListener('input', input => {
            this.queryRequest(input.target.value);
        })
        this.querySelector(".appliance").addEventListener('change', () => {
            this.queryRequest(this.querySelector("input").value);
        })
        this.querySelector(".ustensils").addEventListener('change', () => {
            this.queryRequest(this.querySelector("input").value);
        })
    }

    queryRequest(request) {
        if(request.length >= 3) {
            document.querySelectorAll("li").forEach(element => {element.remove()})
            let appliance = this.querySelector(".appliance").value;
            let ustensil = this.querySelector(".ustensils").value;
            research(request, appliance, ustensil).forEach(recipe => {
                document.querySelector("ul").insertAdjacentHTML('afterBegin', `
                <li class="list-disc ml-5">`+ recipe.name  +`</li>
                `)
            })
        }else {
            document.querySelectorAll("li").forEach(element => {element.remove()});
        }
    }

    applianceSelect() {
        let allAppliance = new Set([]);
        data.recipes.forEach(recipe => allAppliance.add(recipe.appliance));
        allAppliance.forEach(appliance => {
            this.querySelector(".appliance option").insertAdjacentHTML('afterend', `
                <option value="` + appliance + `">` + appliance + `</option>
            `)
        })
    }

    ustensilSelect() {
        let allUstensils = new Set([]);
        data.recipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensil => allUstensils.add(ustensil));
        }) 
        allUstensils.forEach(ustensil => {
            this.querySelector(".ustensils option").insertAdjacentHTML('afterend', `
                <option value="` + ustensil + `">` + ustensil + `</option>
            `)
        })
    }
}


import {research} from "../research.js"
import data from "../assets/data/data.json"
