function showModal(){
    // set innerHtml of modal
    document.getElementById("exampleModal").innerHTML =
        '<div class="modal-dialog"><div class="modal-content">'+
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
        '<div class="modal-dialog"><div class="modal-content">'+
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

