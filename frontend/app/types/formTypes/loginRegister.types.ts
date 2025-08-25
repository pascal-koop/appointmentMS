export type TLoginForm = {
    email: string,
    password: string
}

export type TRegisterForm = {
    email: string,
    password: string,
    passwordComparission: string
    firstName: string,
    lastName: string,
    phone?: string
}