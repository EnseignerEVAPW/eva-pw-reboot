import '../../../public/styles/BeCoach.css';

const CoachForm = ({show, onClose}) => {
  return (
    <div className={`modal ${show ? "show" : ""}`} onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Hola hola hola</h2>
        <button onClose={onClose}>bye</button>
      </div>
    </div>  
  );
};

export default CoachForm;