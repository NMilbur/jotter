interface AddButtonProps {
  clickHandler: () => void;
  label: string;
}

const AddButton = ({ clickHandler, label = "Add" }: AddButtonProps) => (
  <button className="button is-rounded is-primary is-small" onClick={clickHandler}>
    <span className="icon is-small">
      <i className="fas fa-plus" />
    </span>
    <span>{label}</span>
  </button>
);

export default AddButton;
