var skillTableCounter = 0;
var baseURL = "http://127.0.0.1:9090";

var searchClicked = false;

function getUserId(){
    const USER_ID = sessionStorage.getItem('userID');
    return USER_ID;
}

function showModal(){
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
        '<button type="button" class="btn btn-primary">Apply</button>'+
        '</div>'+
        '</div>'+
        '</div>';
    $('#exampleModal').modal('show')
    
};

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
                        // <tr>
                        //     <th scope="row">1</th>
                        //     <td>Java</td>
                        //     <td><input type="checkbox" class="form-check-input"></td>
                        // </tr>
    
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

