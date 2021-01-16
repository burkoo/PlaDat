var skillTableCounter = 0;
var baseURL = "http://127.0.0.1:9090";

var jobsTableCounter = 0;
var offersTableCounter = 0;
var acceptedTableCounter = 0;

var searchClicked = false;

var job_ids = [];

function getUserId(){
    const USER_ID = sessionStorage.getItem('userID');
    return USER_ID;
}

window.onload = function(){

    var userId = getUserId();
    
    var finalURL = baseURL + "/applications_of_student?" + "student_id=" + userId;
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",finalURL,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var response = JSON.parse(xmlhttp.responseText);

            var students = response.students;

            if(students != null){
                for (let index = 0; index < students.length; index++) {

                    // check if this is an offer
                    if(students[index].direction == true && students[index].response == false){
                        var job_id = students[index].job_id;
                        var company_name = students[index].company_name;
                        var job_desc = students[index].description;

                        offersTableCounter += 1;

                        var offersTableRow;
                        offersTableRow = '<tr><th scope="row">';
                        offersTableRow += offersTableCounter.toString();
                        offersTableRow += '</th><td>';
                        offersTableRow += company_name;
                        offersTableRow += '</td><td>';
                        offersTableRow += job_desc;
                        offersTableRow += '</td><td>';
                        offersTableRow += '<button onclick="showJobDetailsModal(' + job_id + ');" type="button" class="btn btn-info">Details</button>';
                        offersTableRow += '</td></tr>';

                        document.getElementById("offersTableBody").insertAdjacentHTML('beforeend', offersTableRow);
                    }

                    if(students[index].response == true){
                        var job_id = students[index].job_id;
                        var company_name = students[index].company_name;
                        var job_desc = students[index].description;

                        acceptedTableCounter += 1;

                        var acceptedTableRow;
                        acceptedTableRow = '<tr><th scope="row">';
                        acceptedTableRow += acceptedTableCounter.toString();
                        acceptedTableRow += '</th><td>';
                        acceptedTableRow += company_name;
                        acceptedTableRow += '</td><td>';
                        acceptedTableRow += job_desc;
                        acceptedTableRow += '</td><td>';
                        acceptedTableRow += '<button onclick="showAcceptedJobDetailsModal(' + job_id + ');" type="button" class="btn btn-info">Details</button>';
                        acceptedTableRow += '</td></tr>';

                        document.getElementById("acceptedTableBody").insertAdjacentHTML('beforeend', acceptedTableRow);
                    }

                    
                    
                    
                }
            }
        }
    };
    xmlhttp.send();

}

// function showModal(){
//     // set innerHtml of modal
//     document.getElementById("exampleModal").innerHTML =
//         '<div class="modal-dialog modal-lg"><div class="modal-content">'+
//         '<div class="modal-header">' +
//         '<h5 class="modal-title" id="exampleModalLabel">Java Developer in A Company</h5>' +
//         '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
//         '</div>' +
//         '<div class="modal-body">'+

//             '<p>Modal body text goes here.</p>'+
       
//         '</div>'+
//         '<div class="modal-footer">'+
//         '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>'+
//         '<button type="button" class="btn btn-primary">Apply</button>'+
//         '</div>'+
//         '</div>'+
//         '</div>';
//     $('#exampleModal').modal('show')
    
// };

function showJobDetailsModal(jobId){

    var job_desc;
    var job_location;
    var job_emp_type;
    var company_name;
    var country_name;
    var skill_list;

    var finalURL = baseURL + "/job_details?" + "job_id=" + jobId;

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

    document.getElementById("jobDetailsModal").innerHTML =
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
        '<button onclick="applyJob('+ jobId +',\'' + job_desc +'\');" type="button" class="btn btn-primary" data-bs-dismiss="modal">Apply</button>'+
        '</div>'+
        '</div>'+
        '</div>';
    $('#jobDetailsModal').modal('show')
    
};

// '<button onclick="acceptJob(' + getUserId() + ',\'' + job_desc + '\',' + jobId + ')" type="button" class="btn btn-primary" data-bs-dismiss="modal">Apply</button>'+

function showAcceptedJobDetailsModal(jobId){

    var job_desc;
    var job_location;
    var job_emp_type;
    var company_name;
    var country_name;
    var skill_list;
    var company_id;
    var company_email;

    var finalURL = baseURL + "/job_details?" + "job_id=" + jobId;

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
            company_id = response.company_id;
        }
    };
    xmlhttp.send();

    finalURL = baseURL + "/company_detail?" + "company_id=" + company_id;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",finalURL,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var response = JSON.parse(xmlhttp.responseText);
            company_email = response.email;
        }
    };
    xmlhttp.send();

    var body = '<h5>Company Name</h5>'
    body += '<p>' + company_name + '</p>';
    body += '<h5>Company Email</h5>'
    body += '<p>' + company_email + '</p>';
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

    document.getElementById("jobDetailsModal").innerHTML =
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
    $('#jobDetailsModal').modal('show')
    
};

function acceptJob(stu_id,job_desc,job_id){

    var finalURL = baseURL + "/positive_response?" + "stu_id=" + stu_id + "&job_id=" + job_id;
        
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",finalURL,false);
    xmlhttp.send();

    showAcceptedModal(job_desc);

}

