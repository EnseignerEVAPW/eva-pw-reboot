import React from 'react';
import ActiveUser from "../components/ActiveUser";
import GeneradorCodigo from "../components/GeneradorCodigo";
import LogSection from "../components/LogSection";
import '../../public/styles/Board.css';

const ModoICPC = () => {
  return (
      <div className="container-fluid">
        <div className="flex flex-row flex-items-center">
          <div className="w-1/2">
            <ActiveUser />
          </div>
          <div className="w-1/2">
            <GeneradorCodigo />
            <LogSection />
          </div>
        </div>
      </div>
  );
};

export default ModoICPC;
