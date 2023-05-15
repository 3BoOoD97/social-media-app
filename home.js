let postsCard = document.getElementById('posts');

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

getPosts();