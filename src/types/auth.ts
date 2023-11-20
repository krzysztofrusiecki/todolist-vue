export type LoginFields = {
  email: string;
  password: string;
};

export type RegisterFields = LoginFields & {
  firstName: string;
  lastName: string;
};
