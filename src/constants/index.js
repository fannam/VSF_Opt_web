export const MODELS = ['VF3', 'VF5', 'VF6', 'VF7', 'VF8', 'VF9', 'VFe34'];
export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658'];

export const initialGaConfig = {
  shifts: 2,
  hoursPerShift: 8,
  overallJPH: 50,
  modelJPH: MODELS.reduce((acc, model) => ({ ...acc, [model]: 45 }), {})
};

export const initialBodyConfig = {
  changeOverTime: 2,
  finishingLineCapacity: 60,
  models: MODELS.reduce((acc, model) => ({
    ...acc,
    [model]: { jph: 40, paintBars: 8, routingTime: 1.5 }
  }), {})
};

export const initialCalendarDays = Array.from({ length: 31 }, (_, i) => ({ day: i + 1, isActive: true }));
