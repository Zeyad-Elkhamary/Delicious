let jar = ``;
let searchName = document.getElementById("searchName");
let searchLetter = document.getElementById("searchLetter");
let loader = document.getElementById("on/off-loader");

function contact() {
loader.classList.remove("d-none");
  document.getElementById("main-section").innerHTML = `
<form action="" class="row justify-content-around gy-3 mt-5 ">
    
<div class="col-md-5">
        <input class="alert w-100" placeholder="Name"  type="text" name="name" id="name" >
    <label id="nameNote" class="alert w-100 alert-danger d-none">
        name must have between 3 or more any characters</label>
</div>
    
<div class="col-md-5">
        <input class="alert w-100" placeholder="Mail" type="email" name="email" id="email">
        <label id="mailNote" class="alert w-100 alert-danger d-none">
        email is invalid ( example@email.com )</label>
</div>
    

<div class="col-md-5">
    <input class="alert w-100" type="tel" placeholder="Phone" name="phone" id="phone">
        <label id="phoneNote" class="alert w-100 alert-danger d-none">
        phone is invalid</label>
</div>

    
<div class="col-md-5">
    <input class="alert w-100" type="number" min="0" placeholder="Age" name="age" id="age">
        <label id="ageNote" class="alert w-100 alert-danger d-none">
        age is invalid ( age is vaild between 10 to 99 years )</label>
</div>

   
<div class="col-md-5">
    <input class="alert w-100" type="password" placeholder="Password" name="password" id="password">
        <label id="passwordNote" class="alert w-100 alert-danger d-none">
        password is invalid ( password must at least have 8 characters )</label>
</div>

    <div class="col-md-5">
    <input class="alert w-100" type="password" placeholder="Repassword" name="repassword" id="repassword">
        <label id="repasswordNote" class="alert w-100 alert-danger d-none">
        repassword is invalid ( password and repassword are not equal )</label>
</div>

    
<input disabled id="submitButton" class="col-md-12" type="submit" value="Submit">

</form>
 `;

 loader.classList.add("d-none");

  let Name = document.getElementById("name");
  let mail = document.getElementById("email");
  let phone = document.getElementById("phone");
  let age = document.getElementById("age");
  let password = document.getElementById("password");
  let repassword = document.getElementById("repassword");
  let submit = document.getElementById("submitButton");

  Name?.addEventListener("change", () => {
    if (/^[a-zA-Z]{3,}$/g.test(Name.value)) {
      Name.classList.remove("alert-danger");
      Name.classList.add("alert-success");
      document.getElementById("nameNote").classList.add("d-none");
    } else {
      document.getElementById("nameNote").classList.remove("d-none");
      Name.classList.remove("alert-success");
      Name.classList.add("alert-danger");
    }
    validationButton();
  });
  mail?.addEventListener("change", () => {
    if (/^[a-zA-Z0-9]+(@gmail)+\.(com)$/g.test(mail.value)) {
      mail.classList.remove("alert-danger");
      mail.classList.add("alert-success");
      document.getElementById("mailNote").classList.add("d-none");
    } else {
      document.getElementById("mailNote").classList.remove("d-none");
      mail.classList.remove("alert-success");
      mail.classList.add("alert-danger");
    }
    validationButton();
  });
  phone?.addEventListener("change", () => {
    if (/^01[0125]+[0-9]{8}$/g.test(phone.value)) {
      phone.classList.remove("alert-danger");
      phone.classList.add("alert-success");
      document.getElementById("phoneNote").classList.add("d-none");
    } else {
      document.getElementById("phoneNote").classList.remove("d-none");
      phone.classList.remove("alert-success");
      phone.classList.add("alert-danger");
    }
    validationButton();
  });
  age?.addEventListener("change", () => {
    if (/^[1-9][0-9]{1}$/g.test(age.value)) {
      age.classList.remove("alert-danger");
      age.classList.add("alert-success");
      document.getElementById("ageNote").classList.add("d-none");
    } else {
      document.getElementById("ageNote").classList.remove("d-none");
      age.classList.remove("alert-success");
      age.classList.add("alert-danger");
    }
    validationButton();
  });
  password?.addEventListener("change", () => {
    if (/^.{8,}$/g.test(password.value)) {
      password.classList.remove("alert-danger");
      password.classList.add("alert-success");
      document.getElementById("passwordNote").classList.add("d-none");
    } else {
      document.getElementById("passwordNote").classList.remove("d-none");
      password.classList.remove("alert-success");
      password.classList.add("alert-danger");
    }
    validationButton();
  });
  repassword?.addEventListener("keyup", () => {
    if (password.value === repassword.value) {
      repassword.classList.remove("alert-danger");
      repassword.classList.add("alert-success");
      document.getElementById("repasswordNote").classList.add("d-none");
    } else {
      document.getElementById("repasswordNote").classList.remove("d-none");
      repassword.classList.remove("alert-success");
      repassword.classList.add("alert-danger");
    }
    validationButton();
  });

  function validationButton() {
    if (
      Name.classList.contains("alert-success") &&
      mail.classList.contains("alert-success") &&
      age.classList.contains("alert-success") &&
      phone.classList.contains("alert-success") &&
      password.classList.contains("alert-success") &&
      repassword.classList.contains("alert-success")
    ) {
      submit.removeAttribute("disabled");
      submit.style.backgroundColor = "#fd8f00";
    } else {
      submit.setAttribute("disabled", "disabled");
      submit.style.backgroundColor = "gray";
    }
  }
}

