var baseURL = "http://127.0.0.1:9090";

function signUp(){

    var userType = document.getElementById("userTypeInput").value;
    var fullname = document.getElementById("fullnameInput").value;
    var email = document.getElementById("emailInput").value;
    var passwd = document.getElementById("passwdInput").value;
    var cpasswd = document.getElementById("confirmPasswdInput").value;


    if(fullname == ""){
        alert("Fullname is required !");
    } else if(email == ""){
        alert("E-mail is required !");
    } else if(passwd == ""){
        alert("Password is required !");
    } else if(cpasswd == ""){
        alert("Confirm Password is required !");
    } 
    // inputs are are all filled
    else {
        if(passwd != cpasswd){
            alert("Passwords don't match !");
        } else {
            // send signup request

            var finalURL;

            if(userType == "s"){
                finalURL = baseURL + "/ssignup?" + "name=" + fullname + "&email=" + email + "&pw=" + passwd;
            } else {
                finalURL = baseURL + "/esignup?" + "name=" + fullname + "&email=" + email + "&pw=" + passwd;
            }

            var xmlhttp = new XMLHttpRequest();
            xmlhttp.open("POST",finalURL,false);
            xmlhttp.onreadystatechange = function() {
                if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
                    console.log("success");
                    showModalSignUpSuccess();
                }
            };
            xmlhttp.send();
        }
    }   
    
}

function showModalSignUpSuccess(){
    // set innerHtml of modal
    document.getElementById("successModal").innerHTML =
        '<div class="modal-dialog"><div class="modal-content">'+
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLabel">Welcome To PlaDat</h5>' +
        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
        '</div>' +
        '<div class="modal-body">'+



            '<p>Account created succesfully.</p>'+
       
       
        '</div>'+
        '<div class="modal-footer">'+
        '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="window.location.href=\'./login.html\';">Okay</button>'+
        '</div>'+
        '</div>'+
        '</div>';
    $('#successModal').modal('show')

};