var baseURL = "http://127.0.0.1:9090";

function getUserId(){
    const USER_ID = sessionStorage.getItem('userID');
    return USER_ID;
}

window.onload = function(){

    var userId = getUserId();
    
    var finalURL = baseURL + "/stu_detail?" + "stu_id=" + userId;
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",finalURL,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var response = JSON.parse(xmlhttp.responseText);

            if(response.name != null){
                document.getElementById("name").value = response.name;
            }
            if(response.age != null){
                document.getElementById("age").value = response.age;
            }
            if(response.university != null){
                document.getElementById("university").value = response.university;
                document.getElementById("university_city").value = searchUniCity(response.university);
            }
            if(response.faculty != null){
                document.getElementById("faculty").value = response.faculty;
            }
            if(response.department != null){
                document.getElementById("department").value = response.department;
            }
            if(response.city != null){
                document.getElementById("city").value = response.city;
                document.getElementById("country").value = getCountry(searchCity(response.city));
            }
            if(response.emp_pref != null){
                document.getElementById("employmentType").value = response.emp_pref;
            }
            if(response.grade != null){
                document.getElementById("grade").value = response.grade;
            }

            // if(response.skills != null){
            //     document.getElementById("skillsTableBody").value = response.grade;
            // }
        }
    };
    xmlhttp.send();
}

function saveButtonListener(){
    // save request

    updateUniversity(document.getElementById("university").value);
    updateDepartment(document.getElementById("department").value);
    updateCity(document.getElementById("city").value);
    updateGrade(document.getElementById("grade").value);
    updateAge(document.getElementById("age").value);
    updateEmploymentType(document.getElementById("employmentType").value);
    

    window.location.href='./studentProfile.html';
}

function updateAge(age){
    // send request
    var userId = getUserId();
    
    var finalURL = baseURL + "/student_update?" + "type=age" + "&stu_id=" + userId + "&age=" + age;
    
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
function updateUniversity(university){
    // send request
    var userId = getUserId();

    var uni_id = searchUniversityWithAdd(university);

    var finalURL = baseURL + "/student_update?" + "type=uni" + "&stu_id=" + userId + "&uni_id=" + uni_id;

    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",finalURL,false);
    // xmlhttp.onreadystatechange = function() {
    //     if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
    //         var response = JSON.parse(xmlhttp.responseText);
    //     }
    // };
    xmlhttp.send();

}

function updateDepartment(department){
    // send request
    var userId = getUserId();

    var dep_id = searchDepartmentWithAdd(department);

    var finalURL = baseURL + "/student_update?" + "type=dep" + "&stu_id=" + userId + "&dep_id=" + dep_id;

    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",finalURL,false);
    // xmlhttp.onreadystatechange = function() {
    //     if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
    //         var response = JSON.parse(xmlhttp.responseText);
    //     }
    // };
    xmlhttp.send();

}
function updateGrade(grade){
    // send request
    var userId = getUserId();
    var finalURL = baseURL + "/student_update?" + "type=grade" + "&stu_id=" + userId + "&grade=" + grade;
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",finalURL,false);
    // xmlhttp.onreadystatechange = function() {
    //     if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
    //         var response = JSON.parse(xmlhttp.responseText);
    //         alert("http 200 grade");
    //     }
    // };
    xmlhttp.send();


}
function updateCity(city){

    // send request
    var userId = getUserId();

    var city_id = searchCityWithAdd(city);

    var finalURL = baseURL + "/student_update?" + "type=city" + "&stu_id=" + userId + "&city_id=" + city_id;
    
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",finalURL,false);
    // xmlhttp.onreadystatechange = function() {
    //     if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
    //         var response = JSON.parse(xmlhttp.responseText);
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

function updateEmploymentType(empType){
    // send request
    var userId = getUserId();
    
    var finalURL = baseURL + "/student_update?" + "type=pref" + "&stu_id=" + userId + "&emp=" + empType;
    
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",finalURL,false);
    // xmlhttp.onreadystatechange = function() {
    //     if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
    //         var response = JSON.parse(xmlhttp.responseText);
    //         alert("employment type updated");
    //     }
    // };
    xmlhttp.send();

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
    var city_id = -1;
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

function searchDepartmentWithAdd(department){
    // search department 
    var finalURL = baseURL + "/search_department?" + "term=" + department;
    var dep_id;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",finalURL,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var response = JSON.parse(xmlhttp.responseText);
            var departments = response.departments;
            if(departments.length == 0){
                alert("new department needed");
                dep_id = addDepartment(department);
            } else {
                dep_id = departments[0].id
            }
        }
    };
    xmlhttp.send();

    return dep_id;
}

function addDepartment(department){
    alert("in add department");
    var dep_id = -1;
    var faculty = document.getElementById("faculty").value
    var url = baseURL + "/add_department?" + "name=" + department + "&faculty=" + faculty;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",url,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
                var response = JSON.parse(xmlhttp.responseText);
                // use returned department_id
                alert(response.department_id);
                dep_id = response.department_id;
        }
    };
    xmlhttp.send();

    return dep_id;
}

function searchUniversityWithAdd(university){
    // search university 
    var finalURL = baseURL + "/search_uni?" + "term=" + university;
    var uni_id;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",finalURL,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var response = JSON.parse(xmlhttp.responseText);
            var universities = response.universities;
            if(universities.length == 0){
                alert("new university needed");
                uni_id = addUniversity(university);
            } else {
                uni_id = universities[0].id
            }
        }
    };
    xmlhttp.send();



    return uni_id;
}

function addUniversity(university){
    alert("in add university");
    var uni_id = -1;
    var uni_city = document.getElementById("university_city").value;
    var city_id = searchCityWithAdd(uni_city);
    var url = baseURL + "/add_uni?" + "name=" + university + "&city_id=" + city_id;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST",url,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
                var response = JSON.parse(xmlhttp.responseText);
                // use returned department_id
                alert(response.uni_id);
                uni_id = response.uni_id;
        }
    };
    xmlhttp.send();

    return uni_id;
}

function searchUniCity(university){
    // search city 
    var finalURL = baseURL + "/search_uni?" + "term=" + university;
    var uni_city = -1;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",finalURL,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var response = JSON.parse(xmlhttp.responseText);
            var universities = response.universities;
            if(universities.length != 0){
                uni_city = universities[0].city;
            }
        }
    };
    xmlhttp.send();

    return uni_city;
}