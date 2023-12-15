import styled        from 'styled-components';
import { Clear }     from '@mui/icons-material';
import { InputBase } from '@mui/material';

interface ISearchProps {
  placeholder?      : string;
  searchInputValue  : string;
  handleSearchInput : (searchText: string) => void;
}

export const Search = ({
  placeholder = "Search",
  searchInputValue,
  handleSearchInput,
}: ISearchProps) => (
  <Search.Wrapper>
    <Search.InputContainer>
      <InputBase
        fullWidth
        placeholder = {placeholder}
        value       = {searchInputValue}
        onChange    = {({ target: { value } }) => handleSearchInput(value)}
      />

      <Clear onClick={() => handleSearchInput('')} />
    </Search.InputContainer>
  </Search.Wrapper>
);

Search.Wrapper = styled.div`
  display         : flex;
  align-items     : center;
  justify-content : flex-start;

  svg {
    color     : ${({ theme }) => theme.colors.grey};
    font-size : 12px;
    cursor    : pointer;
  }
`;

Search.InputContainer = styled.div`
  display       : flex;
  align-items   : center;
  border-radius : 25px;
  padding       : 0 5px;
  width         : 100%;
`;
