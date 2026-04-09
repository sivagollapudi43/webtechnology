const fs = require("fs");

const FILE = "sample.txt";

const divider = () => console.log("─".repeat(45));

function createFile() {
  divider();
  console.log("[ 1 ]  CREATE FILE");
  divider();

  const content = "Hello, Node.js!\nThis file was created using fs.writeFile.";

  fs.writeFile(FILE, content, "utf8", (err) => {
    if (err) {
      console.error("  ERROR:", err.message);
      return;
    }
    console.log(`  File created     →  ${FILE}`);
    console.log(`  Content written  →  "${content.split("\n")[0]}..."`);
    readFile();
  });
}

function readFile() {
  divider();
  console.log("[ 2 ]  READ FILE");
  divider();

  fs.readFile(FILE, "utf8", (err, data) => {
    if (err) {
      console.error("  ERROR:", err.message);
      return;
    }
    console.log("  Contents of", FILE + ":");
    data.split("\n").forEach((line) => console.log("    |", line));
    appendFile();
  });
}

function appendFile() {
  divider();
  console.log("[ 3 ]  APPEND TO FILE");
  divider();

  const extra = "\nAppended line using fs.appendFile.";

  fs.appendFile(FILE, extra, "utf8", (err) => {
    if (err) {
      console.error("  ERROR:", err.message);
      return;
    }
    console.log("  Appended text  →  \"Appended line using fs.appendFile.\"");

    fs.readFile(FILE, "utf8", (err, data) => {
      if (err) {
        console.error("  ERROR:", err.message);
        return;
      }
      console.log("  Updated contents:");
      data.split("\n").forEach((line) => console.log("    |", line));
      deleteFile();
    });
  });
}

function deleteFile() {
  divider();
  console.log("[ 4 ]  DELETE FILE");
  divider();

  fs.unlink(FILE, (err) => {
    if (err) {
      console.error("  ERROR:", err.message);
      return;
    }
    console.log(`  File deleted  →  ${FILE}`);
    divider();
    console.log("  All file operations completed successfully.");
    divider();
  });
}

divider();
console.log("   NODE.JS FILE SYSTEM OPERATIONS");
divider();
createFile();
