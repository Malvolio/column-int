// preprocess.ts
import fs from "fs";
import commandLineArgs from "command-line-args";
import { extractTokens } from "./lib/tokens";

const basename = (path: string) => path.replace(/.*\//g, "");

const extractTokensFromFile = (fileName: string) => {
  const data = fs.readFileSync(fileName, "utf8");
  return extractTokens(data);
};

const updateIndex = (
  outputDir: string,
  fileName: string,
  tokens: Set<string>
) => {
  tokens.forEach((token) => {
    fs.appendFileSync(`${outputDir}/${token}`, `${fileName}\n`);
  });
};

const processFile = (outputDir: string) => (fileName: string) => {
  const tokens = extractTokensFromFile(fileName);
  updateIndex(outputDir, basename(fileName), tokens);
};

const processAllFiles = (files: string[] | undefined, outputDir: string) => {
  (files || []).forEach(processFile(outputDir));
};

const processDirectory = (inputDir: string | undefined, outputDir: string) => {
  if (inputDir) {
    const files = fs.readdirSync(inputDir);
    files
      .map((file) => `${inputDir}/${file}`)
      .filter((file) => fs.statSync(file).isFile())
      .forEach(processFile(outputDir));
  }
};

const optionDefinitions = [
  { name: "output", alias: "o", type: String },
  { name: "input", alias: "i", type: String },
  { name: "src", type: String, multiple: true, defaultOption: true },
];

const options = commandLineArgs(optionDefinitions);

processAllFiles(options.src, options.output);
processDirectory(options.input, options.output);
