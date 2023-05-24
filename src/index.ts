import commandLineArgs from "command-line-args";
import search from "./search";

const optionDefinitions = [
  { name: "index", alias: "i", type: String },
  { name: "src", type: String, multiple: true, defaultOption: true },
];

const options = commandLineArgs(optionDefinitions);

console.log(search(options.index)(options.src.join(" ")));
