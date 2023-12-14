import styled        from 'styled-components';
import { Clear }     from '@mui/icons-material';
import { InputBase } from '@mui/material';

const Wrapper = styled.div`
  display         : flex;
  align-items     : center;
  justify-content : flex-start;
`;

const InputContainer = styled.div`
  display       : flex;
  align-items   : center;
  border-radius : 25px;
  padding       : 0 5px;
  margin        : 10px 0;
  width         : 100%;

`;

interface IProps {
  searchInputValue  : string;
  handleSearchInput : (searchText: string) => void;
}

export const Search = ({
  searchInputValue,
  handleSearchInput,
}: IProps) => (
  <Wrapper>
    <InputContainer>
      <InputBase
        fullWidth
        placeholder = "Search"
        value       = {searchInputValue}
        onChange    = {({ target: { value } }) => handleSearchInput(value)}
      />

      <Clear onClick={() => handleSearchInput('')} />
    </InputContainer>
  </Wrapper>
);
