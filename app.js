// import dependencies
import "tailwindcss/tailwind.css"

// import pages
import {IndexPage} from "./pages/index.js"
window.customElements.define("index-page", IndexPage);
// import components


// Open the index page
document.body.insertAdjacentHTML("afterbegin", "<index-page></index-page>");
