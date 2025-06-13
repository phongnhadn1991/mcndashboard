export type Category = {
  id?: string | number;
  name?: string;
  slug?: string;
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
  author: string,
  categories: Category[];
  status: 'publish' | 'pending';
  pagination?: {
    has_next_page: boolean,
    has_prev_page: boolean,
    limit: number,
    page: number,
    total: number,
    total_pages: number
  }
}; 