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
      const localStorageUser: User | null = localStorageUserItem ? JSON.parse(localStorageUserItem) : null;
      
      if (localStorageUser) {
        setUser(localStorageUser);
      } else {
        try {
          console.log('here');
          const authResponse = await authenticateUser();
          setUser(authResponse.data);
        } catch (e) {}
  
      }
    })();
  }, [reduxUser]);

  return user;
};

export default useUser;