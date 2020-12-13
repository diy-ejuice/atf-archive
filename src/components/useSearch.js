import { debounce } from 'lodash';
import { useState, useCallback } from 'react';

export default function useSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSetSearchTerm = debounce(setSearchTerm, 250);
  const onChange = useCallback(
    (event) => debouncedSetSearchTerm(event.target.value),
    [debouncedSetSearchTerm]
  );

  return {
    searchTerm,
    onChange
  };
}
