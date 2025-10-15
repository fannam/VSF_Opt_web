const bodyLineData = [
  { date: '01/01', VF3: 45, 'VF5/6/7': 38, 'VF8/9/e34': 42 },
  { date: '02/01', VF3: 52, 'VF5/6/7': 45, 'VF8/9/e34': 48 },
  { date: '03/01', VF3: 48, 'VF5/6/7': 42, 'VF8/9/e34': 45 },
  { date: '04/01', VF3: 55, 'VF5/6/7': 48, 'VF8/9/e34': 50 },
  { date: '05/01', VF3: 50, 'VF5/6/7': 44, 'VF8/9/e34': 47 },
];

const optimizedBodyLineData = bodyLineData.map(d => ({ ...d, VF3: d.VF3 - 3, 'VF5/6/7': d['VF5/6/7'] - 2, 'VF8/9/e34': d['VF8/9/e34'] - 2 }));

const changeOverData = [
  { date: '01/01', VF3: 3, 'VF5/6/7': 4, 'VF8/9/e34': 3 },
  { date: '02/01', VF3: 2, 'VF5/6/7': 3, 'VF8/9/e34': 4 },
  { date: '03/01', VF3: 4, 'VF5/6/7': 3, 'VF8/9/e34': 3 },
  { date: '04/01', VF3: 3, 'VF5/6/7': 4, 'VF8/9/e34': 2 },
  { date: '05/01', VF3: 2, 'VF5/6/7': 3, 'VF8/9/e34': 3 },
];

const optimizedChangeOverData = changeOverData.map(d => ({ ...d, VF3: d.VF3 - 1, 'VF5/6/7': d['VF5/6/7'] - 1, 'VF8/9/e34': d['VF8/9/e34'] - 1 }));

const paintBarData = [
  { date: '01/01', VF3: 8, VF5: 7, VF6: 6, VF7: 7, VF8: 9, VF9: 8, VFe34: 7 },
  { date: '02/01', VF3: 9, VF5: 8, VF6: 7, VF7: 8, VF8: 10, VF9: 9, VFe34: 8 },
  { date: '03/01', VF3: 7, VF5: 6, VF6: 6, VF7: 7, VF8: 8, VF9: 7, VFe34: 6 },
  { date: '04/01', VF3: 10, VF5: 9, VF6: 8, VF7: 9, VF8: 11, VF9: 10, VFe34: 9 },
  { date: '05/01', VF3: 8, VF5: 7, VF6: 7, VF7: 8, VF8: 9, VF9: 8, VFe34: 7 },
];

const optimizedPaintBarData = paintBarData.map(d => Object.keys(d).reduce((acc, key) => ({...acc, [key]: key === 'date' ? d[key] : d[key] - 1}), {}));

const paintColorData = [
  { date: '01/01', colors: 12 },
  { date: '02/01', colors: 15 },
  { date: '03/01', colors: 11 },
  { date: '04/01', colors: 16 },
  { date: '05/01', colors: 13 },
];

const optimizedPaintColorData = paintColorData.map(d => ({...d, colors: d.colors - 2}));

const gaCapacityByModelData = [
  { date: '01/01', VF3: 45, VF5: 24, VF6: 22, VF7: 26, VF8: 32, VF9: 28, VFe34: 25 },
  { date: '02/01', VF3: 52, VF5: 26, VF6: 25, VF7: 27, VF8: 35, VF9: 30, VFe34: 25 },
  { date: '03/01', VF3: 48, VF5: 25, VF6: 24, VF7: 26, VF8: 33, VF9: 29, VFe34: 26 },
  { date: '04/01', VF3: 55, VF5: 27, VF6: 26, VF7: 27, VF8: 36, VF9: 30, VFe34: 26 },
  { date: '05/01', VF3: 50, VF5: 25, VF6: 25, VF7: 26, VF8: 34, VF9: 29, VFe34: 26 },
];

const optimizedGaCapacityData = gaCapacityByModelData.map(d => Object.keys(d).reduce((acc, key) => ({...acc, [key]: key === 'date' ? d[key] : d[key] + 3}), {}));

const totalVehicleData = [
  { date: '01/01', total: 202 },
  { date: '02/01', total: 220 },
  { date: '03/01', total: 211 },
  { date: '04/01', total: 227 },
  { date: '05/01', total: 215 },
];

const optimizedTotalVehicleData = totalVehicleData.map(d => ({...d, total: d.total + 15}));

const vehicleRatioData = [
  { name: 'Xe lớn (VF8/9/e34)', value: 45 },
  { name: 'Xe nhỏ (VF3/5/6/7)', value: 55 },
];

