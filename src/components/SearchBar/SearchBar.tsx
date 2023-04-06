import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDebouncer } from '../../hooks/useDebouncer';
import { useSearchResults } from '../../store';
import { isShow } from '../../utils/movieUtils';

interface Props {
  children: (props: {
    onSearch: () => void;
    query: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputRef: React.RefObject<HTMLInputElement>;
    isLoading: boolean;
    results: { title: string; type: string; id: number }[];
    onResultClick: (type: string, id: number) => () => void;
  }) => JSX.Element;
}

const SearchBar: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const { isLoading, param } = useDebouncer(query);
  const { searchResults, loadSearchResults } = useSearchResults();

  const results = useMemo(
    () =>
      searchResults.results
        .map((result) => {
          let name: string;
          if (isShow(result)) {
            name = result.name;
          } else {
            name = result.original_title;
          }

          return {
            title: name.length > 24 ? name.substring(0, 24) + '..' : name,
            id: result.id,
            type: result.media_type,
          };
        })
        .filter((result, index, self) => {
          const firstRes = self.find((res) => res.title === result.title);
          if (!firstRes) return false;
          return self.indexOf(firstRes) === index;
        })
        .filter((_, index) => index < 15),
    [searchResults.results, query],
  );

  useEffect(() => {
    loadSearchResults({ query, page: 1, isFirstSearch: true });
  }, [param]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query !== '') {
      inputRef.current?.blur();
      navigate(`/results?query=${query}`);
      setQuery('');
    }
  };

  const handleResultClick = (type: string, id: number) => () => {
    const url = type === 'tv' ? `/shows/play/${id}` : `/movies/play/${id}`;
    navigate(url);
    setQuery('');
  };

  return children({
    query,
    onChange: handleChange,
    onSearch: handleSearch,
    inputRef,
    isLoading: isLoading || searchResults.status === 'pending',
    results,
    onResultClick: handleResultClick,
  });
};

export default SearchBar;
