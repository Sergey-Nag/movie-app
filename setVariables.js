const fs = require('fs');

if (process.argv.length < 3) throw Error('Variables are required!\nExample: node setVariables var1=val1 var2=val2')

const variables = process.argv
  .slice(2)
  .map(arg => arg.split('='))
  .reduce((acc, [variable, value]) => {
    acc[variable] = value;
    return acc;
  }, {});

variables['production'] = true;

const fileText = `export const environment = ${JSON.stringify(variables)};`

fs.writeFileSync('/abc/cba/2/environments/environments.prod.ts', fileText, 'utf8');