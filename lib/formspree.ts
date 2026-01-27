/**
 * Centralized Formspree utility to handle business-specific IDs and form submissions.
 */

// Known valid Formspree IDs
export const FORMSPREE_IDS = {
    INSTINTO: "xgooeyqd",
    GENES: "xaqobdna",
};

/**
 * Gets the correct Formspree ID based on the current hostname.
 */
export function getFormspreeId() {
    if (typeof window === "undefined") return FORMSPREE_IDS.INSTINTO;

    const hostname = window.location.hostname;

    // Check for Genes Marketing domains
    if (
        hostname.includes("genesmarketing.com") ||
        hostname.includes("genes-marketing") ||
        // If testing locally on a port often used for Genes experiments or if the path implies it
        (hostname === "localhost" && window.location.pathname.includes("genesmarketing"))
    ) {
        return process.env.NEXT_PUBLIC_FORMSPREE_GENES_ID || FORMSPREE_IDS.GENES;
    }

    // Default to Instinto Saludable
    return process.env.NEXT_PUBLIC_FORMSPREE_ID || FORMSPREE_IDS.INSTINTO;
}

/**
 * Submits form data to Formspree.
 */
export async function submitToFormspree(data: Record<string, any>, customId?: string) {
    const formId = customId || getFormspreeId();

    const response = await fetch(`https://formspree.io/f/${formId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to submit form");
    }

    return response.json();
}
