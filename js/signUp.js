var userType = 's';


function setType(type){
    if(type == 'employer'){
        document.getElementById("chb_student").checked = false
        userType = 'e'
    }
    if(type == 'student'){
        document.getElementById("chb_employer").checked = false
        userType = 's'
    }
}

function signUp(){

    alert("this");
}