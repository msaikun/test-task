import styled from 'styled-components';
import Folder from '@mui/icons-material/FolderOutlined';
import Bin    from '@mui/icons-material/DeleteOutlineOutlined';
import File   from '@mui/icons-material/InsertDriveFileOutlined';

interface ITreeItemLabelProps {
  isExtendable : boolean;
  label        : string;
  onDelete     : () => void;
}

export const TreeItemLabel = ({ isExtendable, label, onDelete }: ITreeItemLabelProps) => (
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
    display     : flex;
    align-items : center;

    svg {
      padding-right : 5px;
    }
  }
`;
