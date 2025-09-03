// Simple Hindi to English transliteration mapping
const hindiToEnglishMap = {
  // Vowels
  'अ': 'a', 'आ': 'aa', 'इ': 'i', 'ई': 'ii', 'उ': 'u', 'ऊ': 'uu',
  'ऋ': 'ri', 'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
  
  // Consonants
  'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'nga',
  'च': 'cha', 'छ': 'chha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'nya',
  'ट': 'ta', 'ठ': 'tha', 'ड': 'da', 'ढ': 'dha', 'ण': 'na',
  'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
  'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
  'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va', 'श': 'sha',
  'ष': 'sha', 'स': 'sa', 'ह': 'ha', 'क्ष': 'ksha', 'त्र': 'tra',
  'ज्ञ': 'gya',
  
  // Vowel signs (matras)
  'ा': 'aa', 'ि': 'i', 'ी': 'ii', 'ु': 'u', 'ू': 'uu',
  'ृ': 'ri', 'े': 'e', 'ै': 'ai', 'ो': 'o', 'ौ': 'au',
  
  // Special characters
  '्': '', // Virama (halant) - removes inherent vowel
  'ं': 'n', // Anusvara
  'ः': 'h', // Visarga
  'ँ': 'n', // Chandrabindu
};

// Basic transliteration function
function transliterateHindiToEnglish(text) {
  let result = '';
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    
    // Check for compound characters first
    if (i < text.length - 1) {
      const compound = char + text[i + 1];
      if (hindiToEnglishMap[compound]) {
        result += hindiToEnglishMap[compound];
        i++; // Skip next character as it's part of compound
        continue;
      }
    }
    
    // Single character mapping
    if (hindiToEnglishMap[char]) {
      result += hindiToEnglishMap[char];
    } else if (/[a-zA-Z0-9]/.test(char)) {
      // Keep English characters and numbers as is
      result += char;
    } else if (char === ' ') {
      result += ' ';
    }
    // Skip other characters
  }
  
  return result;
}

// Main function to create English slug from Hindi text
export function createHindiSlug(title) {
  // First transliterate Hindi to English
  const transliterated = transliterateHindiToEnglish(title);
  
  // Create slug from transliterated text
  return transliterated
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with hyphens
    .replace(/[^a-z0-9\-]/g, '')    // Remove all non-alphanumeric characters except hyphens
    .replace(/-+/g, '-')            // Replace multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, '');       // Remove leading/trailing hyphens
}
