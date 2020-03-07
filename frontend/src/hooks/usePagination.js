import { useEffect, useState } from 'react';

export const usePagination = () => {
  const [searchOffset, setSearchOffset] = useState(0);
  return {
    searchOffset,
  }
};
