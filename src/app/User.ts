// model
export interface User {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: [UserData];
  support: {
    url: string;
    text: string;
  }
}

export interface UserData {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  update: boolean; // 判断是否已更新
}


