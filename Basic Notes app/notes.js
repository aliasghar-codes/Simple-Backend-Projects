import chalk from "chalk";
import fs from "fs";

const addNotes = (title, body) => {

    const notes = loadNotes();

    const duplicateNote = notes.find(note => note.title === title);
    console.log(duplicateNote);

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        writeNote(notes);
        console.log(chalk.green.bold("Your note has been added!"));
    } else {
        console.log(chalk.red.bold("Note title already exists!"));
    }
}

const removeNote = title => {

    const notes = loadNotes();

    const filteredNotes = notes.filter(note => note.title !== title);
    
    if(notes.length > filteredNotes.length){
        writeNote(filteredNotes);
        console.log(chalk.green("Your note has been removed!"))
    }else{
        console.log(chalk.red("Note with that title doesn't exists"))
    }
}

const listNotes = () => {
    console.log(chalk.bold.yellowBright("Your notes!"));
    const notes = loadNotes();
    for(let note of notes){
        console.log(note.title);
    }
}

const readNote = (title) => {
    const notes = loadNotes();
    const noteFound = notes.find(note => note.title === title);
    if(noteFound){
        console.log(chalk.bgCyanBright.bold(noteFound.title));
        console.log(noteFound.body);
    }else{
        console.log(chalk.red("No note found!"))
    }
}

const loadNotes = () => {
    try {
        return JSON.parse(fs.readFileSync("notes.json").toString());
    } catch (e) {
        return [];
    }
}

const writeNote = notes => fs.writeFileSync("notes.json", JSON.stringify(notes));

export default {
    addNotes: addNotes,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}