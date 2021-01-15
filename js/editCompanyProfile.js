var baseURL = "http://127.0.0.1:9090";
var jobsTableCounter = 0;

function getUserId(){
    const USER_ID = sessionStorage.getItem('userID');
    return USER_ID;
}

window.onload = function(){

    var userId = getUserId();
    
    var finalURL = baseURL + "/company_detail?" + "company_id=" + userId;

    var job_list;
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",finalURL,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var response = JSON.parse(xmlhttp.responseText);

            if(response.name != null){
                document.getElementById("name").value = response.name;
            }
            if(response.excdob != null){
                var splitArr = response.excdob;
                splitArr = splitArr.split(" ");
                var dob = splitArr[0] + " " + splitArr[1] + " " + splitArr[2] + " " + splitArr[3];
                document.getElementById("excdob").value = dob;
            }
            if(response.excname != null){
                document.getElementById("excname").value = response.excname;
            }
            if(response.excid != null){
                document.getElementById("excid").value = response.excid;
            }
            if(response.email != null){
                document.getElementById("email").value = response.email;
            }
            if(response.city_id != null){
                var city_details = searchCityById(response.city_id);
                document.getElementById("city").value = city_details[0];
                document.getElementById("country").value = city_details[1];
            }
            if(response.job_lis != null){
                job_list = response.job_lis;
            }
        }
    };
    xmlhttp.send();

    for (let index = 0; index < job_list.length; index++) {

        var job_desc;
        var job_location;
        var job_emp_type;

        var finalURL = baseURL + "/job_details?" + "job_id=" + job_list[index];

        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET",finalURL,false);
        xmlhttp.onreadystatechange = function() {
            if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
                var response = JSON.parse(xmlhttp.responseText);
                job_desc = response.job_desc
                job_location = response.city;
                job_emp_type = response.emp_type;
            }
        };
        xmlhttp.send();

        jobsTableCounter += 1;

        var jobsTableRow;
        jobsTableRow = '<tr><th scope="row">';
        jobsTableRow += jobsTableCounter.toString();
        jobsTableRow += '</th><td>';
        jobsTableRow += job_desc;
        jobsTableRow += '</td><td>';
        jobsTableRow += job_location;
        jobsTableRow += '</td><td>';
        jobsTableRow += job_emp_type;
        jobsTableRow += '</td><td><button onclick="showModal('+ job_list[index] +');" id="descBtn1" class="btn btn-info">Details</i></button></td></td>';
        jobsTableRow += '<td><button class="btn btn-primary" onclick="editJob(' + job_list[index] + ');">Edit</i></button></td>'
        jobsTableRow += '</td><td><button onclick="deleteRow(this);removeJobFromCompany('
        jobsTableRow += job_list[index]
        jobsTableRow += ');" class="btn btn-light"><i class=\'fas fa-trash-alt\'></i></button></td></tr>';


        document.getElementById("jobsTableBody").insertAdjacentHTML('beforeend', jobsTableRow);
    }
}

function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("jobsTable").deleteRow(i);
    reqsTableCounter -= 1;
}

function removeJobFromCompany(){


}

function getCountry(city_id){

    var country;

    var finalURL = baseURL + "/cities?" + "id=" + city_id;
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",finalURL,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var response = JSON.parse(xmlhttp.responseText);
            country = response.cities[0].country;
        }
    };
    xmlhttp.send();

    return country;
}

function searchCity(city){
    // search city 
    var finalURL = baseURL + "/search_city?" + "term=" + city;
    var city_id;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",finalURL,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var response = JSON.parse(xmlhttp.responseText);
            var cities = response.cities;
            if(cities.length != 0){
                city_id = cities[0].id
            }
        }
    };
    xmlhttp.send();

    return city_id;
}

function searchCityById(city_id){
    // search city 
    var finalURL = baseURL + "/cities?" + "id=" + city_id;
    var xmlhttp = new XMLHttpRequest();
    var city_name;
    var city_country;
    xmlhttp.open("GET",finalURL,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var response = JSON.parse(xmlhttp.responseText);
            var cities = response.cities;
            if(cities.length != 0){
                city_name = cities[0].name;
                city_country = cities[0].country;
            }
        }
    };
    xmlhttp.send();

    return [city_name,city_country];
}