function showModalOffer(){
    // set innerHtml of modal
    document.getElementById("exampleModal").innerHTML =
        '<div class="modal-dialog modal-lg"><div class="modal-content">'+
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLabel">Java Developer in A Company</h5>' +
        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
        '</div>' +
        '<div class="modal-body">'+

            '<p>Modal body text goes here.</p>'+
       
        '</div>'+
        '<div class="modal-footer">'+
        '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>'+
        '<button type="button" class="btn btn-primary">Accept</button>'+
        '</div>'+
        '</div>'+
        '</div>';
    $('#exampleModal').modal('show')
    
};

function showSkillsModal(){

    if(searchClicked == false){
        var userId = getUserId();
    
        var finalURL = baseURL + "/stu_detail?" + "stu_id=" + userId;
        
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET",finalURL,false);
        xmlhttp.onreadystatechange = function() {
            if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
                var response = JSON.parse(xmlhttp.responseText);
    
                if(response.skills != null){
                    for (let index = 0; index < response.skills.length; index++) {
                        var splitted_text = response.skills[index].split(":");
    
                        if(splitted_text[0] == ""){
                            break;
                        }
    
                        var skill_id = splitted_text[0];
                        var skillName = splitted_text[1];
    
                        skillTableCounter += 1;
    
                        var skillTableRow;
                        skillTableRow = '<tr><th scope="row">';
                        skillTableRow += skillTableCounter.toString();
                        skillTableRow += '</th><td>';
                        skillTableRow += skillName;
                        skillTableRow += '</td><td><input name="skill" value="';
                        skillTableRow += skill_id.toString();
                        skillTableRow += '" type="checkbox" class="form-check-input"></td></tr>';
                        document.getElementById("skillsTableBody").insertAdjacentHTML('beforeend', skillTableRow);
                        
                    }
                }
            }
        };
        xmlhttp.send();
        searchClicked = true;
    }

    $('#skillsModal').modal('show')

}


function getSelectedCheckboxValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    let values = [];
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });
    return values;
}

function searchJobs(){

    var skillsToUse = getSelectedCheckboxValues('skill');

    var finalURL = baseURL + "/search_jobs_by_skill_ids?" + "term=" + skillsToUse.toString();
        
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET",finalURL,false);
        xmlhttp.onreadystatechange = function() {
            if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
                var response = JSON.parse(xmlhttp.responseText);
    
                if(response.jobs != null){
                    for (let index = 0; index < response.jobs.length; index++) {

                        var city = response.jobs[index].city;
                        var country = response.jobs[index].country;
                        var companyName = response.jobs[index].company_name;
                        var empType = response.jobs[index].emp_type;
                        var jobDesc = response.jobs[index].job_desc;
                        var jobId = response.jobs[index].id;

                        if(!job_ids.includes(jobId)){
                            jobsTableCounter += 1;

                            var jobsTableRow;
                            jobsTableRow = '<tr><th scope="row">';
                            jobsTableRow += jobsTableCounter.toString();
                            jobsTableRow += '</th><td>';
                            jobsTableRow += jobDesc;
                            jobsTableRow += '</td><td>';
                            jobsTableRow += companyName;
                            jobsTableRow += '</td><td>';
                            jobsTableRow += city + ', ' + country;
                            jobsTableRow += '</td><td><button onclick="showJobDetailsModal(' + jobId + ');" class="btn btn-info">Details</button>';
                            jobsTableRow += '<button style="margin-left: 5px;"class="btn btn-success" onclick="applyJob('+ jobId +',\'' + jobDesc +'\');">Apply</button></td></tr>';

                            document.getElementById("jobsTableBody").insertAdjacentHTML('beforeend', jobsTableRow);

                            job_ids.push(jobId);
                        }
    
                    }
                }
            }
        };
        xmlhttp.send();

}

function applyJob(job_id,job_desc){

    var stu_id = getUserId();

    var finalURL = baseURL + "/add_application?" + "job_id=" + job_id + "&stu_id=" + stu_id + "&direction=" + "false"; // false for student apply

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",finalURL,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var response = JSON.parse(xmlhttp.responseText);
            alert(job_desc);
            showAppliedModal(job_desc);
        }
    };
    xmlhttp.send();
}

function showAppliedModal(job_desc){
    // set innerHtml of modal
    document.getElementById("jobApplicationModal").innerHTML =
        '<div class="modal-dialog"><div class="modal-content">'+
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLabel">Job Application</h5>' +
        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
        '</div>' +
        '<div class="modal-body">'+

            '<p>Applied to "' + job_desc + '" successfuly.</p>'+
       
        '</div>'+
        '<div class="modal-footer">'+
        '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>'+
        '</div>'+
        '</div>'+
        '</div>';
    $('#jobApplicationModal').modal('show')
    
};

function showAcceptedModal(job_desc){
    // set innerHtml of modal
    document.getElementById("jobApplicationModal").innerHTML =
        '<div class="modal-dialog"><div class="modal-content">'+
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLabel">Accepted Job</h5>' +
        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
        '</div>' +
        '<div class="modal-body">'+

            '<p>"' + job_desc + '" accepted successfuly.</p>'+
       
        '</div>'+
        '<div class="modal-footer">'+
        '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>'+
        '</div>'+
        '</div>'+
        '</div>';
    $('#jobApplicationModal').modal('show')
    
};

