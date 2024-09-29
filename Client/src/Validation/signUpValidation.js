import * as Yup from 'yup';

const signUpValidation = Yup.object({
    fullname : Yup.string().min(3).required(),
    username : Yup.string().min(3).required(),
    password : Yup.string().min(8).required(),
    email : Yup.string().min(3).email().required(),
})

export default signUpValidation

