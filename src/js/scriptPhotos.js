const urlBase = 'https://jsonplaceholder.typicode.com';
let containerPhotos = document.getElementById("containerPhotos");
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


function generatePhotos(albumId){
    let photos = JSON.parse(getPhotos('/photos?albumId='+albumId));
    console.log(photos);
    let divCont = document.createElement('div');
    divCont.className = 'photoContainer';

    for(var i = 0; i<photos.length;i++){
        let img = new Image(200,200);
        img.src = photos[i].url;
        divCont.appendChild(img)
    }
    
    return divCont;
}

// function generateAlbumTitle(album){
//     let listItems = document.createElement('ul');
//     listItems.className = 'album-list-item';

//     let listItem = document.createElement('li');
    
//     // Adiciona o titulo
//     let titleItem = document.createElement('h2');
//     titleItem.appendChild(document.createTextNode(album.title));
//     listItem.appendChild(titleItem);
//     listItem.setAttribute("onclick", `showPhotos(${album.id})`);

//     listItems.appendChild(listItem);

//     return listItems;
// }

function getPhotosByAlbum(albumId){
    var dataPhotos = getPhotos('/photos?albumId=' + albumId);
    return JSON.parse(dataPhotos);
}

function goBack() {
    window.history.back()
}


function showPhotos(elementId){
    
    document.getElementById("photos").innerHTML = "";
    document.getElementById("photos").appendChild();
    document.getElementById("photos").style.display = "block";
}

function main(){    
    // let dataPhotos = getPhotos(albumId);  
    // photos = JSON.parse(dataPhotos);
    let albumId = document.location.href.split('?albumId=')[1];
    document.getElementById("containerPhotos").appendChild(generatePhotos(albumId));
    // photos.forEach(element => {
    //     // Renderizando 
    //     containerPhotos.appendChild(generateAlbumTitle(element));
    // });  

}




main()