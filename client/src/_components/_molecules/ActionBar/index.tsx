import ActionButton from "_components/_atoms/Buttons/ActionButton";
import "./index.css";
import { CellDirections, deleteCell, moveCell } from "_state";
import { useDispatch } from "react-redux";

interface ActionBarProps {
  id: string;
}

const ActionBar = ({ id }: ActionBarProps) => {
  const dispatch = useDispatch();

  const moveClickHandler = (direction: CellDirections) => dispatch(moveCell({ id, direction }));
  const deleteClickHandler = () => dispatch(deleteCell(id));

  return (
    <div className="action-bar">
      <ActionButton clickHandler={() => moveClickHandler("up")} faIcon="fa-arrow-up" />
      <ActionButton clickHandler={() => moveClickHandler("down")} faIcon="fa-arrow-down" />
      <ActionButton clickHandler={() => deleteClickHandler()} faIcon="fa-times" />
    </div>
  );
};

export default ActionBar;
