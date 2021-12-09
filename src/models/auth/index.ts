export interface LoginUser {
  email: string;
  password: string;
}
export interface Register {
  lastName: string;
  firstName: string;
  email: string;
  password: string;
  repeatPassword?: string;
}
