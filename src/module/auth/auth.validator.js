const yup = require("yup")

const registerValidator = yup.object().shape({
    email: yup.string().email("Email is not valid!").required("Email is required!"),
    username: yup.string().min(4, "Username must containt more than 4 characters.").max(30, "Username can not consist more than 30 characters."),
    fulllname: yup.string().max(50, "Fullname is too long."),
    password: yup.string().min(8, "Password must be more than 8 characters.").max(30, "Password is too long.")
})


module.exports = {
    registerValidator
}