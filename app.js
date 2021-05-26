// import dependencies
import "tailwindcss/tailwind.css"

// import pages
import {IndexPage} from "./pages/index.js"
window.customElements.define("index-page", IndexPage);
// import all the components
import {ApplianceSelect} from "./pages/components/appliance-select.js"
window.customElements.define("appliance-select", ApplianceSelect);
import {UstensilSelect} from "./pages/components/ustensil-select.js"
window.customElements.define("ustensil-select", UstensilSelect);


// Open the index page
document.body.insertAdjacentHTML("afterbegin", "<index-page></index-page>");
