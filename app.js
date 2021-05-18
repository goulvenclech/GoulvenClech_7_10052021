// import dependencies
import "tailwindcss/tailwind.css"
import data from "./assets/data/data.json"

document.body.insertAdjacentHTML('afterbegin', `
  <div class="m-12">
    <h1 class="text-yellow-500 font-semibold text-4xl">
      Les Petits Plats
    </h1>
    <p>Ca va faire de l'algo ici...</p>
    <input type="text" class="my-4 border border-gray-500 p-2 border-1 rounded-sm">
    </input>
    <ul>
    </ul>
  </div>
`);

document.querySelector("input").addEventListener('input', function(event) {
  document.querySelectorAll("li").forEach(element => {element.remove()});;
    data.recipes.forEach(recipe => {
      if (recipe.name.toLowerCase().includes(event.target.value.toLowerCase())) {
        document.querySelector("ul").insertAdjacentHTML('afterBegin', `
          <li class="list-disc ml-5">`+ recipe.name  +`</li>
        `)
      }
    })
})
