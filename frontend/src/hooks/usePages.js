import { useCallback } from 'react';

export const usePages = (
  searchOffset,
  setSearchOffset,
  numHits
) => {
  const pageLeft = useCallback(() => {
    let offset = searchOffset;
    offset = offset - 10;
    if (offset < 0) {
      offset = 0;
    }

    setSearchOffset(offset);
  }, [numHits, searchOffset]);


  const pageRight = useCallback(() => {
    // Only if we have more than 10 results
    if (numHits > 10) {
      let offset = searchOffset;
      offset = offset + 10;
      // If you're at the end, go back
      if (offset + 10 > numHits) {
        offset = numHits - 10;
      }
      setSearchOffset(offset);
    }
  }, [numHits, searchOffset]);

  return {
    pageLeft,
    pageRight,
  }
};
