
const loadEvent=()=>{
  const div=document.createElement("div");
  div.innerHTML=`<div class="modal">
  <div class="button-container"><button id="remove">x</button></div><div></div><p>Tired of manually calculating your feed costs? Tired of the mistakes and double-checking?
  Use this tool to safely and easily find your feed costs based on data you've already collected.
  Simply input the amount of premix you've used with each ration, your ingredient prices, and the make up of that ration by weight.
  Once you've entered your information, you'll have your feed cost for that ration to add to your total cost of production.
  </p>
  </div>`;
  div.id="fullscreen";
  document.getElementById("header").appendChild(div);
  div.addEventListener("click", function(e){e.target.remove()});
  document.getElementById("remove").addEventListener("click", function(e){div.remove()});
}
loadEvent();
const weightTable={
 kg: 1, 
 lb: 0.45,
 tonne: 1000,
 ton: 907.1847,

}
const timeTable={
  day: 1, 
  week: 7, 
  month: 30,
  year: 365

}

let elem = "";
let ingredientsObj = {};
let extraIngredients = 0;
let totalPremix = parseFloat(document.getElementById("totalPremixQuantity").value);
function sumIngredientWeight() {
  const obj=ingredientsObj;
  let allIngredientCost = 0;
  for (const property in obj) {
    if (obj[property].hasOwnProperty("addRate") && obj[property].hasOwnProperty("feedCost")) {
      if ((obj[property].addRate * obj[property].feedCost) > 0) {

        let ingredientCost = obj[property].addRate * obj[property].feedCost;
        allIngredientCost = ingredientCost + allIngredientCost;
        let premixPerBatch = obj["0"].addRate;
       let answer = allIngredientCost * totalPremix / premixPerBatch;
       const option=document.getElementById("answer-option");
       const inputTime=document.getElementById("input-options");
       answer=answer*timeTable[option.value.slice(1)];
       answer=answer/timeTable[inputTime.value.slice(1)];
        if (typeof answer === "number"&&answer.toString()!=="NaN") {
         document.getElementById("answer").innerHTML=" $"+answer.toLocaleString();
         document.getElementById("answer-option").style.visibility="visible";
         console.log(obj[property].addRate* totalPremix / premixPerBatch+" kgs of "+obj[property].feedKind);
         
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
          
          <span class="flex"><input type="number" class="form-elem" type="number" id="cost${stringExtra}" name="cost" placeholder="cost" ></input>
          <select class="unit-elem" id="costperunit${stringExtra}"><option>$/kg</option><option>$/lb</option><option>$/ton</option><option>$/tonne</option></select></span>
          
          <span class="flex"><input type="number" class="form-elem" id="add-rate${stringExtra}" name="add-rate" placeholder="add-rate"></input>
          <select class="unit-elem" id="unit${stringExtra}"><option>kg</option><option>lb</option><option>ton</option><option>tonne</option></select></span>
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
  ingredientsObj[stringExtra].feedKind = feedName;
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

      let feedCost = parseFloat(document.getElementById(`cost${property}`).value)
      /weightTable[document.getElementById(`costperunit${property}`).value.slice(2)];
      
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
      
      let addRate = parseFloat(e.target.value)*weightTable[document.getElementById(`unit${property}`).value];
      if (typeof addRate == "number") {
        ingredientsObj[property].addRate = addRate;
      }
      else {
        ingredientsObj[property].addRate = 0;
      }
      sumIngredientWeight(ingredientsObj);
    });

  let costPerInput=document.getElementById(`costperunit${property}`);
  costPerInput.addEventListener('change', function(e){

    let feedCost = parseFloat(document.getElementById(`cost${property}`).value)
    /weightTable[document.getElementById(`costperunit${property}`).value.slice(2)];
    if (typeof feedCost == "number") {
      ingredientsObj[property].feedCost = feedCost;
    }
    else {
      ingredientsObj[property].feedCost = 0;
    }
    sumIngredientWeight(ingredientsObj);


  });



  let addRateUnit = document.getElementById(`unit${property}`);
  addRateUnit.addEventListener('change', function (e) {
    let addRate=parseFloat(document.getElementById(`add-rate${property}`).value*weightTable[document.getElementById(`unit${property}`).value]);
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
         
          <input type="text" class="form-elem" id="name${stringExtra}" name="name" placeholder="name"></input>
          
          <span class="flex"><input type="number" class="form-elem" type="number" id="cost${stringExtra}" name="cost" placeholder="cost" ></input>
          <select class="unit-elem" id="costperunit${stringExtra}"><option>$/kg</option><option>$/lb</option><option>$/ton</option><option>$/tonne</option></select></span>
          
          <span class="flex"><input type="number" class="form-elem" id="add-rate${stringExtra}" name="add-rate" placeholder="add-rate"></input>
          <select class="unit-elem" id="unit${stringExtra}"><option>kg</option><option>lb</option><option>ton</option><option>tonne</option></select></span>
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

      let feedCost = parseFloat(document.getElementById(`cost${property}`).value)
      /weightTable[document.getElementById(`costperunit${property}`).value.slice(2)];
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
      let addRate = parseFloat(e.target.value)*weightTable[document.getElementById(`unit${property}`).value];
      if (typeof addRate == "number") {
        ingredientsObj[property].addRate = addRate;
      }
      else {
        ingredientsObj[property].addRate = 0;
      }
      sumIngredientWeight(ingredientsObj);
    });

    let costPerInput=document.getElementById(`costperunit${property}`);
    costPerInput.addEventListener('change', function(e){
  
     
      let feedCost = parseFloat(document.getElementById(`cost${property}`).value)
      /weightTable[document.getElementById(`costperunit${property}`).value.slice(2)];
      
      if (typeof feedCost == "number") {
        ingredientsObj[property].feedCost = feedCost;
      }
      else {
        ingredientsObj[property].feedCost = 0;
      }
      sumIngredientWeight(ingredientsObj);
  
  
    });
  
  
  
    let addRateUnit = document.getElementById(`unit${property}`);
    addRateUnit.addEventListener('change', function (e) {
     // let addRate=document.getElementById(`add-rate${property}`)*
      let addRate=parseFloat(document.getElementById(`add-rate${property}`).value*weightTable[document.getElementById(`unit${property}`).value]);
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
const closure=()=>{}
document.getElementById("answer-option").addEventListener('input', sumIngredientWeight);
document.getElementById("input-options").addEventListener('input', sumIngredientWeight);