const http = require("http");
const doxeyclient = require("doxey-client-nodejs");

const app = http.createServer((request, response) => {
    var model = {
        "name": "John Doe",
        "company": "ACME",
        "address": "1234 Market Street, San Francisco, CA 94103, United States",
        "date": "2019-09-23T18:25:00.000Z",
        "invoiceNumber": "INV-12345678",
        "signer": "Cora Nilson",
        "signature": "https://www.doxey.io/images/signature.png",
        "subtotal": 1301,
        "vatRate": 19,
        "vat": 247.19,
        "total": 1548.19,
        "items": [
            {
                "name": "Project Setup",
                "description": "Create github repo, setup timetracker and Slack channels",
                "amount": 90
            },
            {
                "name": "Optimize Photos",
                "description": "Scan, crop and scale images to reduce loading times",
                "amount": 340.50
            },
            {
                "name": "Website structure",
                "description": "Copy blank boostrap template. Setup pages and adjust links",
                "amount": 250.50
            },
            {
                "name": "CSS theme",
                "description": "Create CSS styles according to CI",
                "amount": 620
            }
        ]
    };

    doxeyclient.mergeUrl ("https://api.doxey.io/merge", "https://docs.google.com/document/d/1urL-JV2m85jry1_tatbjSFBjUZgGiMmwwNR9X8UTUTg/edit", "PDF", model, "de-DE", "GMT+01:00", "EUR", "")
    .then((buffer) => {
        response.writeHead(200, { "Content-Type": "application/pdf", "Content-Disposition": "inline" });
        response.end(buffer, 'binary');
    })
    .catch(x => {
        response.writeHead(500, { "Content-Type": "text/plain" });
        response.end("Error " + x);
    });
});

app.listen(3000);
console.log ("Open a browser at http://127.0.0.1:3000 to create a PDF");
