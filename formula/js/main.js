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
        seasonsListRoot.addEventListener('click', ()=>eventWrapper(event,()=>getSeason(event,null, renderSeason)), false);
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

function getSeason(event, season=null,callback){
    if(season===null) season = event.target.getAttribute('data-season');
    let url = `http://ergast.com/api/f1/${season}/results/1.json`;
    
    if(CACHE.seasons[season] === undefined){
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
}

function renderSeason(races){
    let seasonRaces = document.getElementById('seasonRaces'),
        seasonId = "S"+races[0].season;
        html = `<table id="${seasonId}">`,
        favorites = localStorage.getObj("favorites");
            
    races.forEach(race=>{
        html += seasonListTemplate(race);
    });
    html += "</table>";
    seasonRaces.innerHTML = html;
    document.getElementById(seasonId).addEventListener('click', ()=>eventWrapper(event,()=>toggleFavorites(event)), false);
}

function toggleFavorites(){
    let season = event.target.getAttribute('data-season'),
        race = event.target.getAttribute('data-race'),
        favorites = localStorage.getObj("favorites");
        favoritesButton = "-";
    
    if(checkFavorites(season, race)){
        favorites[season].splice(favorites[season].indexOf(race), 1);
        if(favorites[season].length == 0) delete favorites[season];
        favoritesButton = "+";
    }else{
        if(!favorites.hasOwnProperty(season)) favorites[season] = [];
        favorites[season].push(race);
    }
    localStorage.setObj("favorites", favorites);
    event.target.innerHTML = favoritesButton;
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
        html = "<table>";
    Object.keys(favorites).forEach(season=> {
        let races = CACHE.seasons[season];
        favorites[season].forEach(race=>{
            races.filter(item => {
                if(item.round === race) html += seasonListTemplate(item);
              });
            
        });
    });
    
    html += "</table>";
    document.getElementById("racesFavorites").innerHTML = html;
}

function seasonListTemplate(race){
    let favoritesButton = (checkFavorites(race.season, race.round)) ? "-" : "+";
    html = `
                <tr>
                    <td>${race.round}</td>
                    <td>${race.raceName}</td>
                    <td>${race.date}</td>
                    <td>${race.Circuit.circuitName}</td>
                    <td>${race.Circuit.Location.locality}, ${race.Circuit.Location.country}</td>
                    <td>${race.Results[0].Driver.givenName} ${race.Results[0].Driver.familyName}</td>
                    <td>${race.Results[0].Constructor.name}</td>
                    <td><button class="add-fav" data-season="${race.season}" data-race="${race.round}">${favoritesButton}</button></td>
                </tr>`;
    return html;
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
};