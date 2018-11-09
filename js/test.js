/*Implement the removeProperty function which takes an object and property name, and does the following:

If the object obj has a property prop, the function removes the property from the object and returns true; 
in all other cases it returns false.*/
function removeProperty(obj, prop) {
    console.log('Start '+Object.getOwnPropertyNames(obj));
    
    if(obj.hasOwnProperty(prop)) {
        delete obj[prop];
        console.log('Updated '+Object.getOwnPropertyNames(obj));
    }
    
    
    return null;
}
var myobj = {id: 1, num: 3, desc: 'testo'}
removeProperty(myobj, 'num');



function formatDate(userDate) {
    let current = new Date(userDate),
        arrDate = [current.getFullYear(), (current.getMonth()+1), current.getDate()],
        parseDate = arrDate.map(value => {return value < 10 ? `0${value}` : value});
    
    return parseDate.join('');
  }
  
  console.log(formatDate("12/31/2014"));

  function setup() {
      let buttons = Array.from(document.getElementsByClassName("remove"));
      console.log(buttons);

      buttons.forEach((item,index) => {
        item.addEventListener("click",function(){
            this.parentElement.remove()
        });
    });
  }
  
  window.onload = () => { 
    // Example case. 
    /*document.body.innerHTML = `
    <div class="image">
        <img src="https://goo.gl/kjzfbE" alt="First">
        <button class="remove">X</button>
    </div>
    <div class="image">
        <img src="https://goo.gl/d2JncW" alt="Second">
        <button class="remove">X</button>
    </div>`;*/
    setup();
    
    //document.getElementsByClassName("remove")[0].click();

    registerHandlers();

    function appendChildren(decorateDivFunction) {
        var allDivs = document.getElementsByTagName("div"),
            count = allDivs.length;
        
        for (var i = 0; i < count; i++) {
          var newDiv = document.createElement("div");
          decorateDivFunction(newDiv);
          allDivs[i].appendChild(newDiv);
        }
      }
      
      // Example case. 
      document.body.innerHTML = `
      <div id="a">
        <div id="b">
        </div>
      </div>`;
      
      appendChildren(function(div) {});
  }

  function registerHandlers() {
    var as = document.getElementsByTagName('a');
    for (let i = 0; i < as.length; i++) {
        console.log(i);
      as[i].onclick = function() {
        alert(i);
        
        
        return false;
      }
    }
  }


  /*Implement the ensure function so that it throws an error if called without arguments or the argument is undefined. 
  Otherwise it should return the given value.*/
  function ensure(value=undefined) {
      if(value===undefined){
        throw "Errore";
      }else{
         return value;
      }
  }

  ensure(2);