// Esempio di closure
function createCounter() {
  let counter = 0
  const myFunction = function() {
    counter = counter + 1
    return counter
  }
  return myFunction
}
const increment = createCounter()
const c1 = increment()
const c2 = increment()
const c3 = increment()
console.log('example increment', c1, c2, c3)

/*Implement the removeProperty function which takes an object and property name, and does the following:

If the object obj has a property prop, the function removes the property from the object and returns true; 
in all other cases it returns false.*/
function removeProperty(obj, prop) {
    if(obj.hasOwnProperty(prop)){
      delete obj[prop];
      return true;
    }
    return false;
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
        item.addEventListener("click",(event)=>{
          event.target.parentElement.remove()
        });
      });

      /*let buttons = document.getElementsByClassName("remove");
      console.log(buttons);
      // Invece di convertire la collection in array
      [].forEach.call(buttons, (item,index) => {
        item.addEventListener("click",(event)=>{
          event.target.parentElement.remove()
        });
      });*/
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


  function createCheckDigit(membershipId) {
    // Write the code that goes here.
    let result = getSum(membershipId);
    return result;
  }

  function getSum(value){
    let result = parseInt(value);
    if(result > 9){
        let arrStr = value.toString().split(''),
        result = arrStr.reduce((total, num) => parseInt(total)+parseInt(num));
        
        return getSum(result);
    }   
    return result;
  }
  
  console.log(createCheckDigit("55555"));


/*
  - Invece di convertire una collection o una nodeList in array. Il primo argomento di Call sostituisce this.
    [].forEach.call(collection, (item,index) => { ... });

  - Le funzioni sono oggetti. Queste hanno le proprietá name e length. Name restituisce il nome della funzone, mentre length il numro di argomenti

  - for(indice in array){ totale = totale + array[i] } -- for(valore of array){ totale = totale + valore}
  
  ---- DOM ----
    - Attributi e proprietá non sono esattamente la stessa cosa es:

        <img id="miaImmagine" src="default.png" />
        var img = document.getElementById("miaImmagine");
        console.log(img.src);                   //"http://www.html.it/default.png"
        console.log(img.getAttribute("src"));   //"default.png"

        Anche per i campi input la proprietá fornisce il valore aggiornato dall'utente, l'attributo quello di default

        Anche checked. La proprietá restituisce true o false, l'attributo la stringa checked

        MEGLIO SEMPRE ACCEDERE ALLE PROPRIETÁ. Ricorrere agli attributo solo quando non é possibile con le proprietá
  
    - Metodi di navigazione tra nodi
        childNodes() 
        firstChild() lastChild()
        parentNode()
        nextSibling() previousSibling()

    - Collections e NodeList
        - An HTMLCollection (previous chapter) is a collection of HTML elements.
        - A NodeList is a collection of document nodes.
    
    - Operazioni sui nodi
        document.createElement(xxx); 
        document.createAttribute('aaa']);
        xxx.setAttributeNode(srcAttr);
        yyy.appendChild(xxx);
        document.body.insertBefore(xxx, yyy);
        yyy.replaceChild(xxx, zzz);
        yyy.removeChild(xxx);
        yyy.removeAttribute('aaa');

  ---- EVENTS ----
    - 3 modalitá handler: come attributo onclick="", come proprietá xxx.onclick = ..., come listner, di seguito:
    - addEventListener() é un metodo esposto da tutti gli elementi del dom e si usa per associare un evento
      - xxx.addEventListener('evento/i', callback(event ha info su evento come target), [useCapture]);
      - xxx.removeEventListener('evento/i', callback); inverso della precedente
    - la proprietá type da il nome dell'evento function(event){ event.type }
    - Capture phase, Target phase, Bubble phase. Lévento sulla foglia é il primo e poi si propaga sui genitori.
      event.target fa riferimento al destinatario dell'evento, this rappresenta chi sta gestendo l'evento. event.currentTarget é equivalente a this
      xxx.addEventListener("click", handler, true); fa si che l'evento si fermi alla foglia e non si propagi. Lo stesso effeto si ha con event.stopPropagation();
      event.preventDefault(); inibisce il comportamento standard dell'evento
    
    - document.onload avviene al caricamento del DOM a prescindere dal caricamento di altre risorse (img, js, ecc). 
      window.onload avviene al caricamento di DOM e risorse.
    - window.onunload é lópposto, avviene quando lútente sta per chiudere il browser o navigando su un'altra pagina
    - event.relatedTarget ci fornisce l'oggetto dove si é spostato il mouse ad esempio, non quello scatenante.

    - per rendere un oggetto trascinabile va impostato il suo attributo daraggable="true"

    - mutation observer sono eventi che scattano quando avviene qualche variazione nel DOM


  ---- OBJECTS ----
    - il passaggio di valori relativi a tipi di dato primitivi avviene sempre per valore 
      mentre il passaggio di oggetti avviene sempre per riferimento

    - Gli oggetti possono essere costituiti da tipi primitivi o da strutture piú complesse
        var numero      = new Object(12);
        var altroNumero = new Object(3*2);
        var stringa     = new Object("test");
        var persona     = new Object({nome: "Mario", cognome: "Rossi"});
      Essi hanno in comune alcuni metodi come toString() e valueOf()

    - Una funzione é in realtá un oggetto first class con oggetto base function

    - per cancellare una proprietá di un'oggetto si usa delete oggetto.proprieta

    - Il costruttore si crea con function Oggetto() le successive istanze con new var oggetto1 = new Oggetto(); 

    - Agendo sul prototipo si cambia la struttura del costruttore e di tutte le istanze Oggetto.prototype.nuovaProp = 'xxx' 
      Questo concetto sfrutta l'ereditarietá e le istanze attingono alla nuova proprietá del costruttore come se fosse loro

    - Il prototipo di un oggetto può a sua volta avere un altro prototipo. In questo caso la ricerca di una proprietà o di un metodo risale la catena dei prototipi fino ad arrivare all’oggetto Object, il prototipo base di tutti gli oggetti.

    - Possiamo aggiungere proprietá e metodi ai prototipi predefiniti. Ad esempio possiamo aggiungere un nuovo metodo al prototipo string String.prototype.padLeft = function(w, c){...}
      Ora il nuovo metodo si puó utilizzare su tutte le stringhe "xxx".padLeft(10, 'x')

    - Con Object.create() é possibile creare dei descrittori> data descriptor (proprietá predefinite come writable, configurable) e accessor description (funzioni getter e setter)

    - Reflection, é possibile analizzare la struttura e dati degli oggetti runtime. Esiste un oggetto Reflect

    - Proxy, la classe Proxy consente di creare oggetti che hanno la capacità di modificare il comportamento predefinito di altri oggetti.

    - Symbol() genera un valore univoco ma non accessibile

    - Si possono serializzare gli oggetti in JSON  con JSON.stringify() e deodificarli con JSON.parse()

    - PRINCIPI:
        - Encapsulation: Si, ma le propietá e metodi privati sono definiti come semplici variabili nel costruttore
        - Inheritance: Si, ma con modello diverso prima dell'introduzione delle classi
        - Polimorphism: Si, risulta implicito
        - Abstraction
    
    - Eccezioni: si gestiscono con try{ codice da provare }catch(e){ in caso di errore e.message e.name }finally{ da lanciare anche in caso di eccezioni}
      si possono generare eccezioni con throw
    */

