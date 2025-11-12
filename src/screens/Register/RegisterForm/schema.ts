import * as yup from "yup";

export const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email obrigatório"),
  password: yup
    .string()
    .min(6, "Senha deve ter ao menos 6 caracteres")
    .required("Senha obrigatória"),
  name: yup.string().required("Nome obrigatório"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas devem corresponder")
    .required("Confirmação de senha obrigatória"),
});
