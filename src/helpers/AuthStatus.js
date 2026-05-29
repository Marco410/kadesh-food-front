import { getAccessToken } from "./AuthTokens";
import { getUserDetailsInLocalStorage } from "./UserDetails";

export function isRestroUserAuthenticated() {
    if (document.cookie.includes("kadeshfood__authenticated=")) {
        return true;
    }
    return Boolean(getUserDetailsInLocalStorage() && getAccessToken());
}