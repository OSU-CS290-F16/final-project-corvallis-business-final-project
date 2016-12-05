//index file

function createNewPlace(name, type, address, phone, description, url, callback){
    //console.log("here");
    // We'll post to the add-photo endpoint for the appropriate person.
    var postUrl = '/create/';

    // Start a new request to post our newly added photo as JSON data.
    var postRequest = new XMLHttpRequest();
    postRequest.open('POST', postUrl);
    postRequest.setRequestHeader('Content-Type', 'application/json');

    /*
    * Set up a simple handler for completed requests.  This will send an error
    * into the callback if we don't get a 200 (success) status back.
    */
    postRequest.addEventListener('load', function (event) {
        var error;
        if (event.target.status !== 200) {
            error = event.target.response;
        }
        callback(error);
    });

    // Send our photo data off to the server.
    postRequest.send(JSON.stringify({
        name: name,
        type: type,
        address: address,
        phone: phone,
        description: description,
        url: url
    }));
}

function addNewPlace(){

    var name = document.getElementById('input-business-name').value || '';
    var type = document.getElementById('input-business-type').value || '';
    var address = document.getElementById('input-business-address').value || '';
    var phone = document.getElementById('input-business-phone').value || '';
    var description = document.getElementById('input-business-description').value || '';
    var url = document.getElementById('input-business-url').value || '';

    //console.log("url " + url);

    if(name.trim() && type.trim() && address.trim() && phone.trim() && description.trim() && url.trim() ){
    //if(url.trim()){
        //console.log("url " + url);
        //all fields are there
        //alert("completed");
        createNewPlace(name, type, address, phone, description, url, function(err){
            if(err){
                //print error to screen
                alert("Error:\n" + err);
            } else {
                //redirect to new page
                alert("did the thing!");
            }
        });
    } else {
        alert("Please complete all input forms");
    }
    //alert("done");

}

document.addEventListener('DOMContentLoaded', function (event) {
    var addNewPlaceButton = document.getElementById('add-new-place-button');
    if(addNewPlaceButton){
        addNewPlaceButton.addEventListener('click', addNewPlace);
    }
});
