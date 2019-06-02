import { authenticationService } from '../services/AuthenticationService';

// checks the bearer token header
export function authHeader() {
    const currentUser = authenticationService.currentUserValue;

    if (currentUser && currentUser.token) {
        return { Authorization: `Bearer ${currentUser.token}` };
    } else {
        return {};
    }
}
