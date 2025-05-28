export type Category = {
  id: number;
  name: string;
  slug: string;
};

export type Posts = {
  id: string;
  title: string;
  slug: string;
  thumbnail: {
    thumbnail: string;
    medium: string;
    large: string;
    full: string;
  };
  date: string;
  categories?: Category[];
}; 