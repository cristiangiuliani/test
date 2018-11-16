const availableSeasons = [2009,2010,2011,2012,2013,2014,2015,2016,2017,2018],
    seasons = {};
    
function buildSeasonsList(){
    if(Array.isArray(availableSeasons) && availableSeasons.length > 0){
        let seasonsListRoot = document.getElementById('seasonsList');
        availableSeasons.forEach(item=>{
            let seasonNode = document.createElement('li'),
                nodeContent = document.createTextNode(item);
            seasonNode.appendChild(nodeContent);
            seasonsListRoot.appendChild(seasonNode);
            seasonNode.addEventListener('click',event => {
                alert(1);
            });
        })
    }else{

    }
}

function eventHandler(event){
    switch (event.type) {
        case 'click tap':
            
            break;
    
        default:
            break;
    }
}

window.onload = () => {
    buildSeasonsList();
};