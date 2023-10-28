export default {
  defaultConfig: {
    columnStyle: {
      radius: [4, 4, 0, 0]
    },
    columnWidthRatio: 0.72,
    maxColumnWidth: 16,
    xAxis: {
      label: {
        autoRotate: true,
        autoEllipsis: false
      },
      grid: {
        alignTick: false,
        closed: true,
        line: {
          style: {
            lineWidth: 1,
            cursor: 'pointer',
            opacity: 0.2
          }
        }
      }
    },
    yAxis: {
      min: 0,
      grid: {
        closed: true,
        line: {
          style: {
            lineWidth: 1,
            cursor: 'pointer',
            opacity: 0.6
          }
        }
      }
    }
  },

  getMax: (data=[]) => {
    const rs = 1.1 * Math.max(data || [0]);
    return rs;
  }
};
