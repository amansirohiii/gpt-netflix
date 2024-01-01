export const checkValidEmail=(email)=>{
    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

    if(!isEmailValid) return "Email is invalid";

    return null;
}
export const checkValidPassword=(password)=>{
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
    if(!isPasswordValid) return "Password is invalid"
return null;

}