//       START HOME PAGE

async function getMeals() {
  let response = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  let { meals } = await response.json();
  return meals[0];
}

async function start() {
loader.classList.remove("d-none");
  let data = [];
  for (let i = 0; i < 25; i++) {
    data.push(await getMeals());
  }

  welcomeMeals(data);
}

function welcomeMeals(data) {
      jar = "";
  for (let i = 0; i < data.length; i++) {

    jar += `
        <div class="col-lg-4 col-md-6 g-4 ">
          <div onclick="getDetails(${data[i].idMeal})" class="position-relative overflow-hidden rounded-5 cards  cursor-pointer">
            <img src="${data[i].strMealThumb}" class="w-100" alt="" />
            <div
              class="dark-layer position-absolute p-2 d-flex justify-content-center align-items-center">
              <h2 class="fw-bold fs-1 text-black">${data[i].strMeal}</h2>
            </div>
          </div>
        </div>
    `;
  }

  document.getElementById("main-section").innerHTML = " <div id='mealDetails'></div>"+jar;
loader.classList.add("d-none");
}

//      INGREDIENTS PAGE

async function getingredints() {
  loader.classList.remove("d-none");
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );
  let { meals } = await data.json();
  
displayIngredents(meals);

}

function displayIngredents(meals) {
  jar = '';

  for (let i = 0; i < 50; i++) {
jar += `
        <div class="col-lg-4 col-md-6 g-4">
          <div onclick="getmenu('${
            meals[i].strIngredient
          }')" class="position-relative overflow-hidden rounded-5 cards text-center cursor-pointer">
            <img src="images/OIP (1) 1.png" alt="" />
<h2 class="fw-bolder">${meals[i].strIngredient}</h2>
<p class="fw-bolder">${meals[i].strDescription
  ?.split(" ")
  .slice(0, 30)
  .join(" ")}</p>
          </div>
        </div>
`;

}
document.getElementById("main-section").innerHTML = jar;
loader.classList.add("d-none");
}

async function getmenu(kind) {
  loader.classList.remove("d-none");
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${kind}`);
  let { meals } = await data.json();
  
  displaymenu(meals);
}

function displaymenu(meals) {
  jar = "";
  for (let i = 0; i < meals.length; i++) {
    jar += `
                <div class="col-md-4 g-4">
          <div onclick="getDetails('${meals[i].idMeal}')" class="position-relative overflow-hidden rounded-5 cards  cursor-pointer">
            <img src="${meals[i].strMealThumb}" class="w-100" alt="" />
            <div
              class="dark-layer position-absolute p-2 d-flex justify-content-center align-items-center">
              <h2 class="fw-bold fs-1 text-black">${meals[i].strMeal}</h2>
            </div>
          </div>
        </div>
  `;
}
document.getElementById("main-section").innerHTML ="<div id='mealDetails'></div> " + jar;
loader.classList.add("d-none");
}

//      AREA PAGE

async function getAreas() {
  loader.classList.remove("d-none");
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
  let { meals } = await data.json();
displayAreas(meals);
}

function displayAreas(meals) {
  jar = "";

  for (let i = 0; i < meals.length; i++) {
    jar += `
        <div class="col-xl-3 col-lg-4 col-md-6 g-4">
          <div onclick="getMealsArea('${meals[i].strArea}')" class="position-relative bg-dark-subtle p-4 overflow-hidden rounded-5 cards text-center cursor-pointer">
            <img src="images/OIP 1.png" alt="" />
<h2 class="mt-3 fw-bolder">${meals[i].strArea}</h2>
          </div>
        </div>
`;

}
document.getElementById("main-section").innerHTML = jar;
loader.classList.add("d-none");
}

async function getMealsArea(area) {
  loader.classList.remove("d-none");
  let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`);
  let { meals } = await data.json();

  displayMeals(meals);
}

function displayMeals(meals) {
  jar = "";
  for (let i = 0; i < meals.length; i++) {
    jar += `
                <div class="col-md-4 g-4">
          <div onclick="getDetails('${meals[i].idMeal}')" class="position-relative overflow-hidden rounded-5 cards  cursor-pointer">
            <img src="${meals[i].strMealThumb}" class="w-100" alt="" />
            <div
              class="dark-layer position-absolute p-2 d-flex justify-content-center align-items-center">
              <h2 class="fw-bold fs-1 text-black">${meals[i].strMeal}</h2>
            </div>
          </div>
        </div>
  `;
}
document.getElementById("main-section").innerHTML ="<div id='mealDetails'></div> " + jar;
loader.classList.add("d-none");
}

