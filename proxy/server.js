//@ts-nocheck
const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const axios = require("axios");

const app = express();
const cors = require("cors");
const port = 3001;

app.use(express.json({ limit: "50mb" }));
app.use(cors());

app.post("/process_image", async (req, res) => {
    try {
        const { image } = req.body;
        console.log(image);
        const response = await axios.post(
            "https://node-api.datasphere.yandexcloud.net/process_image",
            {
                image: image,
                positive_prompt:
                    "uniformly blended area, natural and homogeneous background with few details, with open space in center. Realism, no sharp details.",
                negative_prompt:
                    "ugly, deform, distort, disfigured, disgusting, objects, entities, people",
                inpaint_additional_prompt: " ",
                inpaint_negative: "Object modification, people, artifacts.",
                kernel_size: 40,
                use_kernel: 0,
            },
            {
                headers: {
                    Authorization:
                        "Bearer t1.9euelZrGyYrKmIrIzoubk8bPnJTPie3rnpWaycfMjY2bjceZko_OlImay83l8_cHaEtM-e9HRwU4_t3z90cWSUz570dHBTj-zef1656VmpCMmY-LmZyPkYmZiZSXjJaS7_zF656VmpCMmY-LmZyPkYmZiZSXjJaS.8rUJICqRElXI-aHqPYudaMDUiI4Bh_tQuKiIfjGtJiWGyAXUls8WerDo-i4lsuLryOfnj3x8rgnPIu7pVs-2Cg",
                    "x-node-id": "bt13ktngbds2i63dibmf",
                    "x-folder-id": "b1ghpjs6kvfc7th9878i",
                    "Content-Type": "application/json",
                    Accept: "*/*",
                    Connection: "keep-alive",
                    "Access-Control-Allow-Origin": "*",
                    Origin: "*",
                },
            }
        );
        console.log(response);
        res.json(response.data);
    } catch (error) {
        console.log(error.response);
        res.status(error.response?.status || 500).send(
            `HTTP error! status: ${error.response?.status || error.message}`
        );
    }
});

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});

module.exports = app;
