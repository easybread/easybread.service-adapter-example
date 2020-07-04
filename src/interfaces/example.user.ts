export interface ExampleUser {
  _id: string;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  contacts: {
    email?: string;
    mobilePhone?: string;
  };
}
