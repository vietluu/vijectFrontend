export type user = {
    _id: readonly string,
    fullName: string,
    email: string,
    image: string,
}
export type userLogin = {
    email: string,
    password: string,
}
export type userRegister = {
    fullName: string,
    email: string,
    password: string,
}
