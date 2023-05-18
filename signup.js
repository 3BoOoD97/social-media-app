let UName= document.getElementById("username");
let name= document.getElementById("name");
let password= document.getElementById("password");
let signupBtn = document.getElementById("signupBtn");
const baseURL = "https://tarmeezacademy.com/api/v1";




signupBtn.addEventListener("click", function(){
    //validate();
    hideErrorMsg();
    hideSuccessMsg();
    register();
  
}); 

/** No need for this function since the API can handle the errors 

function validate(){
    if(UName.value.trim()=="" || password.value.trim()=="" || name.value.trim()==""){
        alert("Fields cannot be empty");
        return false;
    } else if(password.value.trim().length<7){
        alert("Password must be at least 6 characters");
        return false;
    }
    else if(UName.value.trim().length<3){
        alert("Username must be at least 3 characters");
        return false;
    }
    else{
        console.log("success");
        showSuccessMsg();
        true;
       // window.location.href = "login.html";
    }
}
*/

function showSuccessMsg(){
    document.getElementById("successMsg").style.display = "block";
}

function showErrorMsg(errorMsg){
    document.getElementById("errorMsg").style.display = "block";
    document.getElementById("errorMsg").innerHTML = errorMsg;
}

function hideSuccessMsg(){
    document.getElementById("successMsg").style.display = "none";
}

function hideErrorMsg(){
    document.getElementById("errorMsg").style.display = "none";
}

async function register(){
    try{
        
        const response = await axios.post(`${baseURL}/register`, {
            username: UName.value,
            password: password.value,
            name: name.value
        });
        const user = response.data;
        console.log(user);
        console.log(user.token);
        localStorage.setItem("token", user.token);
        localStorage.setItem("user", JSON.stringify(user.user));
        //window.location.href = 'login.html';
        showSuccessMsg();
    } catch (error) {
       // console.log(error.response.data);  
        let errorMsg = error.response.data.message;
        showErrorMsg(errorMsg);       
    }
}
