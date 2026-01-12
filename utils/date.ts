/**
 * Parses a date string in DD/MM/YYYY or MM/DD/YYYY format into YYYY-MM-DD.
 * Returns null if the date is invalid.
 */
export function parseDate(input: string): string | null {
    // Remove non-digit characters except / or -
    const cleanInput = input.replace(/[^0-9/-]/g, "");

    // Split by separator
    const parts = cleanInput.split(/[-/]/);

    if (parts.length !== 3) return null;

    let day, month, year;

    const p0 = parseInt(parts[0], 10);
    const p1 = parseInt(parts[1], 10);
    const p2 = parseInt(parts[2], 10);

    // Heuristic: if first part > 12, it's definitely DD/MM/YYYY
    // or if year is first (YYYY-MM-DD not expected but handle safe)

    if (p2 > 1000) {
        // Format: DD/MM/YYYY or MM/DD/YYYY
        year = p2;

        // Ambiguity check: if both <= 12, assume DD/MM (European/Latam standard preference)
        // The user requested "DD/MM/YYYY" as primary placeholder
        if (p1 > 12) {
            // MM/DD/YYYY invalid here so must be DD/MM
            day = p0;
            month = p1; // Wait, if p1 > 12, p1 cannot be month. 
            // Actually if p1 > 12, then p0 must be month? No.
            // Let's stick to standard logic:
        }

        // Strategy: Try to accept both, defaulting to DD/MM/YYYY
        if (p1 > 12 && p0 <= 12) {
            // MM/DD/YYYY ? No, p1 is day. 
            // input: 05/25/1990 -> p0=5, p1=25. p1>12, so p1 is Day. p0 is Month.
            month = p0;
            day = p1;
        } else {
            // Assume DD/MM/YYYY by default (15/05/1990)
            day = p0;
            month = p1;
        }
    } else if (p0 > 1000) {
        // YYYY/MM/DD
        year = p0;
        month = p1;
        day = p2;
    } else {
        return null;
    }

    // Validate ranges
    if (month < 1 || month > 12) return null;
    if (day < 1 || day > 31) return null;
    if (year < 1900 || year > 2100) return null;

    // Construct YYYY-MM-DD
    const yyyy = year.toString();
    const mm = month.toString().padStart(2, '0');
    const dd = day.toString().padStart(2, '0');

    // Verify real date (e.g. Feb 30)
    const dateObj = new Date(`${yyyy}-${mm}-${dd}`);
    if (isNaN(dateObj.getTime())) return null;
    // Check strict match (to avoid Date object auto-correction)
    const isoDates = dateObj.toISOString().split('T')[0].split('-');
    if (parseInt(isoDates[1]) !== month || parseInt(isoDates[2]) !== day) {
        return null;
    }

    return `${yyyy}-${mm}-${dd}`;
}

export function isValidDateStr(input: string): boolean {
    return parseDate(input) !== null;
}
