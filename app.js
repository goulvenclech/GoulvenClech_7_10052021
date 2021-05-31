// import dependencies
import "tailwindcss/tailwind.css"
import "./assets/style/main.css"

// import algorithms
import "./research.js"
import "./researchB.js"

// import pages
import {IndexPage} from "./pages/index.js"
window.customElements.define("index-page", IndexPage);
// import all the components
import {ApplianceSelect} from "./pages/components/appliance-select.js"
window.customElements.define("appliance-select", ApplianceSelect);
import {IngredientsSelect} from "./pages/components/ingredients-select.js"
window.customElements.define("ingredients-select", IngredientsSelect);
import {SearchBar} from "./pages/components/search-bar.js"
window.customElements.define("search-bar", SearchBar);
import {SearchResult} from "./pages/components/search-result.js"
window.customElements.define("search-result", SearchResult);
import {UstensilSelect} from "./pages/components/ustensil-select.js"
window.customElements.define("ustensil-select", UstensilSelect);

// Open the index page
document.body.insertAdjacentHTML("afterbegin", "<index-page></index-page>");
