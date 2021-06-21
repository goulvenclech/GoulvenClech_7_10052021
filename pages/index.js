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
                <search-bar></search-bar>
                <search-params></search-params>
                <section class="flex gap-6">
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

