/* eslint-disable @typescript-eslint/no-explicit-any */
export type User = {
  id?: any;
  username?: string;
  email?: string;
  password?: string;
  name?: string;
  display_name?: string;
  avatar_urls?: {
    [key: number] : string
  };
  created_at?: string;
  updated_at?: string;
  slug?: any;
  acf?: {
    acf_optionuser?: {
      user_fullname?: string
      user_phone?: string
      user_avatar?: any
    }
  };
};

export type PasswordData = {
  current_password: string;
  new_password: string;
  new_confirmPassword: string;
}