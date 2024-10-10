const Cookie = require('js-cookie')

const SetCookie = (cookiename, user) => {
    Cookie.set(cookiename, user, {
        expires: 1,
    });
};
module.exports = SetCookie;