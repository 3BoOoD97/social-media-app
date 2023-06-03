let postsCard = document.getElementById('posts');
let loginBtn= document.getElementById("loginBtn");
let registerBtn= document.getElementById("registerBtn");
let logoutBtn= document.getElementById("logoutBtn");
let userIcon = document.getElementById("userIcon");
let userIconImg = document.getElementById("userIconImg");
let userName = document.getElementById("userName");
//Create post inputs elements
let addIcon = document.getElementById("addIcon");
let postTitleInput = document.getElementById("postTitle");
let postBodyInput = document.getElementById("createPostBody");
let postImgInput = document.getElementById("createPostImg");
let createBtn = document.getElementById("createBtn");
//Clicked post modal elements
let clickedPostTitle = document.getElementById("clickedPostTitle");
let clickedPostImg = document.getElementById("clickedPostImg");
let clickedPostBody = document.getElementById("clickedPostBody");
let bottomOfPage= false;
let pageIndex = 1;
let clickedPostId = 0;
const baseURL = "https://tarmeezacademy.com/api/v1";
let currentPost;
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

// Check if the user is at the bottom of the page
window.onscroll = function bottom(ev) {
  if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
    bottomOfPage = true;
    pageIndex++;
    getPosts(pageIndex);
  } else {
    bottomOfPage = false;
  }
};

