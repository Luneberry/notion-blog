const fs = require('fs');
function ls(p){try{return fs.readdirSync(p).join(' ')}catch{return '(missing)'}}
console.log('> .next/server/app:', ls('.next/server/app'));
