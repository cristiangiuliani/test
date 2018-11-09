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
        arrDate = [current.getFullYear(), current.getMonth(), current.getDate()],
        parseDate = arrDate.map(value => {return value < 10 ? `0${value}` : value});
    
    return parseDate.join('');
  }
  
  console.log(formatDate("12/31/2014"));

  function setup() {
      let buttons = Array.from(document.getElementsByClassName("remove"));
      console.log(buttons);

      buttons.forEach((item,index) => {
        item.addEventListener("click",function(){
            console.log(this.parentElement);
            
        });
    });
  }
  
  window.onload = () => { 
    // Example case. 
    document.body.innerHTML = `
    <div class="image">
        <img src="https://goo.gl/kjzfbE" alt="First">
        <button class="remove">X</button>
    </div>
    <div class="image">
        <img src="https://goo.gl/d2JncW" alt="Second">
        <button class="remove">X</button>
    </div>`;
    setup();
    
    //document.getElementsByClassName("remove")[0].click();
  }

 