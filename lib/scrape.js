import puppeteer from "puppeteer";
import axios from "axios";
import fs from "fs";
import path from "path";


const ekataClass = {
    label: ".detail-heading.col-md-2",
    value: ".detail-description.col-md-10",
    namaPenyedia: "a.badge",
    harga: "div#detailhargaChange",
    gambar: "div.image-display img",
    produkId: "div.row section p"
}

const deleteImages = async () => {
    const directory = path.resolve('./public/images');
    fs.readdir(directory, (err, files) => {
        if (err) throw err;

        for (const file of files) {
            fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
            });
        }
    });
};

const downloadImage = async (url, filePath) => {
    const writer = fs.createWriteStream(filePath);
    const response = await axios({
        url,
        responseType: 'stream'
    });
    response.data.pipe(writer);
    return new Promise((resolve, reject) => {
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
};

const scrape = async (url) => {
    try{
    await deleteImages();
    const { label, value, namaPenyedia, harga, gambar, produkId } = ekataClass;
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Navigate to the page
    await page.goto(url);

    // Wait for the elements to appear
    await page.waitForSelector(label);
    await page.waitForSelector(value);
    await page.waitForSelector(namaPenyedia);
    await page.waitForSelector(harga);
    await page.waitForSelector(gambar);
    await page.waitForSelector(produkId);

    // Ensure the image URL is available
    await page.waitForFunction(
        () => {
            const img = document.querySelector("div.image-display img");
            return img && img.getAttribute('data-src');
        },
        { timeout: 2000 }
    );


    const data = await page.evaluate(({ label, value, namaPenyedia, harga, gambar, produkId }) => {
        const labelElements = document.querySelectorAll(label);
        const valueElements = document.querySelectorAll(value);
        const namaPenyediaElements = document.querySelector(namaPenyedia);
        const hargaElements = document.querySelector(harga);
        const gambarElements = document.querySelector(gambar);
        const produkIdElements = document.querySelector(produkId);
        const result = {};

    
        labelElements.forEach((labelEl, index) => {
            const key = labelEl.textContent.trim();
            const valueEl = valueElements[index];
            const valueText = valueEl ? valueEl.textContent.trim() : null;
            result[key] = valueText;
        });


        result["Produk Id"] = produkIdElements ? produkIdElements.textContent.trim() : null;
        result["gambar"] = gambarElements ? gambarElements.getAttribute('data-src') : null;
        result["Harga"] = hargaElements ? hargaElements.textContent.trim() : null;
        result["Nama Penyedia"] = namaPenyediaElements ? namaPenyediaElements.textContent.trim() : null;

        return result;
    }, { label, value, namaPenyedia, harga, gambar, produkId });
    
    const filteredData = {
        "Nama Produk": data["Nama Produk"] || null,
        "Harga": data["Harga"] || null,
        "Nama Penyedia": data["Nama Penyedia"] || null,
        "Merek": data["Merek"] || null,
        "Produk Id": data["Produk Id"] || null,
        "Komponen biaya": data["Komponen biaya"] || null,
        "gambar": data["gambar"] || null,
        "url": `downloaded_image_${Date.now()}.jpeg`
    };

    // Download the image if URL is present
    if (filteredData.gambar) {
        const imageUrl = new URL(filteredData.gambar, "https://e-katalog.lkpp.go.id").href;
        const filePath = path.resolve("./public/images", filteredData.url);
        console.log(`Downloading image from ${imageUrl} to ${filePath}`);
        await downloadImage(imageUrl, filePath);
        console.log('Image downloaded and saved successfully.');
    }
    await browser.close();
    return filteredData
}   catch (error) {
    return error
}
}


export default scrape




//Nama Produk, Harga, Nama Penyedia, Merek, Produk id, Komponen biaya, Wilayah Jual

//Nama Produk, Harga, Nama Penyedia, Merek, Produk Id, Komponen biaya