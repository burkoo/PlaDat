var baseURL = "http://127.0.0.1:9090";

var studentsTableCounter = 0;
var jobsTableCounter = 0;
var applicantsTableCounter = 0;

var searchClicked = false;

var stu_ids = [];

function getUserId(){
    const USER_ID = sessionStorage.getItem('userID');
    return USER_ID;
}



window.onload = function(){

    var userId = getUserId();
    
    var finalURL = baseURL + "/applications_of_company?" + "company_id=" + userId;
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",finalURL,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var response = JSON.parse(xmlhttp.responseText);

            var students = response.students;

            if(students != null){
                for (let index = 0; index < students.length; index++) {
                    var stu_id = students[index].student_id;
                    var student_name = getStudentName(stu_id);
                    var job_desc = students[index].description;

                    applicantsTableCounter += 1;

                    var applicantsTableRow;
                    applicantsTableRow = '<tr><th scope="row">';
                    applicantsTableRow += applicantsTableCounter.toString();
                    applicantsTableRow += '</th><td>';
                    applicantsTableRow += student_name;
                    applicantsTableRow += '</td><td>';
                    applicantsTableRow += job_desc;
                    applicantsTableRow += '</td><td>';
                    applicantsTableRow += '<button onclick="showStudentDetailsAcceptModal(' + stu_id + ');" type="button" class="btn btn-info">Details</button>';
                    applicantsTableRow += '</td></tr>';

                    document.getElementById("applicantsTableBody").insertAdjacentHTML('beforeend', applicantsTableRow);
                    
                }
            }
        }
    };
    xmlhttp.send();

}

function showStudentDetailsModal(stu_id){

    var age;
    var city;
    var department;
    var emp_pref;
    var faculty;
    var grade;
    var name;
    var skills;
    var university;

    var finalURL = baseURL + "/stu_detail?" + "stu_id=" + stu_id;
        
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",finalURL,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var response = JSON.parse(xmlhttp.responseText);
            age = response.age
            city = response.city;
            department = response.department;
            emp_pref = response.emp_pref;
            faculty = response.faculty;
            grade = response.faculty;
            name = response.name;
            skills = response.skills;
            university = response.university;
        }
    };
    xmlhttp.send();


    var body = '<h5>Name</h5>'
    body += '<p>' + name + '</p>';
    body += '<h5>Age</h5>'
    body += '<p>' + age + '</p>';
    body += '<h5>University</h5>'
    body += '<p>' + university + '</p>';
    body += '<h5>Department</h5>'
    body += '<p>' + department + '</p>';
    body += '<h5>Employment Type</h5>'
    body += '<p>' + emp_pref + '</p>';
    body += '<h5>Grade</h5>'
    body += '<p>' + grade + '</p>';
    body += '<h5>Skills</h5>'
    skills.forEach(element => {
        var splitted_text = element.split(":");

        var skill_id = splitted_text[0];
        var skillName = splitted_text[1];
        var skillDesc = splitted_text[2];
        body += '<p><b>' + skillName + '</b></p>';
        body += '<p>' + skillDesc + '</p>';
    });


    // set innerHtml of modal
    document.getElementById("studentDetailModal").innerHTML =
        '<div class="modal-dialog modal-lg"><div class="modal-content">'+
        '<div class="modal-header">' +
        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
        '</div>' +
        '<div class="modal-body">'+

            body+
       
        '</div>'+
        '<div class="modal-footer">'+
        '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>'+
        '<button type="button" class="btn btn-success">Offer</button>'+
        '</div>'+
        '</div>'+
        '</div>';
    $('#studentDetailModal').modal('show')
    
};

function showStudentDetailsAcceptModal(stu_id){

    var age;
    var city;
    var department;
    var emp_pref;
    var faculty;
    var grade;
    var name;
    var skills;
    var university;

    var finalURL = baseURL + "/stu_detail?" + "stu_id=" + stu_id;
        
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",finalURL,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var response = JSON.parse(xmlhttp.responseText);
            age = response.age
            city = response.city;
            department = response.department;
            emp_pref = response.emp_pref;
            faculty = response.faculty;
            grade = response.faculty;
            name = response.name;
            skills = response.skills;
            university = response.university;
        }
    };
    xmlhttp.send();


    var body = '<h5>Name</h5>'
    body += '<p>' + name + '</p>';
    body += '<h5>Age</h5>'
    body += '<p>' + age + '</p>';
    body += '<h5>University</h5>'
    body += '<p>' + university + '</p>';
    body += '<h5>Department</h5>'
    body += '<p>' + department + '</p>';
    body += '<h5>Employment Type</h5>'
    body += '<p>' + emp_pref + '</p>';
    body += '<h5>Grade</h5>'
    body += '<p>' + grade + '</p>';
    body += '<h5>Skills</h5>'
    skills.forEach(element => {
        var splitted_text = element.split(":");

        var skill_id = splitted_text[0];
        var skillName = splitted_text[1];
        var skillDesc = splitted_text[2];
        body += '<p><b>' + skillName + '</b></p>';
        body += '<p>' + skillDesc + '</p>';
    });


    // set innerHtml of modal
    document.getElementById("studentDetailModal").innerHTML =
        '<div class="modal-dialog modal-lg"><div class="modal-content">'+
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLabel">Student Details</h5>' +
        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
        '</div>' +
        '<div class="modal-body">'+

            body+
       
        '</div>'+
        '<div class="modal-footer">'+
        '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>'+
        '<button type="button" class="btn btn-primary">Accept</button>'+
        '</div>'+
        '</div>'+
        '</div>';
    $('#studentDetailModal').modal('show')
    
};

