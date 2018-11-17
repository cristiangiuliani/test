const   availableSeasons = [2009,2010,2011,2012,2013,2014,2015,2016,2017,2018],
        CACHE = {
            seasons: []
        };
    
function buildSeasonsList(){
    if(Array.isArray(availableSeasons) && availableSeasons.length > 0){
        let seasonsListRoot = document.getElementById('seasonsList'),
            html = '';
        availableSeasons.forEach(item=>{
            html += `<li data-season="${item}">${item}</li>`;
        });
        seasonsListRoot.innerHTML = html;
        seasonsListRoot.addEventListener('click', ()=>eventWrapper(event,()=>getSeason(event)), false);
    }else{

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
 
    Http.open(type, url, true);
    Http.send();
}

function getSeason(event){
    let season = event.target.getAttribute('data-season'),
        url = `http://ergast.com/api/f1/${season}/results/1.json`;
    
    if(CACHE.seasons[season] === undefined){
        httpHandler("GET",url,Data=>{
            let races = Data.MRData.RaceTable.Races;
            renderSeason(races);
            CACHE.seasons[season] = races;
            console.log('HTTP');
        });
    }else{
        renderSeason(CACHE.seasons[season]);
        console.log('CACHE');
    }
    console.log(CACHE);
}

function renderSeason(races){
    let seasonRaces = document.getElementById('seasonRaces'),
        html = "<table>",
        favorites = localStorage.getObj("favorites"),
        button = ()=>{
            (favorites)
        };
            
    races.forEach(race=>{
        html += `
                <tr>
                    <td>${race.round}</td>
                    <td>${race.raceName}</td>
                    <td>${race.date}</td>
                    <td>${race.Circuit.circuitName}</td>
                    <td>${race.Circuit.Location.locality}, ${race.Circuit.Location.country}</td>
                    <td>${race.Results[0].Driver.givenName} ${race.Results[0].Driver.familyName}</td>
                    <td>${race.Results[0].Constructor.name}</td>
                    <td><button class="add-fav" data-season="${race.season}" data-race="${race.round}">+</button></td>
                </tr>`;
    });
    html += "</table>";
    seasonRaces.innerHTML = html;
    seasonRaces.addEventListener('click', ()=>eventWrapper(event,()=>toggleFavorites(event)), false);
}

function toggleFavorites(){
    let season = event.target.getAttribute('data-season'),
        race = event.target.getAttribute('data-race');
        
    if(localStorage.getItem("favoritesExist") === null){
        let tmpObj = {};
        
        localStorage.setObj("favorites", tmpObj);
        localStorage.setItem("favoritesExist","yes");
    } 
    let favorites = localStorage.getObj("favorites");
    if(!favorites.hasOwnProperty(season)){
        favorites[season] = [race];
        localStorage.setObj("favorites", favorites);
    }else{
        if(favorites[season].includes(race)){
            favorites[season].splice(favorites[season].indexOf(race), 1);
            if(favorites[season].length == 0) delete favorites[season];
        }else{
            favorites[season].push(race);
        }
    }
    localStorage.setObj("favorites", favorites);
    console.log(localStorage.getObj("favorites"));
}

function checkFavorites(season, race){
    if(localStorage.getItem("favoritesExist") === null){
        let tmpObj = {};
        
        localStorage.setObj("favorites", tmpObj);
        localStorage.setItem("favoritesExist","yes");
    } 
    let favorites = localStorage.getObj("favorites");
    if(favorites.hasOwnProperty(season)){
        if(favorites[season].includes(race)){
            return true;
        }
    }
    return false;
}

window.onload = () => {
    buildSeasonsList();
    Storage.prototype.setObj = function(key, obj) {
        return this.setItem(key, JSON.stringify(obj))
    }
    Storage.prototype.getObj = function(key) {
        return JSON.parse(this.getItem(key))
    }
};