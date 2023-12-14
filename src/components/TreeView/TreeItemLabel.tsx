import styled from 'styled-components';
import Folder from '@mui/icons-material/FolderOutlined';
import Bin    from '@mui/icons-material/DeleteOutlineOutlined';
import File   from '@mui/icons-material/InsertDriveFileOutlined';

export const TreeItemLabel = ({ isExtendable, label, onDelete }: { isExtendable: boolean; label: string; onDelete: () => void; }) => (
  <TreeItemLabel.Wrapper>
    <div>
      {isExtendable ? <Folder /> : <File />}
      {label}
    </div>
    <Bin onClick={onDelete} />
  </TreeItemLabel.Wrapper>
);

TreeItemLabel.Wrapper = styled.div`
  display         : flex;
  align-items     : center;
  justify-content : space-between;

  div {
    display         : flex;
    align-items     : center;
  }

  div > svg {
    transition    : transform 0.2s ease-in-out;
    padding-right : 5px;

    &:hover {
      transform: rotate(45deg);
    }
  }
`;
