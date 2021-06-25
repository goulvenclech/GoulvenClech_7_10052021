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
            <div class="mx-auto p-4 max-w-screen-xl">
                <h1>
                    <img class="block mx-auto max-h-24 mt-8"
                    src="` + gigaLogo + `">
                    </img>
                </h1>
                <search-bar></search-bar>
                <search-params></search-params>
                <section class="my-4 flex flex-col md:flex-row gap-4 md:gap-6">
                    <ingredients-select></ingredients-select>
                    <appliance-select></appliance-select>
                    <ustensil-select></ustensil-select>
                </section>
                <search-result></search-result>
            </div>
      `;
        this.appendChild(template.content);
    }
}

import gigaLogo from "../assets/logo.png";