//      Categories PAGE

async function getCategories() {
  loader.classList.remove("d-none");
let data = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
let { categories } = await data.json();
displayCategories(categories);
}

function displayCategories(categories) {
  jar = "";
  for (let i = 0; i < categories.length; i++) {
    jar += `

        <div class="col-lg-4 col-md-6 g-4">
          <div onclick="getMealsCategory('${categories[i].strCategory}')" class="position-relative overflow-hidden rounded-5 cards p-3 cursor-pointer">
            <img src="${categories[i].strCategoryThumb}" class="w-100" alt="" />
            <div
              class="dark-layer position-absolute p-2 d-flex justify-content-center align-items-center">
              <h2 class="fw-bold fs-1 text-black">${categories[i].strCategory}</h2>
            </div>
          </div>
        </div>

  `;
}
document.getElementById("main-section").innerHTML = jar;
loader.classList.add("d-none");
}

async function getMealsCategory(category) {
  loader.classList.remove("d-none");
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );
  let { meals } = await data.json();

  displayMeals(meals);
}

//      details PAGE

async function getDetails(id) {
  loader.classList.remove("d-none");
  let data = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
  let { meals } = await data.json();
  displayDetails(meals[0])
}

function displayDetails(meals){
    let smjar = "";

for (let i = 1; true; i++) {
if (meals[`strIngredient${i}`]) {
  smjar += `<span class="badge mx-2 my-2 py-2 px-3">${meals[`strIngredient${i}`]}</span>`;
}else{
  break;
}
}
  jar = "";
  jar = `
  
<div class="mealDetails p-4 rounded-4">

  <div class="d-flex justify-content-end">
    <i onclick="closeTab()" class="fa-solid fa-x fs-1 cursor-pointer"></i>
  </div>

<div class="row">
<div class="col-xl-6 col-lg-5 col-md-12">
<img src="${meals.strMealThumb}" class="w-100 rounded-5" alt="">
</div>
<div class="col-md-12 col-lg-7 col-xl-6">
<h2 class="fw-bolder main-color my-4">Instructions :</h2>
<p class="fw-bolder">${meals.strInstructions}</p>
<h2 class="my-4 fw-bolder main-color">Area : <span class="fw-bolder fs-2 text-black">${meals.strArea}</span></h2>
<h2 class="my-4 fw-bolder main-color">Category : <span class="fw-bolder fs-2 text-black">${meals.strCategory}</span></h2>
<h2 class="my-4 fw-bolder main-color">Reciepes :</h2>
<div>
${smjar}
</div>
</div>
</div>
<h1 class="fw-bolder mt-4 fs-1 main-color">${meals.strMeal}</h1>
</div>
 
  `;
document.getElementById("mealDetails").innerHTML = jar;
loader.classList.add("d-none");
}

function closeTab() {
  document.getElementById("mealDetails").innerHTML = "";
}

//      SEARCH PAGE

function search() {
  loader.classList.remove("d-none");
  document.getElementById("main-section").innerHTML = `
  
  <div class="row justify-content-between">
<div class="col-md-6 mb-4 mb-xl-0">
        <input onchange="getResName(event)" class="w-100" placeholder="Search by name"  type="text" id="searchName" >
</div>

<div class="col-md-6">
        <input onchange="getResLetter(event)" class="w-100" placeholder="Search by first letter"  type="text" id="searchLetter" >
</div>

<div id="ResultSearch" class="col-12 row">

</div>
</div>

  `;
  loader.classList.add("d-none");
}

async function getResName(event) {
  loader.classList.remove("d-none");
          let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${event.target.value}`);
          let { meals } = await response.json();
          event.target.value = "";
          displayRes(meals);
}

async function getResLetter(event) {
  loader.classList.remove("d-none");
          let response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?f=${event.target.value}`
          );
          let { meals } = await response.json();
          event.target.value = "";
          displayRes(meals);
}

function  displayMealsSearch(meals){
  jar = "";
  for (let i = 0; i < meals.length; i++) {
    jar += `
                <div class="col-md-4 g-4">
          <div onclick="getDetails('${meals[i].idMeal}')" class="position-relative overflow-hidden rounded-5 cards  cursor-pointer">
            <img src="${meals[i].strMealThumb}" class="w-100" alt="" />
            <div
              class="dark-layer position-absolute p-2 d-flex justify-content-center align-items-center">
              <h2 class="fw-bold fs-1 text-black">${meals[i].strMeal}</h2>
            </div>
          </div>
        </div>
  `;
  }
  document.getElementById("ResultSearch").innerHTML =
    "<div id='mealDetails'></div> " + jar;
    loader.classList.add("d-none");
}

function displayRes(meals) {
  meals ? displayMealsSearch(meals)
    : document.getElementById("mealDetails").innerHTML = `<label class="alert alert-danger fs-1 text-center mt-5">There is not found or input is not valid</label>`;
loader.classList.add("d-none");
  }

start();
