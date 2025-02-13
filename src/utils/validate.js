export const validate = (email, password)=>{
    const emailValidate = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/.test(email);
    const passwordValidate = /^[a-zA-Z0-9!@#$%^&*+/=.]{8,}$/.test(password);

    if(!emailValidate){
        return "Email is not validate";
    }

    if(!passwordValidate){
        return "Password is not validate";
    }

    return null;
}