function showJobsModal(){

    if(searchClicked == false){
        var userId = getUserId();
    
        var finalURL = baseURL + "/company_detail?" + "company_id=" + userId;
        
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET",finalURL,false);
        xmlhttp.onreadystatechange = function() {
            if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
                var response = JSON.parse(xmlhttp.responseText);
    
                if(response.job_lis != null){
                    for (let index = 0; index < response.job_lis.length; index++) {
    
                        var job_id = response.job_lis[index];

                        var job_desc = getJobDetail(job_id);
    
                        jobsTableCounter += 1;
    
                        var jobsTableRow;
                        jobsTableRow = '<tr><th scope="row">';
                        jobsTableRow += jobsTableCounter.toString();
                        jobsTableRow += '</th><td>';
                        jobsTableRow += job_desc;
                        jobsTableRow += '</td><td><input name="job" value="';
                        jobsTableRow += job_id.toString();
                        jobsTableRow += '" type="checkbox" class="form-check-input"></td></tr>';
                        document.getElementById("jobsTableBody").insertAdjacentHTML('beforeend', jobsTableRow);
                        
                    }
                }
            }
        };
        xmlhttp.send();
        searchClicked = true;
    }

    $('#jobsModal').modal('show')

}

function getJobDetail(job_id){

    var job_desc;
    var finalURL = baseURL + "/job_details?" + "job_id=" + job_id;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",finalURL,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var response = JSON.parse(xmlhttp.responseText);
            job_desc = response.job_desc
        }
    };
    xmlhttp.send();

    return job_desc;
}

function getSelectedCheckboxValues(name) {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
    let values = [];
    checkboxes.forEach((checkbox) => {
        values.push(checkbox.value);
    });
    return values;
}

function searchStudents(){

    var job_id = getSelectedCheckboxValues('job');

    var skillsToSearch = getSkillsFromJob(job_id);

    var finalURL = baseURL + "/search_students_by_skill_ids?" + "term=" + skillsToSearch; // make string with commas
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",finalURL,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var response = JSON.parse(xmlhttp.responseText);

            if(response.students != null){
                for (let index = 0; index < response.students.length; index++) {

                    var student = response.students[index];

                    var stu_id = student.id;
                    var stu_name = student.name;
                    var age = student.age;
                    var uni = student.university;
                    var dep = student.department;

                    studentsTableCounter += 1;

                    var studentsTableRow;
                    studentsTableRow = '<tr><th scope="row">';
                    studentsTableRow += studentsTableCounter.toString();
                    studentsTableRow += '</th><td>';
                    studentsTableRow += stu_name;
                    studentsTableRow += '</td><td>';
                    studentsTableRow += age;
                    studentsTableRow += '</td><td>';
                    studentsTableRow += uni;
                    studentsTableRow += '</td><td>';
                    studentsTableRow += dep;
                    studentsTableRow += '</td><td><button onclick="showStudentDetailsModal('+ stu_id + ');" type="button" class="btn btn-info">Details</button></td>'
                    studentsTableRow += '<td><button onclick="offerJob(' + stu_id + ',\'' + stu_name + '\',' + job_id + ');"  type="button" class="btn btn-success">Offer</button></td></tr>';
                    document.getElementById("studentsTableBody").insertAdjacentHTML('beforeend', studentsTableRow);
                    
                }
            }
        }
    };
    xmlhttp.send();
}

function getStudentName(stu_id){
    var finalURL = baseURL + "/stu_detail?" + "stu_id=" + stu_id;
    var name;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",finalURL,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var response = JSON.parse(xmlhttp.responseText);
            name = response.name;
        }
    };
    xmlhttp.send();
    return name;
}

function getSkillsFromJob(job_id){
    var skill_list;

    var finalURL = baseURL + "/job_details?" + "job_id=" + job_id;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",finalURL,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var response = JSON.parse(xmlhttp.responseText);
            skill_list = response.skill_list;
        }
    };
    xmlhttp.send();

    var skills_as_string = "";

    skill_list.forEach(element => {
        skills_as_string += element.id + ',';
    });

    return skills_as_string.slice(0, -1);
}

function offerJob(stu_id,stu_name,job_id){

    var finalURL = baseURL + "/add_application?" + "job_id=" + job_id + "&stu_id=" + stu_id + "&direction=" + "true"; // true for offer

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",finalURL,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var response = JSON.parse(xmlhttp.responseText);
            showOfferedModal(stu_name);
        }
    };
    xmlhttp.send();
}

function showOfferedModal(stu_name){
    // set innerHtml of modal
    document.getElementById("jobApplicationModal").innerHTML =
        '<div class="modal-dialog"><div class="modal-content">'+
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLabel">Job Offer</h5>' +
        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
        '</div>' +
        '<div class="modal-body">'+

            '<p>Job offered to "' + stu_name + '" successfuly.</p>'+
       
        '</div>'+
        '<div class="modal-footer">'+
        '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>'+
        '</div>'+
        '</div>'+
        '</div>';
    $('#jobApplicationModal').modal('show')
    
};


