const fs = require('fs');

// Function to remove duplicates and update the file
function removeDuplicatesAndUpdate(filename) {
    // Read the JSON file
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }

        // Parse the JSON data
        let array = JSON.parse(data);
        const seenUPCs = {};
        
        // Filter the array to remove duplicates and adjust index
        array = array.reduce((uniqueArray, currentObject) => {
            if (!(currentObject["UPC"] in seenUPCs)) {
                seenUPCs[currentObject["UPC"]] = true;
                uniqueArray.push(currentObject);
            }
            return uniqueArray;
        }, []);

        // Write the updated data back to the file
        fs.writeFile(filename, JSON.stringify(array, null, 2), err => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`File ${filename} has been updated!`);
        });
    });
}

// List of filenames to process
const filenames = ['TayTrang.json', 'KemLot.json', 'KemNen.json', 'ToanThan.json', 'VungKin.json', 'DauXa.json', 'PhanNuoc.json' /* Add more filenames as needed */];

// Process each file in the list
filenames.forEach(filename => {
    removeDuplicatesAndUpdate(filename);
});
