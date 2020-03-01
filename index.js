$(document).ready(function() {
  var myArray = [];
  getCountryList();

  // function to get countrywise list through a GET request//
  
  function getCountryList() 
  {
    var countryList = null;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.themealdb.com/api/json/v1/1/list.php?a=list");
    xhr.send();
    xhr.onload = function() 
    {
      if (xhr.status == 200)
      {
        countryList = JSON.parse(xhr.response);
        // console.log(countryList);
        appendCountryList(countryList);
      } 
      else 
      {
        console.log("Error code is :" + xhr.status);
      }
    };
  }

  // appending the data to the select box//
 
  function appendCountryList(countryList) 
  {
    countryList.meals.forEach(function(val) {
      // console.log(val);
      $("#selectBox").append("<option value = " + val.strArea + ">" + val.strArea + "</option>");
    });
  }

  // function to get regionwise food list //

  function getCountryMeals(reg) 
  {
    var countryMeals = null;
    var xhr1 = new XMLHttpRequest();
    xhr1.open("GET", "https://www.themealdb.com/api/json/v1/1/filter.php?a=" + reg);
    xhr1.send();
    xhr1.onload = function() 
    {
      if (xhr1.status == 200) 
      {
        $("#mealsDisplayArea").empty();
        countryMeals = JSON.parse(xhr1.response);
        console.log(countryMeals);
        countryMeals.meals.forEach(function(ele) {
          $("#mealsDisplayArea").append(
            ` <div class="card col-4 mx-auto text-center">
                                                    <img  src="${ele.strMealThumb}" class="card-img-top m-auto py-2" alt="...">
                                                    <div class="card-body p-2">
                                                        <h5 class="card-title">${ele.strMeal}</h5>
                                                        <button type="button" onclick=selectDish('${ele.idMeal}') class="btn btn-outline-primary">View More</button>
                                                        </div>
                                                </div>`
          );
        });
      } else {
        console.log("Error code is :" + xhr1.status);
      }
    };
  }

  // change function to display the meals regionwise//

  $("#selectBox").change(function() 
  {
    var region = $("#selectBox").val();
    getCountryMeals(region);
  });
});

// function to display a particular dish details//
function selectDish(id) 
{
  var result = null;
  var xhr2 = new XMLHttpRequest();
  xhr2.open("GET", "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id);
  xhr2.send();
  xhr2.onload = function() 
  {
    if (xhr2.status == 200) {
      result = JSON.parse(xhr2.response);
      console.log(result);

      $("#modalContent").empty();
      $("#modalContent").append(` 
          
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">${result.meals[0].strMeal}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>

          <div class="modal-body">
           <div class="row">
            <div class="col-5">
             <img src=${result.meals[0].strMealThumb} class='img-fluid'/>
            </div>
          <div class="col-3 justify-content-right">
           <p class = "display-4">Ingredients</p>
           <ol class="h3">
            <li> ${result.meals[0].strIngredient1}</li>
            <li> ${result.meals[0].strIngredient2}</li>
            <li> ${result.meals[0].strIngredient3}</li>
            <li> ${result.meals[0].strIngredient4}</li>
            <li> ${result.meals[0].strIngredient5}</li>
            <li> ${result.meals[0].strIngredient6}</li>
            <li> ${result.meals[0].strIngredient7}</li>
           </ol>
          </div>
         </div>

         <br>

         <div class = "row">
          <div class = col-5 mt-4>
           <div class="embed-responsive embed-responsive-16by9">
            <iframe class="embed-responsive-item" src=${result.meals[0].strYoutube} allowfullscreen></iframe>
           </div>
          </div>
         <div class = "col-6">
           <p class="display-4">Recipe</p>
         </div>
         </div>
          </div>

          <br>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          </div>`);
      
          $("#exampleModalLong").modal("show");
    } 
    else 
    {
      console.log("Error code is: " + xhr2.status);
    }
  };
}
