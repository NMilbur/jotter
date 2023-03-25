import { useDispatch } from "react-redux";
import "./index.css";
import { insertCellAfter } from "_state";
import AddButton from "_components/_atoms/Buttons/AddButton";

interface AddCellProps {
  forceVisible?: boolean;
  prevCellId: string | null;
}

const AddCell = ({ forceVisible = false, prevCellId }: AddCellProps) => {
  const dispatch = useDispatch();

  const clickHandler = (type: string) => dispatch(insertCellAfter({ id: prevCellId, type }));

  return (
    <div className={`add-cell ${forceVisible && "force-visible"}`}>
      <div className="add-buttons">
        <AddButton clickHandler={() => clickHandler("code")} label="Code" />
        <AddButton clickHandler={() => clickHandler("text")} label="Text" />
      </div>

      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
