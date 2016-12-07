//index file

function createNewPlace(name, type, address, phone, description, url, callback){
    var postUrl = '/create/';

    var postRequest = new XMLHttpRequest();
    postRequest.open('POST', postUrl);
    postRequest.setRequestHeader('Content-Type', 'application/json');

    postRequest.addEventListener('load', function (event) {
        var error;
        if (event.target.status !== 200) {
            error = event.target.response;
        }
        callback(error);
    });

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
        createNewPlace(name, type, address, phone, description, url, function(err){
            if(err){
                alert("Error:\n" + err);
            } else {
                //redirect to new page
                window.setTimeout(function(){ window.location = "http://localhost:3000/place/" + name; },1000);
            }
        });
    } else {
        alert("Please complete all input forms");
    }

}

function searchFunction(){
    //alert("click");
    var inputValue = document.getElementById("input-search-businesses").value;
    if(inputValue.trim()){
        window.location = "http://localhost:3000/search-results?t=" + encodeURIComponent("search") + "&c=" + encodeURIComponent(inputValue);
    } else {
        alert("Enter something in search box");
    }
}

function categoryFunction(){
    //alert("select");
    var cs = document.getElementById('business-select');
    var selectionOption = cs.options[cs.selectedIndex].value;
    window.location = "http://localhost:3000/search-results?t=" + encodeURIComponent("category") + "&c=" + encodeURIComponent(selectionOption);
}

document.addEventListener('DOMContentLoaded', function (event) {
    var addNewPlaceButton = document.getElementById('add-new-place-button');
    if(addNewPlaceButton){
        addNewPlaceButton.addEventListener('click', addNewPlace);
    }

    var searchButton = document.getElementById('search-button');
    if(searchButton){
        searchButton.addEventListener('click', searchFunction);
    }

    var categorySelect = document.getElementById('business-select');
    if(categorySelect){
        categorySelect.addEventListener('change', categoryFunction);
    }
});
