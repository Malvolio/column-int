A very basic implementation of an indexed search.

# preprocessing

There is a preprocess step that is given a directory or list of files to work on and

1. extracts all the tokens\* from each file
2. in an index directory, creates a file represent each token, and puts in it the name of every file that contains that token

\* a token is defined as any sequence of non-whitespace in the text, 
delimited by whitespace,
with any non-alphanumerics removed and knocked down to lowercase, 
that is at least three characters long
 
## Usage

`yarn preprocess -o *index-directory* [-i *corpus-directory*] [*corpus-file*...]`

The index-directory is required (and must already exist); you must specify either a corpus-directory or one or more corpus-files or both.

# searching

Given a search string, the search process

1. extracts all the tokens, just as in the preprocessing stage
2. for each token, finds all the files listed in the index that contain that token *or any token that starts from that token*
3. Calculates in the intersection of all those lists

The result is, if you search  "the Daily EnronOnline", you get a list of all the files that contain "the" "daily" and "enrononline"

## Usage

The index file is meant solely as a demonstration, and can be run like this:

`yarn search [-c] -i  *index-directory* *search-string*`

More typically, you would invoke it in code as 

```
const searchEngine = search({indexDir: indexDir, containSearch: true })
...

const results = searchEngine(searchString);
```

