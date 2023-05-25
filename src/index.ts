import commandLineArgs from "command-line-args";
import search from "./search";

const optionDefinitions = [
  { name: "index", alias: "i", type: String },
  { name: "contains", alias: "c", type: Boolean },
  { name: "src", type: String, multiple: true, defaultOption: true },
];

const options = commandLineArgs(optionDefinitions);

const searchString = options.src.join(" ");

console.log(`Searching for '${searchString}'`);

const results = search({
  indexDir: options.index,
  containSearch: options.contains,
})(searchString);

if (results.length) {
  console.log(`${results.length} file(s) found.`);
  results.forEach((file) => {
    console.log(`* ${file}`);
  });
} else {
  console.log("Sorry, no matching files found");
}
