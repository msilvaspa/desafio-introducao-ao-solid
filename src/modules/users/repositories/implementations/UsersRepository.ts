import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const userExists = this.users.find((_user) => _user.email === email);
    if (userExists) throw new Error("User already exists");
    const user = new User();
    user.name = name;
    user.email = email;
    user.admin = false;
    this.users.push(user);
    return user;
  }

  findById(id: string): User {
    const userExists = this.users.findIndex((_user) => _user.id === id);
    if (userExists < 0) throw new Error("User not found");
    return this.users[userExists];
  }

  findByEmail(email: string): User {
    return this.users.find((user) => user.email === email);
  }

  turnAdmin(receivedUser: User): User {
    const userExists = this.users.findIndex(
      (_user) => _user.id === receivedUser.id
    );
    if (userExists < 0) throw new Error("User not found");

    const userAdmin = { ...this.users[userExists], admin: true };

    this.users.splice(userExists, 1, userAdmin);
    return userAdmin;
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
