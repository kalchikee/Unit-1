function debugCallback(response){
    // Convert the response to JSON format
    return response.json();
}

function debugAjax(){
    // Initialize variable to store the GeoJSON data
    let myData;
    
    // Fetch the GeoJSON file
    fetch("data/MegaCities.geojson")
        .then(function(response){
            // First convert the response to JSON
            return debugCallback(response);
        })
        .then(function(data){
            // Store the JSON data in myData variable
            myData = data;
            // Now we can safely use myData since we have the data
            document.querySelector("#mydiv").insertAdjacentHTML(
                'beforeend', 
                '<br>GeoJSON data:<br>' + JSON.stringify(myData)
            );
        })
        .catch(function(error){
            console.log("Error fetching data:", error);
        });
}

// Call the function when needed
debugAjax();
