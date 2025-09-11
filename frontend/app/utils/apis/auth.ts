import { ApiService } from '~/utils/api';

export type TSignInDto = {
    email: string;
    password: string;
  }

export type TSignInResponse = {
    access_token: string;
    id: string;
    email: string;
}

export type TCreateUserDto = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone: string;
  }

  export type TCreateUserResponse = {
    user: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      phone: string;
    };
  }
export const authApi = {
    login(data: TSignInDto): Promise<TSignInResponse> {
      const {$apiCall} = useNuxtApp();
      return $apiCall('/auth', {method: 'POST', body: data})
       /*  return ApiService.apiCall('/auth', {method: 'POST', body: data}); */
    },
    logout(): Promise<{ok:boolean}>{
      const {$apiCall} = useNuxtApp();
        return $apiCall('/auth/logout', {method: 'POST'});
    },
    createUser(data: TCreateUserDto): Promise<TCreateUserResponse> {
      const {$apiCall} = useNuxtApp();
        return $apiCall('/user', {method: 'POST', body: data});
    }
}