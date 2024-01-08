import type { TransformedUserData } from '~/server/transformers/user';

interface LoginData {
  username: string
  password: string
}

export function useAuth() {
  const useAuthToken = () => useState('auth_token', () => '');
  const useAuthUser = () => useState('auth_user', () => ({} as TransformedUserData));
  const useAuthLoading = () => useState('auth_loading', () => true);

  const setToken = (newToken: string) => {
    const authToken = useAuthToken();
    authToken.value = newToken;
  };

  const setUser = (newUser: TransformedUserData) => {
    const authUser = useAuthUser();
    authUser.value = newUser;
  };

  const setAuthLoading = (newLoading: boolean) => {
    const authLoading = useAuthLoading();
    authLoading.value = newLoading;
  };

  const login = async ({ username, password }: LoginData) => {
    try {
      const { data, status } = await useFetch('/api/auth/login', {
        method: 'POST',
        body: { username, password },
      });

      if (status.value === 'error' || !data.value)
        throw new Error('Invalid login');

      setToken(data.value.access_token);
      setUser(data.value.user);

      return data.value;
    }
    catch (error) {
      console.error(error);
    }
  };

  const refreshToken = async () => {
    try {
      const { data, status } = await useFetch('/api/auth/refresh');

      if (status.value === 'error' || !data.value)
        throw new Error('Invalid refresh');

      setToken(data.value.access_token);

      return data.value;
    }
    catch (error) {
      console.error(error);
    }
  };

  const getUser = async () => {
    try {
      const { data } = await useFetchAPI('/api/auth/user');

      const user = (data.value as { user: TransformedUserData }).user;

      setUser(user);

      return user;
    }
    catch (error) {
      console.error(error);
    }
  };

  const initAuth = async () => {
    setAuthLoading(true);
    try {
      await refreshToken();
      await getUser();
      return true;
    }
    catch (error) {
      console.error(error);
    }
    finally {
      setAuthLoading(false);
    }
  };

  return {
    login,
    useAuthUser,
    useAuthToken,
    useAuthLoading,
    initAuth,
  };
}