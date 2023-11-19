import React, { useEffect, useMemo, useState } from 'react';
import { Image } from 'antd';
import CarImage from './CarImage';
import Car from '~/assets/images/blue-car.png';
import MapA from '~/assets/images/MapA.svg?react';
import MapB from '~/assets/images/mapB.svg?react';
import MapC from '~/assets/images/mapC.svg?react';
import { SLOTS_A } from '../parkingA';
import { SLOTS_B } from '../parkingB';

function MapContainer({ zone, width, height, ...props }) {
  const [vehs, setVehs] = useState([]);

  useEffect(() => {
    let newVehs;
    switch (zone) {
      case 'A':
        newVehs = SLOTS_A;
        break;
      case 'B':
        newVehs = SLOTS_B;
        break;
      case 'C':
        newVehs = SLOTS_A;
        break;
    }
    setVehs(newVehs);
  }, [zone]);

  return (
    <>
      <div>
        {vehs.map((veh) => (
          <CarImage {...veh} src={Car} />
        ))}
        {useMemo(() => {
          let rs;
          switch (zone) {
            case 'A':
              rs = <MapA />;
              break;
            case 'B':
              rs = <MapB />;
              break;
            case 'C':
              rs = <MapC />;
              break;
          }
          return rs;
        }, [zone])}
      </div>
    </>
  );
}

export default MapContainer;
