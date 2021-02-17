
let elem = "";
let ingredientsObj = {};
let extraIngredients = 0;
let totalPremix = parseFloat(document.getElementById("totalPremixQuantity").value);
function sumIngredientWeight(obj) {
  let allIngredientCost = 0;
  for (const property in obj) {
    if (obj[property].hasOwnProperty("addRate") && obj[property].hasOwnProperty("feedCost")) {
      if ((obj[property].addRate * obj[property].feedCost) > 0) {

        let ingredientCost = obj[property].addRate * obj[property].feedCost;
        allIngredientCost = ingredientCost + allIngredientCost;
        let premixPerBatch = parseFloat(document.getElementById("add-rate0").value);
       let answer = allIngredientCost * totalPremix / premixPerBatch;
       
        if (typeof answer === "number"&&answer.toString()!=="NaN") {
         document.getElementById("answer").innerHTML=" $"+answer.toString();
        }

      }
    }
  }
  return "hello"
}
function addElem(feedName) {
  //create a string that is the same is as the number of the element by creation
  let stringExtra = extraIngredients.toString();
  //add new element
  let elem = document.createElement("div");
  elem.setAttribute("id", `ingredient${stringExtra}`);
  elem.setAttribute("class", `entireIngredient`);
  elem.innerHTML = `
         
          <div class="form-elem" id="name${stringExtra}"  >${feedName}</div>
          
          <input class="form-elem" id="cost${stringExtra}" name="cost" placeholder="cost" ></input>
          
          <input class="form-elem" id="add-rate${stringExtra}" name="add-rate" placeholder="add-rate"></input>
          <button id="${stringExtra}exit" class="exit">x</button>
        
  `;
  const userElem = document.getElementById("userAddedElems");
  
  userElem.appendChild(elem);


  //add exit event listener

  document.getElementById(`${stringExtra}exit`).addEventListener("click", function () {

    delete ingredientsObj[stringExtra];
    document.getElementById(`ingredient${stringExtra}`).remove();
    sumIngredientWeight(ingredientsObj);


  });

  extraIngredients += 1;

  //makes local ingredients obj sub obj for holding objects to pass to the ingredients obj
  let elemObj = {

  }
  ingredientsObj[stringExtra] = elemObj;
  ingredientsObj[stringExtra].feedKind = "";
  ingredientsObj[stringExtra].feedCost = 0;
  ingredientsObj[stringExtra].addRate = 0;
  //adds onchange event listeners
  for (const property in ingredientsObj) {



    //set feedKind to input
    let nameInput = document.getElementById(`name${property}`);
    nameInput.addEventListener('input', function (e) {

      let feedKind = e.target.value.toString();
      if (typeof feedKind == "string") {
        ingredientsObj[property].feedKind = feedKind;
      }
      else {
        ingredientsObj[property].feedKind = "";
      }
      sumIngredientWeight(ingredientsObj);


    });

    //set feedCost to input
    let costInput = document.getElementById(`cost${property}`);
    costInput.addEventListener('input', function (e) {

      let feedCost = parseFloat(e.target.value);
      if (typeof feedCost == "number") {
        ingredientsObj[property].feedCost = feedCost;
      }
      else {
        ingredientsObj[property].feedCost = 0;
      }
      sumIngredientWeight(ingredientsObj);



    });

    let addRateInput = document.getElementById(`add-rate${property}`);
    addRateInput.addEventListener('input', function (e) {
      let addRate = parseFloat(e.target.value);
      if (typeof addRate == "number") {
        ingredientsObj[property].addRate = addRate;
      }
      else {
        ingredientsObj[property].addRate = 0;
      }
      sumIngredientWeight(ingredientsObj);
    });



  }



}

addElem("Premix");
document.getElementById("0exit").remove();
addElem("Corn");
addElem("Soy");
const totalPremixQuantity = document.getElementById("totalPremixQuantity");
totalPremixQuantity.addEventListener('input', function (e) {
  totalPremix = parseFloat(e.target.value);
  sumIngredientWeight(ingredientsObj);
  
});
document.getElementById("addIngredient").addEventListener("click", function () {
  //create a string that is the same is as the number of the element by creation
  let stringExtra = extraIngredients.toString();
  //add new element
  let elem = document.createElement("div");
  elem.setAttribute("id", `ingredient${stringExtra}`);
  elem.setAttribute("class", `entireIngredient`);
  elem.innerHTML = `
         
          <input class="form-elem" id="name${stringExtra}" name="name" placeholder="name"></input>
          
          <input class="form-elem" id="cost${stringExtra}" name="cost" placeholder="cost"></input>
          
          <input class="form-elem" id="add-rate${stringExtra}" name="add-rate" placeholder="add rate"></input>
          <button id="${stringExtra}exit" class="exit">x</button>
        
  `;
  userElem = document.getElementById("userAddedElems");
  userElem.appendChild(elem);


  //add exit event listener

  document.getElementById(`${stringExtra}exit`).addEventListener("click", function () {

    delete ingredientsObj[stringExtra];
    document.getElementById(`ingredient${stringExtra}`).remove();


  });

  extraIngredients += 1;

  //makes local ingredients obj sub obj for holding objects to pass to the ingredients obj
  let elemObj = {

  }
  ingredientsObj[stringExtra] = elemObj;
  ingredientsObj[stringExtra].feedKind = "";
  ingredientsObj[stringExtra].feedCost = 0;
  ingredientsObj[stringExtra].addRate = 0;
  //adds onchange event listeners
  for (const property in ingredientsObj) {



    //set feedKind to input
    let nameInput = document.getElementById(`name${property}`);
    nameInput.addEventListener('input', function (e) {

      let feedKind = e.target.value.toString();
      if (typeof feedKind == "string") {
        ingredientsObj[property].feedKind = feedKind;
      }
      else {
        ingredientsObj[property].feedKind = "";
      }
      sumIngredientWeight(ingredientsObj);


    });

    //set feedCost to input
    let costInput = document.getElementById(`cost${property}`);
    costInput.addEventListener('input', function (e) {

      let feedCost = parseFloat(e.target.value);
      if (typeof feedCost == "number") {
        ingredientsObj[property].feedCost = feedCost;
      }
      else {
        ingredientsObj[property].feedCost = 0;
      }
      sumIngredientWeight(ingredientsObj);



    });

    let addRateInput = document.getElementById(`add-rate${property}`);
    addRateInput.addEventListener('input', function (e) {
      let addRate = parseFloat(e.target.value);
      if (typeof addRate == "number") {
        ingredientsObj[property].addRate = addRate;
      }
      else {
        ingredientsObj[property].addRate = 0;
      }
      sumIngredientWeight(ingredientsObj);
    });



  }



});
