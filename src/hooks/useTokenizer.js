import { useMemo } from 'react';

const COMMON_WORDS = new Set([
  'the', 'a', 'an', 'is', 'are', 'was', 'were', 'be', 'been', 'being',
  'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'shall', 'can', 'need', 'dare', 'ought',
  'used', 'to', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'from',
  'as', 'into', 'through', 'during', 'before', 'after', 'above', 'below',
  'between', 'out', 'off', 'over', 'under', 'again', 'further', 'then',
  'once', 'and', 'but', 'or', 'nor', 'not', 'so', 'yet', 'both',
  'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no',
  'only', 'own', 'same', 'than', 'too', 'very', 'just', 'because',
  'if', 'that', 'this', 'it', 'its', 'I', 'you', 'he', 'she', 'we',
  'they', 'me', 'him', 'her', 'us', 'them', 'my', 'your', 'his',
  'our', 'their', 'what', 'which', 'who', 'when', 'where', 'why', 'how',
  'all', 'any', 'about', 'up', 'there', 'here',
]);

function tokenizeWord(word) {
  const lower = word.toLowerCase();
  // Common short words are single tokens
  if (COMMON_WORDS.has(lower) || word.length <= 3) {
    return [word];
  }
  // Split longer words into subword pieces (~4 chars)
  const pieces = [];
  let i = 0;
  while (i < word.length) {
    const chunkSize = i === 0 ? 4 : 3 + Math.floor(Math.random() * 2);
    pieces.push((i > 0 ? '##' : '') + word.slice(i, i + chunkSize));
    i += chunkSize;
  }
  return pieces;
}

export function useTokenizer(text) {
  return useMemo(() => {
    if (!text || !text.trim()) return { tokens: [], count: 0 };

    const tokens = [];
    // Split on whitespace and punctuation, keeping separators
    const parts = text.match(/[\w']+|[^\w\s]|\s+/g) || [];

    for (const part of parts) {
      if (/^\s+$/.test(part)) {
        // Whitespace is consumed, not a visible token
        continue;
      }
      if (/^[^\w\s]$/.test(part)) {
        // Punctuation = single token
        tokens.push(part);
      } else {
        tokens.push(...tokenizeWord(part));
      }
    }

    return { tokens, count: tokens.length };
  }, [text]);
}
