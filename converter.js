const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

// creating dropdown for choosing countries
let dropdowns = document.querySelectorAll(".dropdowns");

for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    
    select.append(newOption);
  }

  select.addEventListener("change", (evt)=>{ 
    updateFlag(evt.target);
  })
}

const updateFlag=(element) =>{
  let currcode = element.value;
  let countrycode = countryList[currcode];
  let newsrc= `https://flagsapi.com/${countrycode}/flat/64.png`;
  let img = element.parentElement.querySelector("img"); 
  img.src = newsrc;
}

// Handling the exchange button's functionality
let exchange = document.querySelector(".exchangebtn");
let dropdownA = document.querySelector(".dropdownA");   dropdownA.value="USD";
let dropdownB = document.querySelector(".dropdownB");   dropdownB.value="INR";
let flagA = document.querySelector("#flagA");
let flagB = document.querySelector("#flagB");

exchange.addEventListener("click",()=>{

  let temp = dropdownA.value;
  dropdownA.value = dropdownB.value;
  dropdownB.value = temp;

  let tempsrc = flagA.src;
  flagA.src = flagB.src;
  flagB.src = tempsrc;
})

//Handling the convert button's functionality
let convertbtn = document.querySelector(".convert");
convertbtn.addEventListener("click", (evt)=>{
  evt.preventDefault();

  let amount = document.querySelector("#amount"); // accessing the input field

  if(amount.value < 0 )    // not allowing negative values for conversion
  {
    amount.value = 0;
  }

  evt.preventDefault();
  updatExchangeRate();

})

async function updatExchangeRate(){
     let amount=document.querySelector("#amount");
    if(amount.value=="" || amount.value<0){
        amount.value="0";
    }
const url = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${dropdownA.value.toLowerCase()}.json`;

try {
  let response = await fetch(url);
  let data = await response.json();
  let rate = data[dropdownA.value.toLowerCase()][dropdownB.value.toLowerCase()];
  console.log(rate);
  let finalAmount = (amount.value * rate).toFixed(2);

  let result =  document.querySelector("#result");
  result.value  = finalAmount;
} catch (err) {
  result.value = "Error fetching currency data";
  console.error(err);
}
}