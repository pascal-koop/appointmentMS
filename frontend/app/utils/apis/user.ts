
import { ApiService } from '~/utils/api';
export type TUser =  {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    phone: string;
    password?: string;
  }
  export type TUpdateUserDto = {
    email?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
  }
export const userApi = {
    get():Promise<TUser> {
        return ApiService.apiCall('/user/profile', {method: 'GET'})
    },
    update(data: TUpdateUserDto): Promise<TUser>{
        return ApiService.apiCall('/user/update', {method: 'POST', body: data})
    }
}