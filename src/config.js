
const kTomlUrl = "http://localhost:8080/app.toml";
const toml = require('toml');

const ReadConfigure = (callback = null) => {
    $.get(kTomlUrl,(data,status)=>{
      if (status === "success" && typeof data === "string") {
        const config = toml.parse(data);
          window.config = config;
          console.log(config);
        if (typeof callback === "function") {
          callback(config);
        }
      }
    });
}

export default ReadConfigure;