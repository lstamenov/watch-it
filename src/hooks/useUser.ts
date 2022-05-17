import { useEffect, useState } from 'react';
import { User } from '../store/user/types';
import { authenticateUser } from '../services/userService';
import { useAppSelector } from '../store/hooks';
import { selectUser } from '../store/user/selectors';

const useUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const reduxUser = useAppSelector(selectUser);
  
  useEffect(() => {
    (async () => {
      const localStorageUserItem = localStorage.getItem('user');
      const localStorageUser: User = JSON.parse(localStorageUserItem || '');
      
      if (localStorageUser.username) {
        setUser(localStorageUser);
      } else {
        try {
          const authResponse = await authenticateUser();
          setUser(authResponse.data);
        } catch (e) {}
  
      }
    })();
  }, [reduxUser]);

  return user;
};

export default useUser;