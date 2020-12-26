import {User, UserStatus} from "../../../domain/dto/user";
import users from './users.json';
import {FilterMap} from "../../../hooks/filters.hook";
import {adjust, findIndex, flatten, indexOf, propEq, toLower} from "ramda";

class UserRepository {
  private _users: User[] = users as User[];

  findUsers(filters: FilterMap = {}): User[] {
    let filteredUsers = this._users;

    if (filters.city) {
      filteredUsers = this._users.filter(user => user.city === filters.city);
    }
    if (filters.status) {
      const status = flatten([filters.status]);
      filteredUsers = this._users.filter(user => indexOf(user.status.toLowerCase(), status.map(toLower)) !== -1)
    }

    return filteredUsers;
  }

  block(userId: string): void {
    const indexOfUser = findIndex(propEq('id', userId), this._users);
    this._users = adjust(indexOfUser, user => ({...user, status: UserStatus.Blocked}), this._users);
  }

  approve(userId: string): void {
    const indexOfUser = findIndex(propEq('id', userId), this._users);
    this._users = adjust(indexOfUser, user => ({...user, status: UserStatus.Active}), this._users);
  }
}

export const userRepository = new UserRepository();