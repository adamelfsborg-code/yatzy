export const prettifyString = (inputString: string): string => {
 // Replace non-alphanumeric characters (except spaces) with the replacement string
 const cleanedString: string = inputString.replace(/[^a-zA-Z0-9\s]/g, ' ');

 // Capitalize the first letter of each word
 const words: string[] = cleanedString.split(/\s+/);
 const prettifiedWords: string[] = words.map(word => word.charAt(0).toUpperCase() + word.slice(1));

 // Join the words into a new string
 const prettifiedString: string = prettifiedWords.join(' ');

 return prettifiedString;
};
