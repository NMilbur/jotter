interface ActionButtonProps {
  clickHandler: () => void;
  faIcon: string;
}

const ActionButton = ({ faIcon, clickHandler }: ActionButtonProps) => (
  <button className="button is-primary is-small" onClick={clickHandler}>
    <span className="icon">
      <i className={`fas ${faIcon}`}></i>
    </span>
  </button>
);

export default ActionButton;
