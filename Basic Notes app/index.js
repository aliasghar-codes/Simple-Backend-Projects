// const fs = require("fs");
import notes from "./notes.js";
import yargs from "yargs";

yargs.version('1.1.0')

yargs.command({
    command: "add",
    describe: "Type add to add a note",
    builder: {
        title: {
            describe: "Type the title of your note!",
            demandOption: true,
            type: "string"
        },
        body: {
            describe: "Type the body of the note you want",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.addNotes(argv.title, argv.body);
    }
})

yargs.command({
    command: "remove",
    describe: "remove a note",
    builder: {
        title: {
            describe: "You are removing an existing note",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        notes.removeNote(argv.title);
    }
})

yargs.command({
    command: "read",
    describe: "Read a note.",
    builder: {
        title: {
            demandOption: true,
            describe: "Reading a note",
            type: "string"
        }
    },
    handler(argv) {
        notes.readNote(argv.title);
    }
})

yargs.command({
    command: "list",
    describe: "List of all available notes",
    handler() {
        notes.listNotes();
    }
})

yargs.parse();
