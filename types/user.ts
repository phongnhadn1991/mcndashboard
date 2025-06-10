export type User = {
  id?: string;
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
  acf?: {
    acf_optionuser?: {
      user_fullname?: string
      user_phone?: string
      user_avatar?: {
        thumbnail?: string,
        medium?: string,
        medium_large?: string,
        large?: string,
        url?: string
      }
    }
  };
};