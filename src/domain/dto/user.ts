export enum UserStatus {
  Active = "Active",
  Pending = "Pending",
  Blocked = "Blocked"
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  status: UserStatus;
  city: string;
  avatar: string;
}