let postsCard = document.getElementById('posts');
let loginBtn= document.getElementById("loginBtn");
let registerBtn= document.getElementById("registerBtn");
let logoutBtn= document.getElementById("logoutBtn");
let userIcon = document.getElementById("userIcon");
let userIconImg = document.getElementById("userIconImg");
let addIcon = document.getElementById("addIcon");
let userName = document.getElementById("userName");
let postTitleInput = document.getElementById("postTitle");
let postBodyInput = document.getElementById("createPostBody");
let postImgInput = document.getElementById("createPostImg");
let createBtn = document.getElementById("createBtn");
const baseURL = "https://tarmeezacademy.com/api/v1";

// Sticky Navbar
function stickynavbar() {
const navbar = document.getElementById("navbar")
let top = navbar.offsetTop;

  if (window.scrollY >= top) {    
    navbar.classList.add('sticky');
  } else {
    navbar.classList.remove('sticky');    
  }
  window.addEventListener('scroll', stickynavbar);

}


// Get the posts as soon as the page loads
async function getPosts() {
  try {
    const response = await axios.get('https://tarmeezacademy.com/api/v1/posts?limit=5');
    const posts = response.data.data;
    for (post of posts){
     console.log(post);
      postTitle='';
      //Give the user a default profile image if they don't have one
      if(!Object.keys(post.author.profile_image).length){
        post.author.profile_image=  'https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png';
    }
    //Give the post a title to display it in the card if it has a value only
    if (post.title != null){
      postTitle = post.title;
    }
      postsCard.innerHTML += `
     <div class="card shadow" style="width: 61rem; margin-top: 30px">
        <div class="card-header" style="height: 80px">
          <img
            src="${post.author.profile_image}"
            alt=""
            style="height: 50px; border-radius: 20px"
          />
          <a
            href=""
            style="
              color: rgb(5, 5, 5);
              text-decoration: none;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              font-weight: bold;
              font-size: 20px;
            "
            >@${post.author.name}</a
          >
        </div>
        <img
          src="${post.image}"
          class="card-img-top"
          height="400px"
        />
        <h6 style="color: rgb(182, 164, 164)" class="mt-1">${post.created_at}</h6>
        <div class="card-body">
          <h5 class="card-title">${postTitle}</h5>
          <p class="card-text">
            ${post.body}
          </p>
        </div>
        <div class="list-group"></div>
        <div class="card-body">
          <i class="fa-sharp fa-regular fa-comments" style="color: #0e5abe"></i>
          <a class="icon-link" href="#">${post.comments_count} Comments </a>
        </div>
      </div>
     `
    }
    
  } catch (error) {
    console.error(error);
  }
}

// Setup the UI depending on if the user is logged in or not
function setupUI(){
  const token= localStorage.getItem("token");
  const user= JSON.parse(localStorage.getItem("user"));
  //If the user is logged in, hide the login and register buttons
  if(token){
   console.log(user);
    loginBtn.style.display="none";
    registerBtn.style.display="none";
    userIcon.style.display="block";
    userIconImg.src=user.profile_image;
    addIcon.style.display="block";
    userName.innerHTML=user.name;

    if(!Object.keys(user.profile_image).length){
      user.profile_image=
      document.getElementById("userIconImg").src =  'https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png';
    }
  }

  //If the user is not logged in, hide the logout button
  else{
    logoutBtn.style.display="none";
    userIcon.style.display="none";
    addIcon.style.display="none";
  }
}

// Log the user out
function logout(){
  window.location.href = 'index.html';
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

// Show the success message
function showSuccessMsg(){
  document.getElementById("successMsg").style.display = "block";
 // const myTimeout = setTimeout(hideMsg, 9000);
}

// Show the error message
function showErrorMsg(errorMsg){
  document.getElementById("errorMsg").style.display = "block";
  document.getElementById("errorMsg").innerHTML = errorMsg;

}

//hide the message
function hideMsg(){
  document.getElementById("successMsg").style.display = "none";
  document.getElementById("errorMsg").style.display = "none";
}

// Create a new post
async function createNewPost(){

  hideMsg();
  try{
    let formData = new FormData();
    formData.append("body", postBodyInput.value);
    formData.append("title", postTitleInput.value);
    formData.append("image", postImgInput.files[0]);

    const url =`${baseURL}/posts`;
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "multipart/form-data",
      "authorization": `Bearer ${token}`
    }
    console.log(token);

    const response = await axios.post(url,formData,{ headers: headers });
    console.log(response);
    
    console.log("response");
    showSuccessMsg();
    setTimeout(function () {
      window.location.href = 'index.html';
      }, 3000)

} catch (error) {
    console.log(error.response.data.message);
    showErrorMsg(error.response.data.message)
}
}

setupUI();
getPosts();