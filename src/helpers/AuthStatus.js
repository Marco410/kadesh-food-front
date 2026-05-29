export function isRestroUserAuthenticated() {
    const restroAuthenticated = document.cookie.includes("kadeshfood__authenticated=");
    return restroAuthenticated;
}