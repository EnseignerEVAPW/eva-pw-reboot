import React, {useState} from 'react';

const Feedback = ({isOpen, onClose}) => {
  const [success, setSuccess] = useState(true);
  const [time, setTime] =useState('');
  const [satisfaire, setSatisfaire] = useState(0);
  const [comments, setComments] = useState('');

  if(!isOpen){
    return null;
  }

  const handleValues =() => {
    console.log('tratando valores');
  }
  return (
    <div className='backdrop:bg-gray-50 dialog-overlay' >
      <div className="dialog p-4 max-w-2xl">
        <form className="flex flex-col gap-4" onSubmit={handleValues}>
          <div className="p-4 border-1 border-gray-500 rounded-lg shadow-md">
            <p className="font-bold mb-8">¿Pudiste resolver el ejercicio?</p>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input type="radio" name="resolve" value="yes" />
                <span className="ml-1.2">Sí, lo resolvimos</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="resolve" value="no" />
                <span className="ml-1.2">No, no pudimos</span>
              </label>
            </div>
          </div>

          <div className="p-4 border-1 border-gray-500 rounded-lg shadow-md time-spent">
            <p>Tiempo empleado: XX:XX minutos.</p>
          </div>

          <div className="p-4 border-1 border-gray-500 rounded-lg shadow-md slider-container">
            <label for="satisfaction" className="flex items-center">
              Califica tu satisfacción con el ejercicio (0-10)
            </label>
            <input
              type="range"
              className='mr-4 grow'
              name="satisfaction"
              min="0"
              max="10"
              oninput="updateFace(this.value)"
            />
            <span className="text-5xl">😐</span>
          </div>

          <div className="p-4 border-1 border-gray-500 rounded-lg shadow-md">
            <label for="comments" className="font-bold mb-8">Añade cualquier comentario adicional aquí:</label>
            <textarea id="comments" className="border-1 border-gray-500 rounded-lg p-2 bg-transparent h-24 w-full resize-none" rows="4"></textarea>
          </div>
          <button type="submit" className="p-4 border-0 rounded-lg text-white bg-sky-700 cursor-pointer transition ease-in-out delay-150 hover:bg-blue-500 ">Enviar Feedback</button>
        </form>
      </div>
    </div>
  );
}

export default Feedback;