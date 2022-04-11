
export interface User{
    user_id?: number;
    name?: string;
    lastname?: string;
    access_permission?: string;
    email?: string;
    pass?: string;
  	tuple_status?: boolean;
}

export interface UserSingUp{
  user_id?: number;
  name?: string;
  lastname?: string;
  permission_id?: number;
  email?: string;
  pass?: string;
}