/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from 'inquirer';
import qr from 'qr-image';
import fs from "fs";

inquirer
  .prompt([
    {
    /* Get URL from user */
      name: 'url',
      message: 'What is the URL you would like to generate a QR code for?',
      type: 'input'
    }
  ])
  .then((answers) => {
    // use entered URL to generate QR code and save image/text to files
      var img = qr.image(answers.url, { type: 'png' });
      img.pipe(fs.createWriteStream("qr_img.png"));

      fs.writeFile("URL.txt", answers.url, (err) => {
        if (err) throw err;
      })
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
      console.log("Tty Error");
    } else {
      // Something else went wrong
      console.log("Error");
    }
  });
