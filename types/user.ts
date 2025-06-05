export type User = {
  id?: string;
  username?: string;
  email?: string;
  password?: string;
  name?: string;
  display_name?: string;
  avatar_urls?: {
    24: string,
    48: string,
    96: string
  };
  created_at?: string;
  updated_at?: string;
};