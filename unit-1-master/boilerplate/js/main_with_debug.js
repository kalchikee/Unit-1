// Creatings an array of city objects containing city name and population data
var cityPop = [
    { 
        city: 'Madison',
        population: 233209
    },
    {
        city: 'Milwaukee',
        population: 594833
    },
    {
        city: 'Green Bay',
        population: 104057
    },
    {
        city: 'Superior',
        population: 27244
    }
];

// This creates a function to create the initial table structure
function createTable(){
    // Creates a new table element
    var table = document.createElement("table");
    
    // Creates and populate the header row with column titles
    var headerRow = document.createElement("tr");
    var cityHeader = document.createElement("th");
    var popHeader = document.createElement("th");
    
    // Setting the text content for the headers
    cityHeader.innerHTML = "City";
    popHeader.innerHTML = "Population";
    
    // Builds the header row by appending the cells
    headerRow.appendChild(cityHeader);
    headerRow.appendChild(popHeader);
    table.appendChild(headerRow);

    // Iterating through the cityPop array to create table rows
    cityPop.forEach(function(cityObj){
        // Creating a new table row
        var tr = document.createElement("tr");
        
        // Creating cells for city name and population
        var cityCell = document.createElement("td");
        var popCell = document.createElement("td");
        
        // Populating cells with data from the cityPop array
        cityCell.innerHTML = cityObj.city;
        popCell.innerHTML = cityObj.population;
        
        // Adds cells to the row and row to the table
        tr.appendChild(cityCell);
        tr.appendChild(popCell);
        table.appendChild(tr);
    });

    // Adds the completed table to the div element in the HTML
    document.getElementById("mydiv").appendChild(table);
}

// This is a function to add a "City Size" column based on population
function addColumns(cityPop){
    // Selecting all table rows and process each one
    document.querySelectorAll("tr").forEach(function(row, i){
        if (i == 0){
            // Adds header for the new City Size column
            row.insertAdjacentHTML('beforeend', '<th>City Size</th>');
        } else {
            var citySize;

            // Determines city size category based on population
            if (cityPop[i-1].population < 100000){
                citySize = 'Small';
            } else if (cityPop[i-1].population < 500000){
                citySize = 'Medium';
            } else {
                citySize = 'Large';
            }

            // Adds the city size cell to the row
            row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');
        }
    });
}

// Function to add interactive events to the table
function addEvents(){
    // Adds mouseover event to change text color randomly
    document.querySelector("table").addEventListener("mouseover", function(){
        var color = "rgb(";
        // Generates random RGB color
        for (var i=0; i<3; i++){
            var random = Math.round(Math.random() * 255);
            color += random;
            color += i < 2 ? "," : ")";
        }
        // Applies the random color to the table text
        document.querySelector("table").style.color = color;
    });

    // Adds click event to show alert
    function clickme(){
        alert('Hey, you clicked me!');
    }
    document.querySelector("table").addEventListener("click", clickme);
}

// Initializes the table when the page loads
window.onload = function(){
    createTable();      // Creates the basic table structure
    addColumns(cityPop);// Adds the city size column
    addEvents();        // Adds interactive features
};