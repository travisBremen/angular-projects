// model
export interface User {
  id?: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  update: boolean; // 判断是否已更新
}


