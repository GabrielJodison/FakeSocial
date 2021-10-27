const urlBase = 'https://jsonplaceholder.typicode.com';
let containerGrid = document.getElementById("containerGrid");
let albums = null;
let photos = null;

function getAlbums(uri){
    let requestAlbum = new XMLHttpRequest();
    requestAlbum.open("GET", urlBase + uri, false);
    requestAlbum.send();


    return requestAlbum.responseText;
}

function getPhotos(uri){
    let requestPhoto = new XMLHttpRequest();
    requestPhoto.open("GET", urlBase + uri, false);
    requestPhoto.send();


    return requestPhoto.responseText;
}



function generateAlbum(albums){
    let divCont = document.createElement('div');
    divCont.className = 'gridContainer';

    let divAlbum = document.createElement('div');
    let linkAlbum = document.createElement('a');
    
    let textAlbum = document.createElement('p')
    let titleAlbum = document.createTextNode(albums.title)

    let idAlbum = document.createElement('p')
    let idAlbumName = document.createTextNode(albums.userId)

    linkAlbum.setAttribute('href', 'fotos.html?albumId='+albums.id);
    
    divCont.appendChild(linkAlbum);

    linkAlbum.appendChild(divAlbum);
    divAlbum.setAttribute('class', 'gridItem');

    divAlbum.appendChild(textAlbum);

    textAlbum.setAttribute('class','titleAlbum');
    textAlbum.appendChild(titleAlbum);

    divAlbum.appendChild(idAlbum);

    idAlbum.setAttribute('class','titleAlbum');
    idAlbum.appendChild(idAlbumName);


    return divCont;
}

function getAlbumId(id){
    var dataAlbums = getAlbums('/albums?userId=' + id);

    return JSON.parse(dataAlbums);
}


function main(){
    let dataAlbums = getAlbums("/albums");
    albums = JSON.parse(dataAlbums);
    
    let dataPhotos = getAlbums("/photos");  
    photos = JSON.parse(dataPhotos);


    // Preenchendo postagens
    albums.forEach(element => {
        element.photos = getAlbumId(element.id);
    });
 
    // Renderizando 
    albums.forEach(element => {
        containerGrid.appendChild(generateAlbum(element));
    }) 

 
}


main()