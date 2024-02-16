export const genFirstLetterUpperCase = (words: string | string[]): string => {
  return (Array.isArray(words) ? words : words.replace(/[,|.]+/, '').split(' '))
    .map(word => word ? word[0].toUpperCase() + word.slice(1).toLowerCase() : '').join(' ');
};
