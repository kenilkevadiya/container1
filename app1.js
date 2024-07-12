const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const PORT = Number(process.env.PORT) || 6000;
const CONTAINER2_URL = process.env.CONTAINER2_URL || "http://container2-service:90/calculate";
const FILE_DIR = process.env.FILE_DIR || "/kenil_PV_dir";

app.post('/store-file', (req, res) => {
    const { file, data } = req.body;

    if (!file || !data) {
        return res.json({ file: null, error: 'Invalid JSON input.' });
    }

    const filePath = path.join(FILE_DIR, file);

    fs.writeFile(filePath, data, (err) => {
        if (err) {
            return res.json({ file, error: 'Error while storing the file to the storage.' });
        }
        return res.json({ file, message: 'Success.' });
    });
});

app.post('/calculate', async (req, res) => {
    const { file, product } = req.body;

    if (!file || !product) {
        return res.json({ file: null, error: 'Invalid JSON input.' });
    }

    try {
        const response = await axios.post(CONTAINER2_URL, { file, product });
        return res.json(response.data)
    } catch (error) {
        return res.json({ file, error: 'Input file not in CSV format.'} );
    }

});

app.listen(PORT, () => {
    console.log(`Container 1 is listening on port ${PORT}`);
});

//testing
//testing
//wjkbejck
