const fs = require('fs');
const path = require('path');
const get = require('./get');

const save = async data => {
    await fs.promises.writeFile(path.join(__dirname, 'droplets.json'), JSON.stringify(data));
};

const main = async () => {
    const results = [];
    let nextPage = 'https://api.digitalocean.com/v2/sizes?page=1';
    while (nextPage) {
        const data = await get(nextPage);
        results.push(...data.sizes);
        nextPage = data.links.pages.next;
    }
    await save(results);
};

main();