const optimizedVehicleRatioData = [
  { name: 'Xe lớn (VF8/9/e34)', value: 48 },
  { name: 'Xe nhỏ (VF3/5/6/7)', value: 52 },
];

export const sampleProductionData = [
  { id: 1, date: '01/01/2025', itemCode: 'VF3-001', model: 'VF3', color: 'Trắng', type: 'LHD', quantity: 15 },
  { id: 2, date: '01/01/2025', itemCode: 'VF5-002', model: 'VF5', color: 'Đen', type: 'RHD', quantity: 12 },
  { id: 3, date: '02/01/2025', itemCode: 'VF8-003', model: 'VF8', color: 'Xanh', type: 'LHD', quantity: 18 },
  { id: 4, date: '02/01/2025', itemCode: 'VF9-004', model: 'VF9', color: 'Đỏ', type: 'RHD', quantity: 20 },
  { id: 5, date: '03/01/2025', itemCode: 'VF6-005', model: 'VF6', color: 'Xám', type: 'LHD', quantity: 14 },
];

export const sampleOptimizedProductionData = [
  { id: 1, date: '01/01/2025', itemCode: 'VF3-001', model: 'VF3', color: 'Trắng', type: 'LHD', quantity: 20 },
  { id: 2, date: '01/01/2025', itemCode: 'VF5-002', model: 'VF5', color: 'Trắng', type: 'RHD', quantity: 15 },
  { id: 3, date: '02/01/2025', itemCode: 'VF8-003', model: 'VF8', color: 'Xanh', type: 'LHD', quantity: 25 },
  { id: 4, date: '02/01/2025', itemCode: 'VF6-005', model: 'VF6', color: 'Xanh', type: 'LHD', quantity: 10 },
  { id: 5, date: '03/01/2025', itemCode: 'VF9-004', model: 'VF9', color: 'Đỏ', type: 'RHD', quantity: 22 },
];

// Data for different jobs
export const jobResultsData = {
  '20251014_1': {
    bodyLineData: optimizedBodyLineData,
    changeOverData: optimizedChangeOverData,
    paintBarData: optimizedPaintBarData,
    paintColorData: optimizedPaintColorData,
    gaCapacityData: optimizedGaCapacityData,
    totalVehicleData: optimizedTotalVehicleData,
    vehicleRatioData: optimizedVehicleRatioData,
    optimizedProductionData: sampleOptimizedProductionData,
    summaryKPIs: {
      original: { changeOver: 28, multiColorDays: 12 },
      optimized: { changeOver: 18, multiColorDays: 6 },
      improvement: { changeOver: '35.7%', multiColorDays: '50%' }
    }
  },
  '20251013_1': {
    bodyLineData: bodyLineData.map(d => ({ ...d, VF3: d.VF3 - 5, 'VF5/6/7': d['VF5/6/7'] - 3, 'VF8/9/e34': d['VF8/9/e34'] - 4 })),
    changeOverData: changeOverData.map(d => ({ ...d, VF3: d.VF3 - 2, 'VF5/6/7': d['VF5/6/7'] - 1, 'VF8/9/e34': d['VF8/9/e34'] - 2 })),
    paintBarData: paintBarData.map(d => Object.keys(d).reduce((acc, key) => ({...acc, [key]: key === 'date' ? d[key] : d[key] - 2}), {})),
    paintColorData: paintColorData.map(d => ({...d, colors: d.colors - 3})),
    gaCapacityData: gaCapacityByModelData.map(d => Object.keys(d).reduce((acc, key) => ({...acc, [key]: key === 'date' ? d[key] : d[key] + 1}), {})),
    totalVehicleData: totalVehicleData.map(d => ({...d, total: d.total + 10})),
    vehicleRatioData: [
      { name: 'Xe lớn (VF8/9/e34)', value: 40 },
      { name: 'Xe nhỏ (VF3/5/6/7)', value: 60 },
    ],
    optimizedProductionData: sampleOptimizedProductionData.map(d => ({...d, quantity: d.quantity + 5 })).slice(0, 4),
    summaryKPIs: {
      original: { changeOver: 28, multiColorDays: 12 },
      optimized: { changeOver: 15, multiColorDays: 5 },
      improvement: { changeOver: '46.4%', multiColorDays: '58.3%' }
    }
  }
};

export {
  bodyLineData,
  optimizedBodyLineData,
  changeOverData,
  optimizedChangeOverData,
  paintBarData,
  optimizedPaintBarData,
  paintColorData,
  optimizedPaintColorData,
  gaCapacityByModelData,
  optimizedGaCapacityData,
  totalVehicleData,
  optimizedTotalVehicleData,
  vehicleRatioData,
  optimizedVehicleRatioData
};
