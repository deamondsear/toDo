export default class UserDTO {
  firstName;
  lastName;
  email;

  constructor(model) {
    this.firstName = model.firstName;
    this.lastName = model.lastName;
    this.email = model.email;
  }
}