// Get the posts as soon as the page loads
async function getPosts(pageIndex) {
  try {
    const response = await axios.get('https://tarmeezacademy.com/api/v1/posts?limit=2&page=' + pageIndex);
    const posts = response.data.data;
    for (post of posts) {
      // console.log(post);
      postTitle = '';

      // Give the user a default profile image if they don't have one
      if (!Object.keys(post.author.profile_image).length) {
        post.author.profile_image = 'https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png';
      }

      // Give the post a title to display it in the card if it has a value only
      if (post.title != null) {
        postTitle = post.title;
      }

      // Display the posts
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
            <a
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
            class="icon-link"
            href="#"
            onclick="clickedPost('${post.id}')"
          >${post.comments_count} Comments</a>
          </div>
        </div>
      `;
    }
  } catch (error) {
    console.error(error);
  }
}



// Display the clicked post in a modal
function clickedPost(id) {
  // Access the post data and perform actions
  console.log('Clicked post:', id);
  clickedPostId = id;
  const url = baseURL+'/posts/'+ id;


  // If the user is not logged in, disable the comment textarea and hide the add comment button
  if(unauthorized()){
    console.log("unauthorized");
   var commentBody=  document.getElementById("commentBody")
   commentBody.className = "disabledTextarea";
    commentBody.placeholder = "Please login to add a comment";
  var btn=  document.getElementById("addCommentBtn");
  btn.style.display = "none"; 
  }

  axios.get(url)
    .then(function (response) {
      // handle success
      console.log(response.data.data.author.profile_image);
      clickedPostImg.src = response.data.data.image;
      clickedPostTitle.innerHTML = response.data.data.title;
      clickedPostBody.innerHTML = response.data.data.body;
      currentPost = response.data.data;
      const user= JSON.parse(localStorage.getItem("user"));

      // Hide edit icon by default
      document.getElementById("editIcon").style.display = "none";
      // Hide delete icon by default
      document.getElementById("deleteIcon").style.display = "none";

      // Show edit icon if the user is the author of the post
      if(user.id === response.data.data.author.id){
       
        document.getElementById("editIcon").style.display = "block";
        document.getElementById("deleteIcon").style.display = "block";

      }
     
      // Display the comments
      const comments = response.data.data.comments;
      document.getElementById("comments").innerHTML = "";
      for (comment of comments) {
        if (!Object.keys(comment.author.profile_image).length) {
          comment.author.profile_image = 'https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png';
        }
        if (comment.author.name==user.name) {
        document.getElementById("comments"
        ).innerHTML += `
        <li class="list-group-item bg-light"> <img src="${comment.author.profile_image}" alt="" style="height: 50px; border-radius: 20px" /> <strong>@${comment.author.name}:</strong>
        ${comment.body}</li>
      `;
      }
      else{
        document.getElementById("comments"
        ).innerHTML += `
        <li class="list-group-item" > <img src="${comment.author.profile_image}" alt="" style="height: 50px; border-radius: 20px" /> <strong>@${comment.author.name}:</strong>
        ${comment.body}</li>
      `;
    }
  }
  if (!Object.keys(response.data.data.author.profile_image).length) {
    response.data.data.author.profile_image = 'https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png';
  }
  document.getElementById("authorImg").src = response.data.data.author.profile_image;
  document.getElementById("authorName").innerHTML = response.data.data.author.name;
      document.getElementById("currentUserNamePost").innerHTML = `
      <h5 class="modal-title" id="staticBackdropLabel" ><strong>@${user.name}</strong></h5>
      `;
      if (!Object.keys(user.profile_image).length) {
        user.profile_image = 'https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png';
      }
        document.getElementById("userProfileImg").src = `${user.profile_image}
      `;

    })
}

function unauthorized(){
  if (!localStorage.getItem("token")) {
    return true;
  }
  return false;
}

    
function defaultProfileImage(img) {
  if (!Object.keys(img).length) {
    img = 'https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png';
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



//add comment
function addNewComment(){
  let commentBody = document.getElementById("commentBody").value;

  const url =`${baseURL}/posts/${clickedPostId}/comments`;
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    "authorization": `Bearer ${token}`
  }

  axios.post(url, {body: commentBody}, { headers: headers })
  .then(function (response) {
    // handle success
    console.log(response);
    clickedPost(clickedPostId);
    }
  )
  .catch(function (error) {
    // handle error
    console.log(error);
  }
  )
}


function editPost(){
  // Hide show post Modal
  var myModalEl = document.getElementById("staticBackdrop");
  var modal = bootstrap.Modal.getInstance(myModalEl)
  modal.hide();
  // Show edit post Modal
  var modals = document.getElementById('editPostModal');
  modals.classList.add('show');
  modals.style.display = 'block';
    document.body.classList.add('modal-open');
  console.log(currentPost);
  console.log(currentPost.image);
  document.getElementById("editPostTitle").value = currentPost.title;
  document.getElementById("editPostBody").value = currentPost.body;
  document.getElementById("editPostImg").src = currentPost.image;


  
}

async function updatePost(){
  
    
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "multipart/form-data",
      "authorization": `Bearer ${token}`
    }

    let formData = new FormData();
  formData.append("_method", "put");
    formData.append("body", document.getElementById("editPostBody").value);
    formData.append("title", document.getElementById("editPostTitle").value);
    formData.append("image", document.getElementById("editPostImg").files[0]);
    
   const  url= `${baseURL}/posts/${clickedPostId}`; 
   axios.post(url,formData,{ headers: headers })
    .then(function (response) {
      // handle success
      console.log("Updated");
      console.log(response);
      document.getElementById("successEditAlert").style.display = "block";
      document.getElementById("successEditAlert").innerHTML = "Post Updated Successfully";


      setTimeout(() => {
      window.location.href = 'index.html';
    }, 3000);
    })
  .catch(function (error) {
    // handle error
    document.getElementById("failedEditAlert").style.display = "block";
    document.getElementById("failedEditAlert").innerHTML = error.response.data.message;
  }
  )
}


function showModal(modal){
  var modals = document.getElementById(modal);
  modals.classList.add('show');
  modals.style.display = 'block';
  document.body.classList.add('modal-open');
}

function hideModal(modal){
  var modals = document.getElementById(modal);
  modals.classList.remove('show');
  modals.style.display = 'none';
  document.body.classList.remove('modal-open');
}

function deletePost(){
  let url = `${baseURL}/posts/${clickedPostId}`;

  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    "authorization": `Bearer ${token}`
  }
  axios.delete(url, { headers: headers })
  .then(function (response) {
    // handle success
    console.log(response);
  
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 3000);
  }
  )
  .catch(function (error) {
    // handle error
    console.log(error);

  }
  )
}

setupUI();
getPosts();




