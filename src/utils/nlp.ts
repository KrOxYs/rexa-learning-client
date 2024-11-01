import nlp from "compromise";

/**
 * Runs the given text through compromise's NLP library to enhance it.
 *
 * This includes:
 * - Converting all sentences to title case
 * - Expanding contractions
 * - Converting written-out numbers to their numerical equivalent
 *
 * @param {string} text The text to enhance
 * @return {string} The enhanced text
 */
export const enhanceWithNLP = (text: string): string => {
  const doc = nlp(text);
  doc.sentences().toTitleCase();
  doc.contractions().expand();
  doc.numbers().toNumber();
  return doc.text();
};
