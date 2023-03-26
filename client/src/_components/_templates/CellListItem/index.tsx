import { Cell } from "_state";
import "./index.css";

import CodeCell from "_components/_organisms/CodeCell";
import TextEditor from "_components/_molecules/TextEditor";
import ActionBar from "_components/_molecules/ActionBar";

interface CellListItemProps {
  cell: Cell;
}

const CellListItem = ({ cell }: CellListItemProps) => {
  return (
    <div className="cell-list-item">
      {cell.type === "code" ? (
        <>
          <div className="action-bar-wrapper">
            <ActionBar id={cell.id} />
          </div>
          <CodeCell cell={cell} />
        </>
      ) : (
        <>
          <ActionBar id={cell.id} />
          <TextEditor cell={cell} />
        </>
      )}
    </div>
  );
};

export default CellListItem;
