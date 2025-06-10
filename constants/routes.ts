export const ROUTES = {
    forgotpassword: "/forgot-password",
    resetpassword: "/reset-password",
    login: "/login",
    register: "/register",
    home: "/",
    post: '/post',
    account: '/account',
    account_profile: '/account/profile',
    account_settings: '/account/settings'
};

export const AUTH_ROUTES = [
    ROUTES.login,
    ROUTES.forgotpassword,
    ROUTES.resetpassword,
    ROUTES.register
];

export const ACCOUNT_ROUTES = [
    ROUTES.account,
    ROUTES.account_profile,
    ROUTES.account_settings
]

