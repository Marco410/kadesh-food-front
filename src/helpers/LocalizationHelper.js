const LANGUAGE_KEY = "KADESH__LANG";

export function getLanguage() {
    return localStorage.getItem(LANGUAGE_KEY);
}

export function setLanguage(lang) {
    localStorage.setItem(LANGUAGE_KEY, lang);
}