const username= document.getElementById("username");
const password= document.getElementById("password");
let loginBtn= document.getElementById("loginBtn");
const baseURL = "https://tarmeezacademy.com/api/v1";


loginBtn.addEventListener("click", function(){
  validate();
  login();
});



function validate(){
    if(username.value.trim()=="" || password.value.trim()==""){
        alert("Fields cannot be empty");
        return false;
    } else if(password.value.trim().length<3){
        alert("Password must be at least 4 characters");
        return false;
    }
    else if(username.value.trim().length<3){
        alert("Username must be at least 3 characters");
        return false;
    }
    else{
        true;
    }
}


async function login(){
    try{
        
        const response = await axios.post(`${baseURL}/login`, {
            username: username.value,
            password: password.value
        });
        const user = response.data;
        console.log(user);
        console.log(user.token);
        localStorage.setItem("token", user.token);
        localStorage.setItem("user", JSON.stringify(user.user));
        window.location.href = 'index.html';
        
       
    } catch (error) {
        console.log(error);
        alert("Invalid username or password");
    }
}

async function getAllUsers(){
    let counter = 0;
    const url = baseURL+"/users"; 
    const response = await axios.get(url);
    const users = response.data.data;
    for (user of users){
        counter++;
    }
    console.log(counter);
}
getAllUsers();

//ali97
//15001500a