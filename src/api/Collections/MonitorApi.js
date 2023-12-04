import { GET } from '../axiosMethods';

const DOMAIN = import.meta.env.VITE_DOMAIN;

export default {
  getStatusByZone: (zone) => {
    const url = `${DOMAIN}/parking/getStatusByZone`;
    return GET({
      url,
      payload: {
        zone
      }
    });
  },

  getVehicleInOutNumber: (payload) => {
    const url = `${DOMAIN}/parkingTurn/Reports/GetVehicleInOutNumber`;
    return GET({
      url,
      payload
    });
  },

  getRevenue: (payload) => {
    const url = `${DOMAIN}/parkingTurn/Reports/GetRevenue`;
    return GET({
      url,
      payload
    });
  },

  getAllDriver: () => {
    const url = `${DOMAIN}/user/driver`;
    return GET({
      url
    });
  }
};
