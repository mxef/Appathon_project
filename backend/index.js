const express = require('express');
const fs = require('fs');
const parse = require('csv-parse');
const cors = require('cors');


//==============================================================================
// TODO OPT: Better error messages (json?)?
const paramName = 'medicine';

const getBody = (req, res, next) => {
    if (!(paramName in req.body)) {
        res.status(400).send(`no ${paramName} in body\n`).end();
        return;
    }

    req.keywords = req.body[paramName];
    next();
};

const getQuery = (req, res, next) => {
    if (!(paramName in req.query)) {
        res.status(400).send(`no ${paramName} in query\n`).end();
        return;
    }

    req.keywords = req.query[paramName];
    next();
};

const getKeywords = getBody;
// const getKeywords = getQuery;

//==============================================================================
// TODO OPT: Better error messages? json?
const validateString = (req, res, next) => {
    if (typeof req.keywords !== "string") {
        res.status(400).end('keywords not a string\n');
        return;
    }

    req.keywords = req.keywords.split(',');
    next();
};

const validateObject = (req, res, next) => {
    if (!Array.isArray(req.keywords)){
        res.status(400).send('keywords not an array\n').end();  }
    else if (req.keywords.length > 10)
        res.status(400).send('too many keywords\n').end();
    else if (req.keywords.length == 0)
        res.status(400).send('keyword not found\n').end();
    else if (!req.keywords.every(k => (typeof k === "string")))
        res.status(400).send('keywords elements not strings\n').end();
    else {
        req.keywords = new Set(req.keywords.map(k => k.toLowerCase()));
        next();
    }
};

const validate = validateObject;
// const validate = [validateString, validateObject];

//==============================================================================
const metadataFile = './metadata.csv';

const process = (req, res, next) => {
    const fin = fs.createReadStream(metadataFile);
    const parser = parse({
        columns: true,  // Parse into objects, using the header for key names
    });
    fin.on('error', (err) => {
        next(err);  // Errors are not propagated through pipes
    }).pipe(parser);

    counts = {};
    for (const k of req.keywords)
        counts[k] = 0;
    papers = {};

    parser.on('data', (record) => {
        medsInPaper = [];
        for (const k of req.keywords) {
            if (record.title.toLowerCase().includes(k) ||
                record.abstract.toLowerCase().includes(k)) {
                counts[k]++;
                medsInPaper.push(k);
            }
        }
        if (medsInPaper.length > 1)
            papers[record.cord_uid] = medsInPaper;
    });
    parser.on('end', () => {
        countsArr = [];
        for (const k of Object.keys(counts))
            countsArr.push({'medicine': k, 'count': counts[k]});

        papersArr = [];
        for (const p of Object.keys(papers))
            papersArr.push({'cord_uid': p, 'medicine': papers[p]});

        res.send({'counts': countsArr, 'papers': papersArr}).end();
    });
    parser.on('error', (err) => {
        next(err);
    });
    // TODO OPT: If too slow: Listen on readable instead of data?
    // TODO OPT: If too slow: grep?
};
//==============================================================================
const port = 8000;

const app = express();
app.use(cors()); // Use this after the variable declaration

app.use(express.json());

app.post('/', getKeywords, validate, process);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
