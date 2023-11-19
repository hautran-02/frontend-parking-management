import React, { useEffect, useMemo, useState } from 'react';
import { Image } from 'antd';
import CarImage from './CarImage';
import Car from '~/assets/images/blue-car.png';
import MapA from '~/assets/images/MapA.svg?react';
import MapB from '~/assets/images/mapB.svg?react';
import MapC from '~/assets/images/mapC.svg?react';
import { SLOTS_A } from '../data';

function MapContainer({ zone, width, height, ...props }) {
  const [vehs, setVehs] = useState([]);

  useEffect(() => {
    setVehs(SLOTS_A);
  }, [zone]);

  return (
    <>
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
    </>
  );
}

export default MapContainer;
