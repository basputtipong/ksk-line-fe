export const config = {
    authServiceURL: process.env.REACT_APP_AUTH_SERVICE_URL || '',
    authServicePort: process.env.REACT_APP_AUTH_SERVICE_PORT || 1300,
    accountServiceURL: process.env.REACT_APP_ACCOUNT_SERVICE_URL || '',
    accountServicePort: process.env.REACT_APP_ACCOUNT_SERVICE_PORT || 1400,
    cardServiceURL: process.env.REACT_APP_CARD_SERVICE_URL || '',
    cardServicePort: process.env.REACT_APP_CARD_SERVICE_PORT || 1500,
};