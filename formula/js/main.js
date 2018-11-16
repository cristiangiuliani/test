const availableSeasons = [2009,2010,2011,2012,2013,2014,2015,2016,2017,2018],
    seasons = {};
    
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
    
    httpHandler("GET",url,Data=>{
        let races = Data.MRData.RaceTable.Races,
            seasonRaces = document.getElementById('seasonRaces'),
            html = "<table>";
        console.log(Data);
        
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
                    </tr>`;
        });
        html += "</table>";
        seasonRaces.innerHTML = html;
    });

}


window.onload = () => {
    buildSeasonsList();
};