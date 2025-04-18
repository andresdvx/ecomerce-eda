export class UserEntity {
  public readonly id: string;
  public readonly name: string;
  public readonly lastName: string;
  public readonly email: string;
  public readonly phone: string;
  public readonly password: string;

  constructor(
    id: string,
    name: string,
    lastName: string,
    email: string,
    phone: string,
    password: string,
  ) {
    this.id = id;
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.phone = phone;
    this.password = password;
  }

  public toObject() {
    return {
      id: this.id,
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
    };
  }

  public toPublic(){
    return {
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      phone: this.phone,
    };
  }
}
