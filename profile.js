

const token = localStorage.getItem("token");
const user = JSON.parse(localStorage.getItem("user"));

let userPostsCard = document.getElementById("userPostsCard");

console.log(user);

function getCurrentUserId() {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");
  console.log(userId);
  return userId;
}


function setupProfile(){
    const id = getCurrentUserId();

    axios.get(`${baseURL}/users/${id}`)
    .then((response) => {
      const user = response.data.data;

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
})
.catch((error) => {
    console.log(error);
});
}



async function getUserPosts(){
  try {
  const url = `${baseURL}/users/${getCurrentUserId()}/posts`;
  const response = await axios.get(url)
  const posts = response.data.data;
  console.log(posts);

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
    userPostsCard.innerHTML += `
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
}
}

  setupUI();
setupProfile();
getCurrentUserId()
getUserPosts()