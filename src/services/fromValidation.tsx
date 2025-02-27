
const signUpValidation = (key : string, value: string) => {
    switch (key) {
        case "name":
            if (value.length === 0) return "Name is required"
            break;
        case "email":
            if (value.length === 0) return "Name is required"
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)){
                return "Email is invalid";
            }
            break;
        case "password":
            if (value.length === 0) return "Password is required"
            if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,15}$/.test(value)){
                return "Password must contain 8-15 characters with an uppercase, lowercase, number, special character."
            }
            break;
        default:
            return "";
    }
}

const loginValidation = (key : string, value: string) => {
    switch (key) {
        case "email":
            if (value.length === 0) return "Name is required"
            if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)){
                return "Email is invalid";
            }
            break;
        case "password":
            if (value.length === 0) return "Password is required"
            if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,15}$/.test(value)){
                return "Password must contain 8-15 characters with an uppercase, lowercase, number, special character."
            }
            break;
        default:
            return "";
    }
}

export {signUpValidation,loginValidation}
