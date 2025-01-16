import Cookie from 'js-cookie'
const SetCookie =(cookiename, user)=>{
    Cookie.set(cookiename, user,{
        expires:1,
    });
};
export default SetCookie;