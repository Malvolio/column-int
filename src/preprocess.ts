// preprocess.ts
import fs from "fs";
import commandLineArgs from "command-line-args";
import { extractTokensFromFile } from "./lib/tokens";

// This is the equivalent of the shell function of the same name
// I *think* the full path to the corpus of data is not needed
const basename = (path: string) => path.replace(/.*\//g, "");

// an index entry is a newline-delimited list of all the files that
// contain the token.
const updateIndex = (
  outputDir: string,
  fileName: string,
  tokens: Set<string>
) => {
  tokens.forEach((token) => {
    fs.appendFileSync(`${outputDir}/${token}`, `${fileName}\n`);
  });
};

// this function is curried to make looping easier
const preprocessFile = (outputDir: string) => (fileName: string) => {
  console.log(`Processing ${fileName}`);
  const tokens = extractTokensFromFile(fileName);
  updateIndex(outputDir, basename(fileName), tokens);
};

const preprocessAllFiles = (files: string[] | undefined, outputDir: string) => {
  (files || []).forEach(preprocessFile(outputDir));
};

const preprocessDirectory = (
  inputDir: string | undefined,
  outputDir: string
) => {
  if (inputDir) {
    const files = fs.readdirSync(inputDir);
    files
      .map((file) => `${inputDir}/${file}`)
      .filter((file) => fs.statSync(file).isFile())
      .forEach(preprocessFile(outputDir));
  }
};

const optionDefinitions = [
  { name: "output", alias: "o", type: String },
  { name: "input", alias: "i", type: String },
  { name: "src", type: String, multiple: true, defaultOption: true },
];

const options = commandLineArgs(optionDefinitions);

preprocessAllFiles(options.src, options.output);
preprocessDirectory(options.input, options.output);
