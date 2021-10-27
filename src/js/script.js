const urlBase = 'https://jsonplaceholder.typicode.com';
const loaderContainer = document.querySelector('.loader');
let users = null;
let posts = null;
let comments = null;
let containerBox = document.getElementById("containerBox");
let userNameBox = document.getElementById("userNameBox")
let i = 0;
let page = 1;

function getUsers(uri){
    let requestUser = new XMLHttpRequest();
    requestUser.open("GET", urlBase + uri, false);
    requestUser.send();

    return requestUser.responseText
}

function getPosts(uri){
    let requestPosts = new XMLHttpRequest();
    requestPosts.open("GET", urlBase + uri, false);
    requestPosts.send();
    
    return requestPosts.responseText
}

function getComments(uri){
    let requestComments = new XMLHttpRequest();
    requestComments.open("GET", urlBase + uri, false);
    requestComments.send();

    return requestComments.responseText
}

function generatePosts(posts){   

    let divCont = document.createElement('div');
    divCont.className = 'container';

    let userId = document.createElement('h3')
    let userIdName = document.createTextNode(posts.userId)

    let postsBox = document.createElement('h2');
    let postsName = document.createTextNode(posts.body);
    
    let commentsBox = document.createElement('div')
    
  
    divCont.appendChild(userId)

    userId.setAttribute('class','userBox');
    userId.appendChild(userIdName);

    divCont.appendChild(postsBox)

    postsBox.setAttribute('class','postBox');
    postsBox.appendChild(postsName);
    
    divCont.appendChild(commentsBox);

    for(i = 0; i < posts.comments.length; i++){
        
        let commentsElement = document.createElement('h4')
    
        let commentName = document.createTextNode(posts.comments[i].body)

        commentsBox.setAttribute('class', 'commentBox');

        commentsBox.appendChild(commentsElement)
        commentsElement.appendChild(commentName)


    }

    return divCont;
}


function getPostsByUserId(id){
    var dataPosts = getUsers('/posts?userId=' + id);

    return JSON.parse(dataPosts);
}

function getCommentsByPosts(id){
    var dataComments = getPosts('/comments?postId=' + id);
    return JSON.parse(dataComments)
}



function main(){
    let dataPosts = getPosts('/posts?_limit=5&_page='+page);
    posts = JSON.parse(dataPosts);

    let dataComments = getComments("/comments")
    comments = JSON.parse(dataComments)

    posts.forEach(element => {
        element.users = getPostsByUserId(element.id);
        element.comments = getCommentsByPosts(element.id);
    });
 
    posts.forEach(element => {
        containerBox.appendChild(generatePosts(element));
    }) 

}
window.addEventListener('scroll', () => {
    
    if(window.scrollY + window.innerHeight >= document.documentElement.scrollHeight, page++){
     main();
    }
})

main()





