function setType(type){
    if(type == 'employer'){
        document.getElementById("chb_student").checked = false
    }
    if(type == 'student'){
        document.getElementById("chb_employer").checked = false
    }
}