var baseURL = "http://127.0.0.1:9090";
var skillTableCounter = 0;

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

            if(response.skills != null){
                for (let index = 0; index < response.skills.length; index++) {
                    var splitted_text = response.skills[index].split(":");

                    if(splitted_text[0] == ""){
                        break;
                    }

                    var skill_id = splitted_text[0];
                    var skillName = splitted_text[1];
                    var skillDesc = splitted_text[2];

                    skillTableCounter += 1;

                    var skillTableRow;
                    skillTableRow = '<tr><th scope="row">';
                    skillTableRow += skillTableCounter.toString();
                    skillTableRow += '</th><td>';
                    skillTableRow += skillName;
                    skillTableRow += '</td><td>';
                    skillTableRow += skillDesc;
                    skillTableRow += '</tr>';
                    // <tr>
                    //     <th scope="row">1</th>
                    //     <td>Java</td>
                    //     <td>Programming Language</td>
                    // </tr>

                    document.getElementById("skillsTableBody").insertAdjacentHTML('beforeend', skillTableRow);
                    
                }
            }
        }
    };
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