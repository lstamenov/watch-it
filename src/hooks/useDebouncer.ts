import { useEffect, useState } from 'react';

export const useDebouncer = <T>(value: T) => {
  const [timer, setTimer] = useState<ReturnType<typeof window.setTimeout>>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [param, setParam] = useState<T>(value);

  useEffect(() => {
    setIsLoading(true);
    if (timer) {
      clearTimeout(timer);
    }

    const timerId = setTimeout(() => {
      setParam(value);
      setIsLoading(false);
    }, 1000);
    setTimer(timerId);
  }, [value]);

  return { param, isLoading };
};
