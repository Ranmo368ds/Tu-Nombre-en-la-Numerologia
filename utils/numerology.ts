/**
 * Pythagorean Numerology Utilities
 */

export const MASTER_NUMBERS = [11, 22, 33];

/**
 * Reduces a number to a single digit (1-9) or a Master Number (11, 22, 33).
 */
export function reduce(num: number, keepMaster: boolean = true): number {
  if (keepMaster && MASTER_NUMBERS.includes(num)) {
    return num;
  }

  let current = num;
  while (current > 9) {
    const sum = current
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit, 10), 0);

    if (keepMaster && MASTER_NUMBERS.includes(sum)) {
      return sum;
    }
    current = sum;
  }
  return current;
}

const letterMap: Record<string, number> = {
  a: 1, j: 1, s: 1,
  b: 2, k: 2, t: 2,
  c: 3, l: 3, u: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, x: 6,
  g: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, r: 9,
};

export function getLetterValue(char: string): number {
  const normalized = char.toLowerCase();
  return letterMap[normalized] || 0;
}

export function calculateNameNumber(name: string, filter?: (char: string) => boolean): number {
  const sum = name
    .toLowerCase()
    .split('')
    .filter(char => /^[a-z]$/.test(char))
    .filter(char => (filter ? filter(char) : true))
    .reduce((acc, char) => acc + getLetterValue(char), 0);

  return reduce(sum);
}

export const isVowel = (char: string) => 'aeiou'.includes(char.toLowerCase());
export const isConsonant = (char: string) => /^[a-z]$/.test(char.toLowerCase()) && !isVowel(char);

export interface DetailedResult {
  value: number;
  breakdown: string;
}

export function getReductionBreakdown(num: number): string {
  if (num <= 9 || MASTER_NUMBERS.includes(num)) return num.toString();

  let current = num;
  let steps: string[] = [num.toString()];

  while (current > 9 && !MASTER_NUMBERS.includes(current)) {
    const digits = current.toString().split('').map(Number);
    const sum = digits.reduce((a, b) => a + b, 0);
    current = sum;
    steps.push(`${digits.join('+')}=${current}`);
  }

  return steps.join(' → ');
}

export function calculateLifePath(dateString: string): DetailedResult {
  const [year, month, day] = dateString.split('-').map(Number);

  const m = reduce(month);
  const d = reduce(day);
  const y = reduce(year);

  const total = m + d + y;
  const final = reduce(total);

  // Breakdown format: "Mes (8) + Día (26->8) + Año (1968->24->6) = 22"
  const mBreak = month > 9 ? `${month}→${m}` : `${m}`;
  const dBreak = day > 9 && !MASTER_NUMBERS.includes(day) ? `${day}→${d}` : `${day}`;
  const yBreak = `${year}→${getReductionBreakdown(year)}`;

  let breakdown = `(${mBreak}) + (${dBreak}) + (${yBreak}) = ${total}`;
  if (total !== final) {
    breakdown += ` → ${getReductionBreakdown(total)}`;
  }

  return { value: final, breakdown };
}

export function calculateNameDetailed(name: string, filter?: (char: string) => boolean): DetailedResult {
  const chars = name
    .toLowerCase()
    .split('')
    .filter(char => /^[a-z]$/.test(char))
    .filter(char => (filter ? filter(char) : true));

  const values = chars.map(getLetterValue);
  const sum = values.reduce((acc, val) => acc + val, 0);
  const final = reduce(sum);

  let breakdown = `${values.join('+')} = ${sum}`;
  if (sum !== final) {
    breakdown += ` → ${getReductionBreakdown(sum)}`;
  }

  return { value: final, breakdown };
}

export function calculateDestinyDetailed(name: string): DetailedResult {
  return calculateNameDetailed(name);
}

export function calculateSoulUrgeDetailed(name: string): DetailedResult {
  return calculateNameDetailed(name, isVowel);
}

export function calculatePersonalityDetailed(name: string): DetailedResult {
  return calculateNameDetailed(name, isConsonant);
}

export type CompatibilityType = "Pareja" | "Socio de negocio" | "Hijo" | "Mascota";

export interface CompatibilityResult {
  score: number;
  synergy: number;
  breakdown: string;
  interpretationKey: string;
}

export function calculateCompatibility(
  myLifePath: number,
  otherLifePath: number,
  type: CompatibilityType
): CompatibilityResult {
  const synergy = reduce(myLifePath + otherLifePath);

  // Basic score calculation (just for demonstration, could be more complex)
  const score = Math.floor(70 + (synergy % 3) * 10 + (myLifePath === otherLifePath ? 5 : 0));

  // Return key prefix + values for component to construct translation key
  // e.g. 'compatibility.partner.1'

  return {
    score: score > 100 ? 100 : score,
    synergy,
    breakdown: `${myLifePath} + ${otherLifePath} = ${myLifePath + otherLifePath} → ${synergy}`,
    interpretationKey: `${type.toLowerCase().replace(/ /g, '_')}.${synergy}`
  };
}

export interface HouseNumerologyResult {
  houseNumber: number;
  houseVibration: number;
  synesthesia: {
    color: string;
    crystals: string; // Keep crystals hardcoded or translate? Crystals are usually universal names, but better translate.
    // We will just return the ID/Number to let component fetch translations
  };
  breakdown: string;
}

export function calculateHouseNumerology(
  addressNum: string,
  streetName: string,
  moveDate?: string
): HouseNumerologyResult {
  // Sum digits of the address number
  const numSum = addressNum
    .split('')
    .filter(char => /^[0-9]$/.test(char))
    .reduce((acc, digit) => acc + parseInt(digit, 10), 0);

  const houseNumber = reduce(numSum);

  // Synesthesia mapping (colors and crystals can remain here or move to translation if names vary widely)
  // For now, let's keep color codes here as they are CSS classes.
  const synesthesiaMap: Record<number, any> = {
    1: { color: "bg-red-600", crystals: "Granate, Cornalina" },
    2: { color: "bg-blue-400", crystals: "Cuarzo Rosa, Selenita" },
    3: { color: "bg-yellow-400", crystals: "Citrino, Pirita" },
    4: { color: "bg-emerald-600", crystals: "Jade, Turmalina Negra" },
    5: { color: "bg-amber-500", crystals: "Ojo de Tigre, Aventurina" },
    6: { color: "bg-pink-500", crystals: "Rodocrosita, Esmeralda" },
    7: { color: "bg-purple-600", crystals: "Amatista, Lapis Lázuli" },
    8: { color: "bg-slate-700", crystals: "Obsidiana, Hematita" },
    9: { color: "bg-indigo-900", crystals: "Piedra de Luna, Labradorita" },
  };

  const vib = synesthesiaMap[houseNumber] || synesthesiaMap[1];

  return {
    houseNumber,
    houseVibration: houseNumber,
    synesthesia: vib,
    breakdown: `Dígitos: ${addressNum.split('').join('+')} = ${numSum} → ${houseNumber}`
  };
}
