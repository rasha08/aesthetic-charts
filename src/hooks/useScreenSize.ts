import { useCallback, useEffect, useState } from 'react';

interface UseScreenSize {
  width: number | null;
  height: number | null;
}

const isClient = typeof window === 'object';

export const useScreenSize = (): UseScreenSize => {
  const getSize: () => UseScreenSize = useCallback(() => {
    return {
      width: isClient ? window.innerWidth : null,
      height: isClient ? window.innerHeight : null,
    };
  }, []);

  const [screenSize, setScreenSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }

    const handleResize = (): void => {
      setScreenSize(getSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setScreenSize, getSize]);

  return screenSize;
};
