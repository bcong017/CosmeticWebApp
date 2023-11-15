const fs = require('fs');

// List of file names for each category
const categoryFiles = [
    'TayTrang.json', 'KemLot.json', 'KemNen.json', 'ToanThan.json', 'VungKin.json', 'DauXa.json', 'PhanNuoc.json'
    // Add more file names as needed
];

// Function to read a JSON file
function readJSONFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
}

// Combine data from all categories
const combinedData = categoryFiles.reduce((result, fileName) => {
    const categoryData = readJSONFile(fileName);
    return result.concat(categoryData);
}, []);

// Write the combined data to a new JSON file
fs.writeFileSync('combined_data.json', JSON.stringify(combinedData, null, 2));

console.log('Combined data stored in "combined_data.json"');
