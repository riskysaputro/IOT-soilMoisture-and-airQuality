import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ControlPanel = () => {
  const [status, setStatus] = useState({
    mode: 'auto',
    pump: false,
    fan: false,
  });

  const fetchStatus = async () => {
    const res = await axios.get('http://localhost:3000/api/control');
    setStatus(res.data);
  };
  // console.log('data control', status);

  const updateStatus = async (updatedFields) => {
    const newStatus = { ...status, ...updatedFields };
    setStatus(newStatus);
    await axios.post('http://localhost:3000/api/control', newStatus);
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="items-center justify-center">
      <h2>Kontrol Aktuator</h2>
      <div>
        <label>
          Mode:
          <select value={status.mode} onChange={(e) => updateStatus({ mode: e.target.value })}>
            <option value="auto">Otomatis</option>
            <option value="manual">Manual</option>
          </select>
        </label>
      </div>
      <div>
        <label>
          Pompa Air:
          <button onClick={() => updateStatus({ pump: !status.pump })} disabled={status.mode === 'auto'}>
            {status.pump ? 'Matikan' : 'Nyalakan'}
          </button>
        </label>
      </div>
      <div>
        <label>
          Penghisap Udara:
          <button onClick={() => updateStatus({ fan: !status.fan })} disabled={status.mode === 'auto'}>
            {status.fan ? 'Matikan' : 'Nyalakan'}
          </button>
        </label>
      </div>
    </div>
  );
};

export default ControlPanel;
