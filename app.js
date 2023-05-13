let email= document.getElementById("email");
let password= document.getElementById("password");
let loginBtn= document.getElementById("loginBtn");



loginBtn.addEventListener("click", function(){
    validate();
});

function validate(){
    if(email.value.trim()=="" || password.value.trim()==""){
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
        true;
    }
}