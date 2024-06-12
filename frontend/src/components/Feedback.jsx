import React, { useState } from 'react';

const Feedback = ({ isOpen, onSubmit, onClose, timeDuration }) => {
  const [formValues, setFormValues] = useState({
    success: '',
    time: timeDuration,
    satisfaire: 0,
    comments: ''
  })

  if (!isOpen) {
    return null;
  }

  const handleValues = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues);
    onClose();
  }

  const getEmoji = (value) => {
    if (value <= 2) return '😞';
    if (value <= 4) return '😐';
    if (value <= 7) return '😊';
    else return '😃';
  }

  return (
    <div className='dialog-overlay backdrop:bg-gray-50' >
      <div className="dialog p-4 max-w-2xl">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <div className="p-4 border-1 border-gray-500 rounded-lg shadow-md">
            <p className="font-bold mb-8">¿Pudiste resolver el ejercicio?</p>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="success"
                  value="si"
                  checked={formValues.success === 'si'}
                  onChange={handleValues} />
                <span className="ml-1.2">Sí, lo resolvimos</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="success"
                  value="no"
                  checked={formValues.success === "no"}
                  onChange={handleValues} />
                <span className="ml-1.2">No, no pudimos</span>
              </label>
            </div>
          </div>

          <div className="p-4 border-1 border-gray-500 rounded-lg shadow-md time-spent">
            <p>Tiempo empleado: {timeDuration}</p>
          </div>

          <div className="p-4 border-1 border-gray-500 rounded-lg shadow-md slider-container">
            <label for="satisfaire" className="flex items-center">
              Califica tu satisfacción con el ejercicio (0-10)
            </label>
            <input
              type="range"
              className='mr-4 grow'
              name="satisfaire"
              min="0"
              max="10"
              value={formValues.satisfaire}
              onChange={handleValues}
            />
            <span className="text-5xl">{getEmoji(formValues.satisfaire)}</span>
            <span>{formValues.satisfaire}</span>
          </div>

          <div className="p-4 border-1 border-gray-500 rounded-lg shadow-md">
            <label for="comments" className="font-bold mb-8">Añade cualquier comentario adicional aquí:</label>
            <textarea
              id="comments"
              className="border-1 border-gray-500 rounded-lg p-2 bg-transparent h-24 w-full resize-none"
              name='comments'
              rows="4"
              value={formValues.comments}
              onChange={handleValues}
            ></textarea>
          </div>
          <div className='flex gap-4 w-full justify-center'>
            <button type="submit" className="p-4 border-0 rounded-lg text-white bg-sky-700 cursor-pointer transition ease-in-out delay-150 hover:bg-blue-500 ">Enviar Feedback</button>
            <button onClick={onClose} className='p-4 border-0 rounded-lg text-white bg-sky-400 cursor-pointer transition ease-in-out delay-150 hover:bg-blue-300'>Cancelar</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default Feedback;