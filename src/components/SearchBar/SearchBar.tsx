import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: (props: {
    onSearch: () => void;
    query: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    inputRef: React.RefObject<HTMLInputElement>;
  }) => JSX.Element;
}

const SearchBar: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setQuery(e.target.value);

  const handleSearch = () => {
    if (query !== '') {
      inputRef.current?.blur();
      navigate(`/results?query=${query}`);
      setQuery('');
    }
  };

  return children({ query, onChange: handleChange, onSearch: handleSearch, inputRef });
};

export default SearchBar;
