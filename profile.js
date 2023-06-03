
setupUI();

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));


setupUI();

console.log(user);



function setupProfile(){
    
    if (!Object.keys(user.profile_image).length) {
        user.profile_image = 'https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png';
      }

    document.getElementById("userImg").src = user.profile_image;
    document.getElementById("uName").innerHTML = user.username
    ;
    document.getElementById("name").innerHTML = user.name;
    document.getElementById("userEmail").innerHTML = user.email;

    document.getElementById("postsCount").innerHTML = user.posts_count

    document.getElementById("commentsCount").innerHTML = user.comments_count;
    ;

   
}

setupProfile();