var baseURL = "http://127.0.0.1:9090";
var reqsTableCounter = 0;

var req_ids = [];

function getUserId(){
    const USER_ID = sessionStorage.getItem('userID');
    return USER_ID;
}

window.onload = function(){

    // const USER_ID = sessionStorage.getItem('jobId');



}

function editJob(){

    // var desc = document.getElementById("jobdesc").value;
    // var empType = document.getElementById("employmentType").value;
    // var city_id = searchCityWithAdd(document.getElementById("city").value);

    // // getUserId() must be used in url

    // var finalURL = baseURL + "/add_job?" + "company=" + "1" + "&desc=" + desc + "&emp_type=" + empType + "&city=" + city_id;
    // var skill = ["-1","",""];   // skill_id, name, desc
    // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.open("POST",finalURL,false);
    // xmlhttp.onreadystatechange = function() {
    //     if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
    //         var response = JSON.parse(xmlhttp.responseText);
    //         alert("add job request");
    //     }
    // };
    // xmlhttp.send();    

    //window.location.href='./companyProfile.html';
}

function searchSkill(skillName){
    // search skill 
    var finalURL = baseURL + "/search_skills?" + "term=" + skillName;
    var skill = ["-1","",""];   // skill_id, name, desc
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET",finalURL,false);
    xmlhttp.onreadystatechange = function() {
        if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
            var response = JSON.parse(xmlhttp.responseText);
            var skills = response.skills;
            if(skills.length != 0){
                for (let index = 0; index < skills.length; index++) {
                    if(skillName == skills[index].name){
                        skill = [skills[index].id.toString(),skills[index].name,skills[index].description];
                        break;
                    }
                }
            }
        }
    };
    xmlhttp.send();

    return skill;
}


function addRequirement(){

    var reqName = document.getElementById("reqname").value;
    var reqDesc = document.getElementById("reqdesc").value;

    // search skill if it exists
    var req = searchSkill(reqName);

    if(req[0] != "-1"){
        alert("requirement exists");
        addReqToTable(req[1],req[2],parseInt(req[0])); // name,desc,id
        addReqToJob(parseInt(req[0]));
    } else {
        alert("requirement does not exist in database");

        var url = baseURL + "/add_skill?" + "name=" + reqName + "&desc=" + reqDesc;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST",url,false);
        xmlhttp.onreadystatechange = function() {
            if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
                    var response = JSON.parse(xmlhttp.responseText);
                    // use returned department_id
                    // alert(response.skill_id);
                    // skill_id = response.skill_id;
                    addReqToTable(reqName,reqDesc,response.skill_id);
                    // add skill to student
                    req[0] = response.skill_id;
                    addReqToJob(response.skill_id);
            }
        };
        xmlhttp.send();
    }

    req_ids.push(req[0]);

    document.getElementById("reqname").value = "";
    document.getElementById("reqdesc").value = "";
}

function addReqToTable(reqName,reqDesc,req_id){

    reqsTableCounter += 1;

    var reqTableRow;

    reqTableRow = '<tr><th scope="row">';
    reqTableRow += reqsTableCounter.toString();
    reqTableRow += '</th><td>';
    reqTableRow += reqName;
    reqTableRow += '</td><td>';
    reqTableRow += reqDesc;
    reqTableRow += '</td><td><button onclick="deleteRow(this);removeReqFromJob('
    reqTableRow += req_id
    reqTableRow += ');" class="btn btn-light"><i class=\'fas fa-trash-alt\'></i></button></td></tr>';
    // <tr>
    //     <th scope="row">1</th>
    //     <td>Java</td>
    //     <td>Programming Language</td>
    //     <td><button onclick="deleteRow(this);" class="btn btn-light"><i class='fas fa-trash-alt'></i></button></td>
    // </tr>

    document.getElementById("reqsTableBody").insertAdjacentHTML('beforeend', reqTableRow);
}

function addReqToJob(req_id){

    alert("in add req_id to job");

    // var url = baseURL + "/edit_student_skill?" + "type=add" + "&stu_id=" + getUserId() + "&skill_id=" + req_id;
    // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.open("POST",url,false);
    // xmlhttp.onreadystatechange = function() {
    //     if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
    //             // var response = JSON.parse(xmlhttp.responseText);
    //             alert("req added to job");
    //     }
    // };
    // xmlhttp.send();

}

function deleteRow(r) {
    var i = r.parentNode.parentNode.rowIndex;
    document.getElementById("reqsTable").deleteRow(i);
    reqsTableCounter -= 1;
}

function removeReqFromJob(req_id){

    alert("in remove req from job");

    req_ids.splice(req_ids.indexOf(req_id),1);

    // alert("req_ids array : " + req_ids.toString());

    // var url = baseURL + "/edit_student_skill?" + "type=del" + "&stu_id=" + getUserId() + "&skill_id=" + skill_id;
    // var xmlhttp = new XMLHttpRequest();
    // xmlhttp.open("POST",url,false);
    // xmlhttp.onreadystatechange = function() {
    //     if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
    //             // var response = JSON.parse(xmlhttp.responseText);
    //             alert("skill deleted from student");
    //     }
    // };
    // xmlhttp.send();

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