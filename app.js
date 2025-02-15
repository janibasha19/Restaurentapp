const mealfinder = document.getElementById('meal_name')

// home
// mealfinder.addEventListener('click', () =>{
//   categories_data()
// })

// categories-api
async function categories_data() {
  let api_data = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
  let {categories} = await api_data.json()
  console.log(categories);

let categorycontainer = document.getElementById('category')
 categories.map(item => {
  categorycontainer.innerHTML += `
      <div class="category_cards">
          <p class="meal_name">${item.strCategory}</p>
          <img src="${item.strCategoryThumb}" alt="${item.strCategory}">
      </div>
     `;
});
}
categories_data()

// menubar
function setmenu() {
  const menubar = document.getElementById('menu_bar')
  const menu_list = document.getElementById('menu_list')
  const categorycontainer = document.getElementById('category')
  const mealContainer = document.getElementById('mealsContainer')

// menubtn
  menubar.addEventListener('click', () =>{
    menu_list.style.display = menu_list.style.display === 'block' ? 'none' : 'block  ';
  })

  menu_list.addEventListener('click', (onclick) =>{

   if (onclick.target.tagName === 'LI') {
    const selectedCategory = onclick.target.getAttribute('data-category');
    MealsCategory(selectedCategory);
    menu_list.style.display = 'none';
    categorycontainer.style.display = 'none';
    mealContainer.style.display = 'flex';
    mealContainer.style.flexWrap = 'wrap'
 }
  })
}

setmenu()


// meal-api

async function MealsCategory(category) {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  const data = await response.json();
  displayMeals(data.meals);
}

function displayMeals(meals) {
  const mealsContainer = document.getElementById('mealsContainer');
  mealsContainer.innerHTML = meals.map(meal => `
      <div class="meal-card">
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h3>${meal.strMeal}</h3>
      </div>
  `)
}
