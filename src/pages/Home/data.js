export const DefaultPosition = [
  {
    order: 1,
    col: 1,
    colSpan: 4,
    rowSpan: 14,
  },
  {
    order: 2,
    col: 5,
    colSpan: 4,
    rowSpan: 14,
  },
  {
    order: 3,
    col: 9,
    colSpan: 4,
    rowSpan: 14,
  },
  {
    order: 4,
    col: 1,
    colSpan: 12,
    rowSpan: 14,
  },
];

export const DefaultNumberStatisChart = () => {
  let rs = [];
  const zones = ["A", "B", "C"];

  for(let i = 0; i < 7; i++) {
    zones.map(zone => {
      rs.push({
        zone,
        value: Math.random() * 100,
        date: `0${i}/12/2023`,
      })
    })
  }

  return rs;
}
