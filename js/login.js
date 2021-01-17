var baseURL = "http://127.0.0.1:9090";

function login(){

    var userType = document.getElementById("userTypeInput").value;
    var email = document.getElementById("emailInput").value;
    var passwd = document.getElementById("passwdInput").value;

    if(email == ""){
        alert("E-mail is required !");
    } else if(passwd == ""){
        alert("Password is required !");
    } 
    // inputs are are all filled
    else {
        // send login request

        var finalURL;

        if(userType == "s"){
            var finalURL = baseURL + "/slogin?" + "email=" + email + "&pw=" + passwd;
        } else {
            var finalURL = baseURL + "/clogin?" + "email=" + email + "&password=" + passwd;
        }

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST",finalURL,false);
        xmlhttp.onreadystatechange = function() {
            if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
                var response = JSON.parse(xmlhttp.responseText);
                if(response.id > 0){
                    // saving user id to session storage
                    sessionStorage.setItem('userID', response.id);  // SO IMPORTANT
                    if(userType == "s"){
                        // go to students main page
                        window.location.href = "./mainPageStudent.html";
                    } else {
                        // go to company main page
                        window.location.href = "./mainPageCompany.html";
                    }
                } else {
                    alert("Wrong username of password!");
                }
            }
        };
        xmlhttp.send();
        
    }   
    
}
