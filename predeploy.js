const fs = require('fs');
const configPath = './config.json';
const config = require(configPath);

config.protocol = 'https://';
config.host = 'cloud-boilerplate-express-apollo.azurewebsites.net';

console.info(`Updating config to production ${config.protocol}${config.host}.`)
fs.writeFile(configPath, JSON.stringify(config, undefined, 2), function (err) {
  if (err) {
    console.error('Error while writing schema to file: ' + outputFile);
    throw err;;
  }
  console.info('Config was successfully updated for production use.')
});