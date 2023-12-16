const fs = require('fs');

// Read the JSON file
fs.readFile('almost.json', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Parse the JSON data
  const jsonData = JSON.parse(data);

  // Task 1: Add a zero to the price and remove entries with price < 5.000 after adding a zero
  const updatedData = jsonData.filter(item => {
    if (item.price) {
      // Add a zero
      item.price += '0';

      // Remove entry if price < 5.000 after adding a zero
      return parseFloat(item.price) >= 5.000;
    }
    return true; // Keep entries with missing or non-numeric prices
  });

  // Task 2: Remove rows with NULL in image_urls, productInfo, or productIngredients
  const filteredData = updatedData.filter(item => (
    (item.imageUrls && item.imageUrls.length > 0) &&
    item.productInfo !== null &&
    item.productIngredients !== null &&
    (item.productUsage && item.productUsage.trim() !== '')
  ));

  // Reorder rows
  const reorderedData = filteredData.map((item, index) => {
    if (index === filteredData.length - 1) {
      return item;
    } else {
      return { ...item, soldCount: filteredData[index + 1].soldCount };
    }
  });

  // Convert the result to JSON
  const resultJSON = JSON.stringify(reorderedData, null, 2);

  // Write the result back to a new file (result.json)
  fs.writeFile('result.json', resultJSON, 'utf8', (err) => {
    if (err) {
      console.error('Error writing the result file:', err);
      return;
    }
    console.log('Filtered data has been written to result.json');
  });
});
