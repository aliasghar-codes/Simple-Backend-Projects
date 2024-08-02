import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
    .prompt([
        {
            type: "question",
            name: "name",
            message: "Type anything your wants to make its qr image"
        }
    ])
    .then((answers) => {
        let image = qr.image(answers.name);
        image.pipe(fs.createWriteStream('qr_image2.png'));
        fs.writeFile('userinput.txt', answers.name, function (err) {
            if (err) throw err;
        });
    })