function showModal(job_id){
    // set innerHtml of modal
    var job_desc;
    var job_location;
    var job_emp_type;
    var company_name;
    var country_name;
    var skill_list;

    var finalURL = baseURL + "/job_details?" + "job_id=" + job_id;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",finalURL,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var response = JSON.parse(xmlhttp.responseText);
            job_desc = response.job_desc
            job_location = response.city;
            job_emp_type = response.emp_type;
            company_name = response.company_name;
            country_name = response.country;
            skill_list = response.skill_list;
        }
    };
    xmlhttp.send();

    var body = '<h5>Company Name</h5>'
    body += '<p>' + company_name + '</p>';
    body += '<h5>Job Description</h5>'
    body += '<p>' + job_desc + '</p>';
    body += '<h5>Job Location</h5>'
    body += '<p>' + job_location + ', ' + country_name + '</p>';
    body += '<h5>Employment Type</h5>'
    body += '<p>' + job_emp_type + '</p>';
    body += '<h5>Requirements</h5>'
    skill_list.forEach(element => {
        body += '<p><b>' + element.name + '</b></p>';
        body += '<p>' + element.desc + '</p>';
    });

    document.getElementById("exampleModal").innerHTML =
        '<div class="modal-dialog modal-lg"><div class="modal-content">'+
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLabel">Job Details</h5>' +
        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
        '</div>' +
        '<div class="modal-body">'+

            body +
       
        '</div>'+
        '<div class="modal-footer">'+
        '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>'+
        '</div>'+
        '</div>'+
        '</div>';
    $('#exampleModal').modal('show')
    
};


function editJob(job_id){

    sessionStorage.setItem('jobID', job_id);  // SO IMPORTANT, after reloading editjob, same job will come

    window.location.href='./editJob.html';
}

function updateCompanyDetail(){

    updateCity();
    updateExcDetail();

    window.location.href='./companyProfile.html';
}

function updateCity(){
    // send request
    var city_id = searchCityWithAdd(document.getElementById("city").value);
        
    var finalURL = baseURL + "/company_update_city?" + "company_id=" + getUserId() + "&city_id=" + city_id;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",finalURL,false);
    // xmlhttp.onreadystatechange = function() {
    //     if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
    //         var response = JSON.parse(xmlhttp.responseText);
    //         alert("age updated")
    //     }
    // };
    xmlhttp.send();
}


function updateExcDetail(){
    // send request
    var excname = document.getElementById("excname").value;
    var excid = document.getElementById("excid").value;
    var excdob = document.getElementById("excdob").value;
        
    var finalURL = baseURL + "/company_update?" + "company_id=" + getUserId() + "&excname=" + excname + "&excid=" + excid + "&excdob=" + excdob;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",finalURL,false);
    // xmlhttp.onreadystatechange = function() {
    //     if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
    //         var response = JSON.parse(xmlhttp.responseText);
    //         alert("age updated")
    //     }
    // };
    xmlhttp.send();

}


function searchCityWithAdd(city){
    // search city 
    var finalURL = baseURL + "/search_city?" + "term=" + city;
    var city_id;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",finalURL,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var response = JSON.parse(xmlhttp.responseText);
            var cities = response.cities;
            if(cities.length == 0){
                alert("new city needed");
                city_id = addCity(city);
            } else {
                city_id = cities[0].id
            }
        }
    };
    xmlhttp.send();

    return city_id;
}

function addCity(city){
    alert("in add city");
    var city_id = -1;
    var country = document.getElementById("country").value
    var url = baseURL + "/add_city?" + "name=" + city + "&country=" + country;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",url,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
                var response = JSON.parse(xmlhttp.responseText);
                // use returned city_id
                alert(response.city_id);
                city_id = response.city_id;
        }
    };
    xmlhttp.send();

    return city_id;
}