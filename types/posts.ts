export type Category = {
  id: string | number;
  name: string;
  slug: string;
};

export type Posts = {
  id: string | number;
  title: string;
  slug: string;
  thumbnail: {
    thumbnail: string;
    medium: string;
    large: string;
    full: string;
  };
  date: string;
  categories: Category[];
}; 