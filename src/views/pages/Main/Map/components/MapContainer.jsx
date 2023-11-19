import React, { useEffect, useMemo, useState } from 'react';
import { Image } from 'antd';
import CarImage from './CarImage';
import Car from '~/assets/images/blue-car.png';
import MapA from '~/assets/images/MapA.svg?react';
import MapB from '~/assets/images/mapB.svg?react';
import MapC from '~/assets/images/mapC.svg?react';
import { SLOTS_A } from '../parkingA';
import { SLOTS_B } from '../parkingB';
import { SLOTS_C } from '../parkingC';

function MapContainer({ zone, width, height, ...props }) {
  const [vehs, setVehs] = useState([]);
  const [vehWidth, setVehWidth] = useState();

  useEffect(() => {
    let newVehs;
    let newWidth = 50;
    switch (zone) {
      case 'A':
        newVehs = SLOTS_A;
        newWidth = 52;
        break;
      case 'B':
        newVehs = SLOTS_B;
        newWidth = 76;
        break;
      case 'C':
        newVehs = SLOTS_C;
        newWidth = 68;
        break;
    }
    setVehs(newVehs);
    setVehWidth(newWidth);
  }, [zone]);

  return (
    <>
      <div>
        {vehs.map((veh) => (
          <CarImage {...veh} src={Car} width={vehWidth} />
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
