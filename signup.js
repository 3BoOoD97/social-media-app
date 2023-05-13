let email= document.getElementById("email");
let password= document.getElementById("password");
let name= document.getElementById("userName");
let signupBtn = document.getElementById("signupBtn");




signupBtn.addEventListener("click", function(){
    validate();
}); 

function validate(){
    if(email.value.trim()=="" || password.value.trim()=="" || name.value.trim()==""){
        alert("Fields cannot be empty");
        return false;
    } else if(password.value.trim().length<8){
        alert("Password must be at least 8 characters");
        return false;
    }
    else if(email.value.trim().indexOf("@")<0){
        alert("Email must contain @");
        return false;
    }
    else if(email.value.trim().indexOf(".")<0){
        alert("Email must contain .");
        return false;
    }
    else{
        showSuccessMsg();
        true;
       // window.location.href = "login.html";
    }
}

function showSuccessMsg(){
    document.getElementById("successMsg").style.display = "block";
}