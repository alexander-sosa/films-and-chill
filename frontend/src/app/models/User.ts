
export interface User{
    user_id?: number;
    name?: string;
    lastname?: string;
    permission_id?: number;
    username?: string;
    pass?: string;
}

export interface UserSingUp{
  user_id?: number;
  name?: string;
  lastname?: string;
  permission_id?: number;
  email?: string;
  pass?: string;
}