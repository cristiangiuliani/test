const   availableSeasons = [2009,2010,2011,2012,2013,2014,2015,2016,2017,2018],
        CACHE = {
            seasons: []
        };
    
function buildSeasonsList(){
    if(Array.isArray(availableSeasons) && availableSeasons.length > 0){
        let seasonsListRoot = document.getElementById('seasonsList'),
            html = '';
        availableSeasons.forEach((item, index)=>{
            html += `<li>
                        <a href="#" data-season="${item}" tabindex="${index}">
                            <i class="material-icons">keyboard_arrow_right</i>
                            ${item}
                            <i class="material-icons">keyboard_arrow_left</i>
                        </a>
                    </li>`;
        });
        html += '<li><i id="showFavorites" class="material-icons md-light hidden">favorite_border</i></li>';
        seasonsListRoot.innerHTML = html;
        seasonsListRoot.addEventListener('click', ()=>eventWrapper(event,()=>getSeason(event,null, renderSeason)), false);
    }
}
function eventWrapper(event,callback) {
    if (event.target !== event.currentTarget) {
        callback();
    }
    event.stopPropagation();
}

function httpHandler(type, url,callback){
    const Http = new XMLHttpRequest();
    let Data = {};
    Http.onreadystatechange = () => {
        if (Http.readyState == 4 && Http.status == 200) {
            try {
                Data = JSON.parse(Http.responseText);
            } catch(err) {
                console.log(err.message + " in " + Http.responseText);
                return;
            }
            callback(Data);
        }
    };
    console.log("http request");
    Http.open(type, url, true);
    Http.send();
}

function getSeason(event, season=null,callback){
    if(season===null) season = event.target.getAttribute('data-season');

    if(season!==null){
        let url = `http://ergast.com/api/f1/${season}/results/1.json`,
            content = document.getElementsByClassName("content")[0],
            menuItems = document.querySelectorAll('nav a');
        
        if(!CACHE.seasons.hasOwnProperty(season)){
            httpHandler("GET",url,Data=>{
                let races = Data.MRData.RaceTable.Races;
                callback(races);
                CACHE.seasons[season] = races;
                console.log('HTTP');
            });
        }else{
            callback(CACHE.seasons[season]);
            console.log('CACHE');
        }
        if(content.style.opacity == 0) content.style.opacity = 1;
        menuItems.forEach((item,index)=>{
            item.classList.remove("active");
        });
        event.target.classList.add("active");
    }
    toggleMobileMenu();
}

function renderSeason(races){
    let seasonRaces = document.getElementById('dataPlaceholder'),
        seasonId = "S"+races[0].season;
        html = `<h2>Season ${races[0].season}</h2>
                <div>
                    <table id="${seasonId}"  class="season">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th class="hide-mobile">Date</th>
                                <th class="hide-mobile">Location</th>
                                <th class="hide-mobile">Circuit</th>
                                <th class="hide-mobile">Winner</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>`,
        favorites = localStorage.getObj("favorites");
            
    races.forEach(race=>{
        html += seasonListTemplate(race);
    });
    html += `           </tbody>
                    </table>
                </div>`;
    seasonRaces.innerHTML = html;
    document.getElementById(seasonId).addEventListener('click', ()=>eventWrapper(event,()=>toggleFavorites(event)), false);
}

function toggleFavorites(){
    let season = event.target.getAttribute('data-season'),
        race = event.target.getAttribute('data-race'),
        favorites = localStorage.getObj("favorites"),
        favouritesStatus = "remove",
        btnFavoriteList = document.getElementById("showFavorites");
    if(event.target.innerHTML == "favorite"){
        if(checkFavorites(season, race)){
            favorites[season].splice(favorites[season].indexOf(race), 1);
            if(favorites[season].length == 0) delete favorites[season];
            favouritesStatus = "add";
        }else{
            if(!favorites.hasOwnProperty(season)) favorites[season] = [];
            favorites[season].push(race);
        }
        
        localStorage.setObj("favorites", favorites);
        event.target.className = `material-icons ${favouritesStatus}`;
        Object.keys(favorites).length > 0 ? btnFavoriteList.classList.remove('hidden') : btnFavoriteList.classList.add('hidden');
    }
}

function checkFavorites(season, race){
    if(localStorage.getItem("favoritesExist") === null){
        let tmpObj = {};
        
        localStorage.setObj("favorites", tmpObj);
        localStorage.setItem("favoritesExist","yes");
    } 
    let favorites = localStorage.getObj("favorites");
    
    
    if(favorites.hasOwnProperty(season)){
        if(favorites[season].indexOf(race)!==-1){
            return true;
        }
    }
    return false;
}

function renderFavorites(){
    let favorites = localStorage.getObj("favorites"),
        html = `<h2>Favorites List</h2>
                <div>
                    <table id="favoritesList" class="favorites">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th class="hide-mobile">Date</th>
                                <th class="hide-mobile">Location</th>
                                <th class="hide-mobile">Circuit</th>
                                <th class="hide-mobile">Winner</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>`;
    Object.keys(favorites).forEach(season=> {
        let races = CACHE.seasons[season];
        favorites[season].forEach(race=>{
            races.filter(item => {
                if(item.round === race) html += seasonListTemplate(item);
              });
            
        });
    });
    
    html += `           </tbody>
                    </table>
                </div>`;
    document.getElementById("dataPlaceholder").innerHTML = html;
    document.getElementById("favoritesList").addEventListener('click', ()=>eventWrapper(event,()=>toggleFavorites(event)), false);
}

function seasonListTemplate(race){
    let favouritesStatus = (checkFavorites(race.season, race.round)) ? "remove" : "add";
    html = `
                <tr>
                    <td class="text-center">
                        <span class="hide-favorites hide-mobile">${race.round}</span>
                        <span class="hide-season hide-mobile">${race.season}</span>
                        <i class="material-icons visible-mobile">info</i>
                    </td>
                    <td>${race.raceName}</td>
                    <td class="hide-mobile">${formatDate(race.date)}</td>
                    <td class="hide-mobile">${race.Circuit.Location.locality}, ${race.Circuit.Location.country}</td>
                    <td class="hide-mobile">${race.Circuit.circuitName}</td>
                    <td class="hide-mobile">${race.Results[0].Driver.givenName} ${race.Results[0].Driver.familyName}, ${race.Results[0].Constructor.name}</td>
                    <td><i class="material-icons ${favouritesStatus}" data-season="${race.season}" data-race="${race.round}">favorite</i></td>
                </tr>`;
    return html;
}

function formatDate(strDate){
    let objDate = new Date(strDate),
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        day = objDate.getDate() < 10 ? "0"+objDate.getDate() : objDate.getDate();

        return `${day} ${months[objDate.getMonth()]}`
}

function toggleMobileMenu(){    
    if(document.getElementById("mobileMenu").style.display != "none"){
        let mainMenu = document.getElementById("main");
        console.log(mainMenu.style.height);
        if(parseInt(mainMenu.style.height) == 0){
            mainMenu.style.height = "auto";
        }else{
            mainMenu.style.height = "0px";
        }
    }
}

window.onload = () => {
    buildSeasonsList();
    localStorage.clear();
    Storage.prototype.setObj = function(key, obj) {
        return this.setItem(key, JSON.stringify(obj))
    }
    Storage.prototype.getObj = function(key) {
        return JSON.parse(this.getItem(key))
    }
    document.getElementById("showFavorites").addEventListener('click', renderFavorites);
    document.getElementById("main").style.height = "0px";
    document.getElementById("mobileMenu").addEventListener('click', toggleMobileMenu);
};