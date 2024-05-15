import { useState } from 'react';

function InviteSearch() {
  const [name, setName] = useState('');
  const [search, setSearch] = useState('');

  return (
    <div className="bg-[#0e1420] px-10 py-5">
      <div>
        <div className="text-2xl text-indigo-200 font-bold text-center mb-5">Agregar team</div>
        <div>
          <form action="">
            <div className="container flex flex-col px-10 my-5">
              <label htmlFor="name" className="text-indigo-300 mb-2 font-medium"><b>Nombre team</b></label>
              <input className="mb-5 rounded px-3" type="text" placeholder="Ingresa el nombre de tu equipo" name="name" required onChange={(e) => setName(e.target.value)} />
              <div className="w-min h-min bg-indigo-500 px-5 text-indigo-50 rounded-lg">
                <button type="submit" onClick={() => { }}>Registrar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <hr className="my-5" />
      <div>
        <div className="text-2xl text-blue-300 font-bold text-center mb-5">Invitar al team</div>
        <div>
          <form action="">
            <div className="container flex flex-col px-10 my-5">
              <label htmlFor="student" className="text-blue-300 mb-2 font-medium"><b>Nombre usuario</b></label>
              <input className="mb-5 rounded px-3" type="text" placeholder="Ingresa el nombre de usuario" name="student" required onChange={(e) => setSearch(e.target.value)} />
              <div className="w-min h-min bg-blue-500 px-5 text-blue-50 rounded-lg">
                <button type="submit" onClick={() => { }}>Invitar</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default InviteSearch;