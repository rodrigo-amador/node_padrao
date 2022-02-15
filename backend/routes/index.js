module.exports = app => {
    // Login
    console.log(app.services)
    const LoginService = app.services.login;

    app.post(`/login`, LoginService.login);
};