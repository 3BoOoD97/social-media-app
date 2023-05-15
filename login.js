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
    } else if(password.value.trim().length<8){
        alert("Password must be at least 8 characters");
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
        window.location.href = 'index.html';

       
    } catch (error) {
        console.log(error);
        alert("Invalid username or password");
    }
}


//ali97
//15001500a