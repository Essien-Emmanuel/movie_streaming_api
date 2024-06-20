
const SUPPORTED_LANGUAGES = ["en", "es", "it"]
// this syntax is equals to "en" | "es" | "it"
export type Language = typeof SUPPORTED_LANGUAGES[number] 