// A list of city objects, each with a name and population
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

// This function builds the basic table structure and fills it with city/population info
function createTable(){
    var table = document.createElement("table"); // Create the table element

    // Making  the header row
    var headerRow = document.createElement("tr");
    var cityHeader = document.createElement("th");
    var popHeader = document.createElement("th");

    // Setting the header titles
    cityHeader.innerHTML = "City";
    popHeader.innerHTML = "Population";

    // Adding the headers to the row, then row to the table
    headerRow.appendChild(cityHeader);
    headerRow.appendChild(popHeader);
    table.appendChild(headerRow);

    // Looping through each city and add a row to the table
    cityPop.forEach(function(cityObj){
        var tr = document.createElement("tr");
        var cityCell = document.createElement("td");
        var popCell = document.createElement("td");

        // Filling out the cells with data
        cityCell.innerHTML = cityObj.city;
        popCell.innerHTML = cityObj.population;

        // Adds cells to the row, and the row to the table
        tr.appendChild(cityCell);
        tr.appendChild(popCell);
        table.appendChild(tr);
    });

    // Adding the table to the web page inside the #mydiv element
    document.getElementById("mydiv").appendChild(table);
}

// This adds a new column to the table showing city size (Small, Medium, Large)
function addColumns(cityPop){
    document.querySelectorAll("tr").forEach(function(row, i){
        if (i == 0){
            // First row is the header, so we add a new header cell for "City Size"
            row.insertAdjacentHTML('beforeend', '<th>City Size</th>');
        } else {
            var citySize;

            // Using population to decide city size.
            if (cityPop[i-1].population < 100000){
                citySize = 'Small';
            } else if (cityPop[i-1].population < 500000){
                citySize = 'Medium';
            } else {
                citySize = 'Large';
            }

            // Adding the the new cell to the row
            row.insertAdjacentHTML('beforeend', '<td>' + citySize + '</td>');
        }
    });
}

// This function makes the table interactive—changes color on hover and alerts on click
function addEvents(){
    // Changing the text color randomly when you hover over the table
    document.querySelector("table").addEventListener("mouseover", function(){
        var color = "rgb(";
        for (var i=0; i<3; i++){
            var random = Math.round(Math.random() * 255);
            color += random + (i < 2 ? "," : ")");
        }
        document.querySelector("table").style.color = color;
    });

    // When you click the table, show a pop-up message
    function clickme(){
        alert('Hey, you clicked me!');
    }

    document.querySelector("table").addEventListener("click", clickme);
}

// Simple helper to extract plain text from the fetch response
function debugCallback(response){
    return response.text();
}

// This loads a CSV file and prints the parsed data as JSON to the page
function debugAjax(){
    const csvPath = "data/MegaCities.csv"; // File location

    fetch(csvPath)
        .then(function(response){
            if (!response.ok) {
                // If the file is missing or broken, throw an error
                throw new Error(`File not found at ${csvPath} (HTTP ${response.status})`);
            }
            return debugCallback(response);
        })
        .then(function(csvText){
            if (!csvText) {
                throw new Error('No data received');
            }

            // Turning the CSV into an array of rows
            const rows = csvText.split('\n').filter(row => row.trim());
            const headers = rows[0].split(',').map(header => header.trim());

            // Builds an array of city objects
            const citiesData = [];
            for(let i = 1; i < rows.length; i++) {
                const cells = rows[i].split(',').map(cell => cell.trim());
                if (cells.length !== headers.length) continue;

                const cityObject = {};
                headers.forEach((header, index) => {
                    cityObject[header] = cells[index];
                });
                citiesData.push(cityObject);
            }

            // Adding the parsed data to the page
            document.querySelector("#mydiv").insertAdjacentHTML(
                'beforeend', 
                JSON.stringify(citiesData)
            );
        })
        .catch(function(error){
            // Logging the error and show a message on the page
            console.error("Error:", error);
            document.querySelector("#mydiv").insertAdjacentHTML(
                'beforeend',
                `<p style="color: red;">Error loading mega cities data: ${error.message}</p>`
            );
        });
}

// Runs everything when the page loads
window.onload = function(){
    createTable();       // Creates the initial table
    addColumns(cityPop); // Adding the city size info
    addEvents();         // Makin teh table interactive
    debugAjax();         // Loading and displaying the mega cities data
};