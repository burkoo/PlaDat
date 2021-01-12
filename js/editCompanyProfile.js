function showModal(){
    // set innerHtml of modal
    document.getElementById("exampleModal").innerHTML =
        '<div class="modal-dialog"><div class="modal-content">'+
        '<div class="modal-header">' +
        '<h5 class="modal-title" id="exampleModalLabel">Add a Job</h5>' +
        '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
        '</div>' +
        '<div class="modal-body">'+



            '<p>Modal body text goes here.</p>'+
       
       
       
       
       
       
        '</div>'+
        '<div class="modal-footer">'+
        '<button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>'+
        '<button type="button" class="btn btn-primary">Add</button>'+
        '</div>'+
        '</div>'+
        '</div>';
    $('#exampleModal').modal('show')
    
};


function editJob(job_id){

    // sessionStorage.setItem('jobId', job_id);  // SO IMPORTANT
}
