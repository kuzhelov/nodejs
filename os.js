var os = require("os");

console.log(os.arch());

console.log(os.type());
console.log(os.release());

console.log(os.uptime() / 3600 / 24);