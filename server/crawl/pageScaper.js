const fs = require('fs');

const scraperObject = {
    url: 'https://hasaki.vn/danh-muc/sua-rua-mat-c19.html',
    categoryName: 'SuaRuaMat', // Set your default category name here

    async scraper(browser, categoryName = this.categoryName) {
        let page = await browser.newPage();

        console.log(`Navigating to ${this.url}...`);
        await page.goto(this.url, { waitUntil: 'load' });

        // Wait for the required DOM to be rendered
        await page.waitForSelector('.ProductGrid__grid.width_common');

        // Get the links to all the products
        let productLinks = await page.$$eval('.ProductGrid__grid.width_common .ProductGridItem__itemOuter > .item_sp_hasaki > a', links => {
            return links.map(a => a.href);
        });

        let scrapedData = [];

        // Loop through each product link
        for (let link of productLinks) {
            // Reuse the same page to avoid opening a new page for each product
            await page.goto(link);

            // Extract data for each product
            let dataObj = {
                productName: (await page.$eval('#head_detail > div.product-info-main > div.product-info-price > div.page-title-wrapper.product > div.page-title.name_detail > h1', h1 => h1.textContent)).trim(),
                UPC: (await page.$eval('#head_detail > div.product-info-main > div.product-info-price > div.product-brand > span.item-sku.txt_color_1', span => {
                    const rawUPC = span.textContent.trim();
                    // Remove "Mã sản phẩm:" if present
                    return rawUPC.replace('Mã sản phẩm:', '').trim();
                })).trim(),
                productPrice: [(await page.$eval('#head_detail > div.product-info-main > div.product-info-price > div.box_price > #product-final_price', span => span.textContent)).replace(/\n/g, '').trim()],
                productInfo: (await page.$$eval('#main_info_details #section_scroll #box_thongtinsanpham div.ct_box_detail.width_common *', elements => {
                    return elements.map(el => {
                        if (el.tagName === 'P' || el.tagName === 'H3') {
                            return el.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, '').trim();
                        }
                    }).filter(item => item !== undefined && item.trim() !== '');
                })).join(','),
                productSpecs: (await page.$$eval('#main_info_details #section_scroll #box_thongsosanpham div.ct_box_detail.width_common div div table tbody tr', rows => {
                    return rows.map(row => row.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, '').trim());
                })),
                productIngredients: (await page.$$eval('#main_info_details #section_scroll #box_thanhphanchinh div.ct_box_detail.width_common *', elements => {
                    return elements.map(el => {
                        if (el.tagName === 'P' || el.tagName === 'H3') {
                            return el.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, '').trim();
                        }
                    }).filter(item => item !== undefined && item.trim() !== '');
                })).join(','),
                productUsage: (await page.$$eval('#main_info_details #section_scroll #box_huongdansudung div.ct_box_detail.width_common *', elements => {
                    return elements.map(el => {
                        if (el.tagName === 'P' || el.tagName === 'H3') {
                            return el.textContent.replace(/(\r\n\t|\n|\r|\t)/gm, '').trim();
                        }
                    }).filter(item => item !== undefined && item.trim() !== '');
                })).join(','),

                quantity: Math.floor(Math.random() * (50 - 20 + 1)) + 20,
                category: categoryName,
            };

            scrapedData.push(dataObj);
        }

        // Format productPrice to an array with a single element
        scrapedData.forEach(item => {
            if (item.productPrice.length > 1) {
                item.productPrice = [item.productPrice[0]];
            }
        });

        // Write the scraped data to a JSON file
        fs.writeFileSync('scraped_data.json', JSON.stringify(scrapedData, null, 2));
        console.log('Scraped data stored in "scraped_data.json"');

        const filePath = 'scraped_data.json';

        let existingData = [];

        // Check if the file exists and read its content
        if (fs.existsSync(filePath)) {
            const existingContent = fs.readFileSync(filePath, 'utf-8');
            existingData = JSON.parse(existingContent);
        }

        const uniqueData = [];

        // Check for duplicates and remove them
        scrapedData.forEach(item => {
            const stringifiedItem = JSON.stringify(item);
            if (!existingData.some(existingItem => JSON.stringify(existingItem) === stringifiedItem)) {
                existingData.push(item);
                uniqueData.push(item);
            }
        });

        // Write the unique data to the JSON file
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
        console.log('Duplicates removed from "scraped_data.json"');

        await page.close();
    }
};

module.exports = scraperObject;
