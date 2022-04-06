// model
export interface User {
  id: number;
  email: string;
  // todo: 这里改model的话要跟server端匹配
  first_name: string;
  last_name: string;
  avatar: string;
  update: boolean; // 判断是否已更新
}


