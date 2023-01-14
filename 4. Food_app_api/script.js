const searchBtn = document.getElementById("search-btn");
const mealList = document.getElementById("meal");
const mealDetailsContent = document.querySelector(".meal-details-content");
const recipeCloseBtn = document.getElementById("recipe-close-btn");
// const Filter_by_main_ingredient = "www.themealdb.com/api/json/v1/1/filter.php?i=egg";
// event listeners
searchBtn.addEventListener("click", getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () =>{
    mealDetailsContent.parentElement.classList.remove('showRecipe');
})

// get meal list that matches with the ingredients
function getMealList() {
  let searchInputTxt = document.getElementById("search-input").value.trim();
  // console.log(searchInputTxt);
  fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputTxt}`
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      let html = "";
      if (data.meals) {
        data.meals.forEach((meal) => {
          html += `
                <div class="meal-items" data-id = "${meal.idMeal}">
                    <div class="meal-img">
                        <img src="${meal.strMealThumb}" alt="food">
                        <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn">Get Recipe</a>
                        </div>
                    </div>
                </div>
                `;
        });
        mealList.classList.remove('notFound');
      }else{
        html = "sorry we didn't find any meal"
        mealList.classList.add('notFound');
      }

      mealList.innerHTML = html;
    });
}


// get recipe of the meal
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        let mealItem = e.target.parentElement.parentElement.parentElement;
        console.log(mealItem)
        console.log(mealItem.dataset.id)
        // console.log(mealItem);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data =>{
            // console.log(data);
            return mealRecipeModal(data.meals);
        })
    }
}

// create a modal
function mealRecipeModal(meal){
    console.log(meal);
    meal = meal[0];
    let htmlContent = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
        <h3>Instructions:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
        <img src="${meal.strMealThumb}" alt="">
    </div>
    <div class="recipe-link">
        <a href="${meal.strYoutube}" target="_blank">watch video</a>
    </div>
    `;
    mealDetailsContent.innerHTML = htmlContent;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}