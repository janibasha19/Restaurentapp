document.addEventListener("DOMContentLoaded", () => {
  const menubar = document.getElementById('menu_bar');
  const menuToggle = document.getElementById('menu_toggle');
  const mealContainer = document.getElementById('meal_container');

  // Check if elements exist before adding event listeners
  if (menuToggle) {
      menuToggle.addEventListener('click', () => {
          menubar.classList.toggle('show_menu');
      });
  }

  // Fetch categories and display them in the menu
  async function Categories_data() {
      let apidata = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
      let { categories } = await apidata.json();
      
      let container = document.getElementById('categories');
      if (!container) return; // Prevent errors if the container doesn't exist

      categories.forEach(items => {  
          // Create category card
          let categoryCard = document.createElement('div');
          categoryCard.classList.add('category_cards');

          categoryCard.innerHTML = `
              <p class="meal_name">${items.strCategory}</p>
              <img src="${items.strCategoryThumb}" alt="${items.strCategory}">
          `;

          // Add click event to fetch meals
          categoryCard.addEventListener('click', () => {
              fetchMealsByCategory(items.strCategory);
          });

          container.appendChild(categoryCard);
          
          // Also add categories to the menu bar
          let menuItem = document.createElement('li');
          menuItem.classList.add('menu_item');
          menuItem.textContent = items.strCategory;

          menuItem.addEventListener('click', () => {
              fetchMealsByCategory(items.strCategory);
              menubar.classList.remove('show_menu'); // Hide menu after clicking
          });

          menubar.appendChild(menuItem);
      });
  }

  // Fetch and display meals for the selected category
  async function fetchMealsByCategory(category) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    let { meals } = await response.json();
    console.log(meals);

    const mealContainer = document.getElementById('meal_container');
    if (!mealContainer) return;
    
    mealContainer.innerHTML = ""; 

    if (!meals) {
      mealContainer.innerHTML = "<p>No meals found.</p>";
      return;
    }

    let mealList = document.createElement('ul');
    mealList.classList.add('meal_list');

    meals.map(meal => {
      let mealItem = document.createElement('li');
      mealItem.classList.add('meal_item');

      mealItem.innerHTML = `
        <p>${meal.strMeal}</p>
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      `;

      mealList.appendChild(mealItem);
    });

    mealContainer.appendChild(mealList);
  }


  // Call function to fetch categories after DOM is loaded
  Categories_data();
});


