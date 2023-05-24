A very basic implementation of an indexed search.

# preprocessing

There is a preprocess step that is given a directory or list of files to work on and

1. extracts all the tokens\* from each file
2. in an index directory, creates a file represent each token, and puts in it the name of every file that contains that token

\* a token is defined as any sequence of non-whitespace in the text, 
delimited by whitespace,
with any non-alphanumerics removed and knocked down to lowercase, 
that is at least three characters long
 
# searching

Given a search string, the search process

1. extracts all the tokens, just as in the preprocessing stage
2. for each token, finds all the files listed in the index that contain that token *or any token that starts from that token*
3. Calculates in the intersection of all those lists

The result is, if you search  "the Daily EnronOnline", you get a list of all the files that contain "the" "daily" and "enrononline"