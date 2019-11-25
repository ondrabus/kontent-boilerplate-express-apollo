const fs = require('fs');
const configFile = './config.json';
const config = require(configFile);

config.protocol = 'https://';
config.host = 'kontent-boilerplate-express-apollo.azurewebsites.net';

console.info(`Updating config to production ${config.protocol}${config.host}.`)
fs.writeFile(configFile, JSON.stringify(config, undefined, 2), function (err) {
  if (err) {
    console.error(`Error while writing schema to file: ${configFile}`);
    throw err;
  }
  console.info('Config was successfully updated for production use.')
});
