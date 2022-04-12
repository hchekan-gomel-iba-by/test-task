export const formInputsSignIn = [
  {
    type: "text",
    value: "",
    name: "username",
    label: "Username",
    check: "isEmpty",
  },
  {
    type: "password",
    value: "",
    name: "password",
    label: "Password",
    check: "isPassword",
  },
];

export const formInputsSignUp = [
  {
    type: "text",
    value: "",
    name: "username",
    label: "Username",
    check: "isEmpty",
  },
  {
    type: "text",
    value: "",
    name: "email",
    label: "Email",
    check: "isEmail",
  },
  {
    type: "password",
    value: "",
    name: "password",
    label: "Password",
    check: "isPassword",
  },
];

export const formInputsAddProject = [
  {
    type: "text",
    value: "",
    name: "name",
    label: "Name",
    check: "isEmpty",
  },
  {
    type: "date",
    value: "",
    name: "dateStart",
    label: "Start date",
    check: "isEmpty",
  },
  {
    type: "date",
    value: "",
    name: "dateFinish",
    label: "End date",
    check: "isNotCheck",
  },
];
