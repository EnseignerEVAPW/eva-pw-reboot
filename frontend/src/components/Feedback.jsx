import React from 'react';

const Feedback = () => {

  return (
    <>
      <div className="p-4 max-w-2xl">
        <form className="flex flex-col gap-4">
          <div className="p-4 border-1 border-gray-500 rounded-lg shadow-md">
            <p className="font-bold mb-8">¿Pudiste resolver el ejercicio?</p>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input type="radio" name="resolve" value="yes" />
                <span className="ml-1.2">Sí, lo resolví</span>
              </label>
              <label className="flex items-center">
                <input type="radio" name="resolve" value="no" />
                <span className="ml-1.2">No, soy la decepción de mi familia</span>
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
    </>
  );
}

export default Feedback;