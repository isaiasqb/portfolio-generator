const fs = require('fs');

const writeFile = fileContent => {
   return new Promise((resolve, reject) => {
      fs.writeFile('./dist/index.html', fileContent, err => {
         //if there is an error, reject the Promise and send it to the .catch
         if (err) {
            reject(err)
            //return out of the function to prevent the resolve part form being actioned
            return;
         }

         //if successful, resolve the promise and send to the .then method.
         resolve({
            ok: true,
            message: "Html Portfolio page Created!"
         });
      });
   });
};


const copyFile = () => {
   return new Promise((resolve, reject) => {
      fs.copyFile('./src/style.css', './dist/style.css', err => {
         // if there is an error, reject
         if (err) {
            reject(err);
            return;   //stops the execution if there is an error
         }

         //if successful, resolve
         resolve({
            ok: true,
            message: 'Stylesheet copied successfully!'
         });
      });
   });
};

module.exports = { writeFile, copyFile };