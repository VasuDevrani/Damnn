export interface UserI {
  name: string;
  _id?: string;
  dob: string;
  password: string;
  email: string;
  phone: string;
  poster_path?: string;
  bg_poster?: string;
  address?: string;
  followers?: string[]
  bio?: string;
  token?: string;
}
