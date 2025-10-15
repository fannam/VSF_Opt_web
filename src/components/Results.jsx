import React from 'react';
import { TrendingUp } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MODELS, COLORS } from '../constants';
import { 
  bodyLineData, 
  changeOverData, 
  paintBarData, 
  paintColorData, 
  gaCapacityByModelData, 
  totalVehicleData,
  vehicleRatioData 
} from '../data/sampleData';
import { renderCustomLegend } from '../utils/helpers';
import CheckboxFilter from './CheckboxFilter';

const Results = ({ 
  optimizationPlans,
  selectedJobId,
  setSelectedJobId,
  resultTab,
  setResultTab,
  jobResultsData,
  bodyLineVisible,
  setBodyLineVisible,
  changeOverVisible,
  setChangeOverVisible,
  paintBarVisible,
  setPaintBarVisible,
  gaCapacityVisible,
  setGaCapacityVisible
}) => {
  const currentJobData = jobResultsData[selectedJobId] || Object.values(jobResultsData)[0];

  const combinedBodyLine = bodyLineData.map((orig, i) => {
    const opt = currentJobData.bodyLineData[i] || {};
    return {
      date: orig.date,
      VF3_orig: orig.VF3, VF3_opt: opt.VF3,
      'VF5/6/7_orig': orig['VF5/6/7'], 'VF5/6/7_opt': opt['VF5/6/7'],
      'VF8/9/e34_orig': orig['VF8/9/e34'], 'VF8/9/e34_opt': opt['VF8/9/e34'],
    };
  });

  const combinedChangeOver = changeOverData.map((orig, i) => {
    const opt = currentJobData.changeOverData[i] || {};
    return {
      date: orig.date,
      VF3_orig: orig.VF3, VF3_opt: opt.VF3,
      'VF5/6/7_orig': orig['VF5/6/7'], 'VF5/6/7_opt': opt['VF5/6/7'],
      'VF8/9/e34_orig': orig['VF8/9/e34'], 'VF8/9/e34_opt': opt['VF8/9/e34'],
    };
  });
  
  const combinedPaintBar = paintBarData.map((orig, i) => {
    const opt = currentJobData.paintBarData[i] || {};
    const combined = { date: orig.date };
    MODELS.forEach(model => {
      combined[`${model}_orig`] = orig[model];
      combined[`${model}_opt`] = opt[model];
    });
    return combined;
  });
  
  const combinedPaintColor = paintColorData.map((orig, i) => {
    const opt = currentJobData.paintColorData[i] || {};
    return { date: orig.date, original: orig.colors, optimized: opt.colors };
  });

  const combinedGaCapacity = gaCapacityByModelData.map((orig, i) => {
    const opt = currentJobData.gaCapacityData[i] || {};
    const combined = { date: orig.date };
    MODELS.forEach(model => {
      combined[`${model}_orig`] = orig[model];
      combined[`${model}_opt`] = opt[model];
    });
    return combined;
  });

  const combinedTotalVehicle = totalVehicleData.map((orig, i) => {
    const opt = currentJobData.totalVehicleData[i] || {};
    return { date: orig.date, original: orig.total, optimized: opt.total };
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Kết quả Tối ưu hóa</h1>
        <div className="w-72">
          <label htmlFor="job-select" className="block text-sm font-medium text-gray-700 mb-1">Chọn Job ID để xem kết quả</label>
          <select
            id="job-select"
            value={selectedJobId}
            onChange={(e) => setSelectedJobId(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            {optimizationPlans.filter(p => p.status === 'Đã Tối Ưu').map(plan => (
              <option key={plan.jobId} value={plan.jobId}>
                {plan.jobId} - {plan.planName}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex gap-2 border-b">
          {[
            {id: 'body', label: 'Body Visualization'},
            {id: 'paint', label: 'Paint Visualization'},
            {id: 'ga', label: 'GA Visualization'},
            {id: 'table', label: 'Bảng kết quả'},
            {id: 'summary', label: 'Summary KPIs'}
          ].map(tab => (
            <button key={tab.id} onClick={() => setResultTab(tab.id)}
              className={`px-6 py-3 font-medium transition ${resultTab === tab.id ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
      {resultTab === 'body' && (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Số lượng xe trên từng Line</h2>
            <CheckboxFilter visibleModels={bodyLineVisible} setVisibleModels={setBodyLineVisible} modelsToShow={['VF3', 'VF5/6/7', 'VF8/9/e34']}/>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={combinedBodyLine}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend content={renderCustomLegend} />
                {bodyLineVisible['VF3'] && <Line type="monotone" dataKey="VF3_orig" name="Kế hoạch gốc (VF3)" stroke="#8884d8" strokeDasharray="5 5" />}
                {bodyLineVisible['VF3'] && <Line type="monotone" dataKey="VF3_opt" name="Kế hoạch tối ưu (VF3)" stroke="#8884d8" strokeWidth={2} />}
                {bodyLineVisible['VF5/6/7'] && <Line type="monotone" dataKey="VF5/6/7_orig" name="Kế hoạch gốc (VF5/6/7)" stroke="#82ca9d" strokeDasharray="5 5" />}
                {bodyLineVisible['VF5/6/7'] && <Line type="monotone" dataKey="VF5/6/7_opt" name="Kế hoạch tối ưu (VF5/6/7)" stroke="#82ca9d" strokeWidth={2} />}
                {bodyLineVisible['VF8/9/e34'] && <Line type="monotone" dataKey="VF8/9/e34_orig" name="Kế hoạch gốc (VF8/9/e34)" stroke="#ffc658" strokeDasharray="5 5" />}
                {bodyLineVisible['VF8/9/e34'] && <Line type="monotone" dataKey="VF8/9/e34_opt" name="Kế hoạch tối ưu (VF8/9/e34)" stroke="#ffc658" strokeWidth={2} />}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Số lần Change Over của mỗi Line</h2>
            <CheckboxFilter visibleModels={changeOverVisible} setVisibleModels={setChangeOverVisible} modelsToShow={['VF3', 'VF5/6/7', 'VF8/9/e34']}/>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={combinedChangeOver}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend content={renderCustomLegend} />
                {changeOverVisible['VF3'] && <Bar dataKey="VF3_orig" name="Kế hoạch gốc (VF3)" fill="#8884d8" fillOpacity={0.6} />}
                {changeOverVisible['VF3'] && <Bar dataKey="VF3_opt" name="Kế hoạch tối ưu (VF3)" fill="#8884d8" />}
                {changeOverVisible['VF5/6/7'] && <Bar dataKey="VF5/6/7_orig" name="Kế hoạch gốc (VF5/6/7)" fill="#82ca9d" fillOpacity={0.6} />}
                {changeOverVisible['VF5/6/7'] && <Bar dataKey="VF5/6/7_opt" name="Kế hoạch tối ưu (VF5/6/7)" fill="#82ca9d" />}
                {changeOverVisible['VF8/9/e34'] && <Bar dataKey="VF8/9/e34_orig" name="Kế hoạch gốc (VF8/9/e34)" fill="#ffc658" fillOpacity={0.6} />}
                {changeOverVisible['VF8/9/e34'] && <Bar dataKey="VF8/9/e34_opt" name="Kế hoạch tối ưu (VF8/9/e34)" fill="#ffc658" />}
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Số lượng Paint Bar tối thiểu theo Model</h2>
            <CheckboxFilter visibleModels={paintBarVisible} setVisibleModels={setPaintBarVisible} />
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={combinedPaintBar}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend content={renderCustomLegend} />
                {MODELS.map((model, idx) => paintBarVisible[model] && (
                  <Line key={`${model}_orig`} type="monotone" dataKey={`${model}_orig`} name={`Kế hoạch gốc (${model})`} stroke={COLORS[idx]} strokeDasharray="5 5" />
                ))}
                {MODELS.map((model, idx) => paintBarVisible[model] && (
                  <Line key={model} type="monotone" dataKey={`${model}_opt`} name={`Kế hoạch tối ưu (${model})`} stroke={COLORS[idx]} strokeWidth={2} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {resultTab === 'paint' && (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Tổng số màu xe qua các ngày</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={combinedPaintColor}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend content={renderCustomLegend} />
                <Bar dataKey="original" name="Kế hoạch gốc" fill="#8884d8" fillOpacity={0.6} />
                <Bar dataKey="optimized" name="Kế hoạch tối ưu" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
      {resultTab === 'ga' && (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Công suất theo Model xe</h2>
            <CheckboxFilter visibleModels={gaCapacityVisible} setVisibleModels={setGaCapacityVisible} />
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={combinedGaCapacity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend content={renderCustomLegend} />
                {MODELS.map((model, idx) => gaCapacityVisible[model] && (
                  <Line key={`${model}_orig`} type="monotone" dataKey={`${model}_orig`} name={`Kế hoạch gốc (${model})`} stroke={COLORS[idx]} strokeDasharray="5 5" />
                ))}
                {MODELS.map((model, idx) => gaCapacityVisible[model] && (
                  <Line key={model} type="monotone" dataKey={`${model}_opt`} name={`Kế hoạch tối ưu (${model})`} stroke={COLORS[idx]} strokeWidth={2} />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Tổng số xe của tất cả Model</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={combinedTotalVehicle}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend content={renderCustomLegend}/>
                <Bar dataKey="original" name="Kế hoạch gốc" fill="#82ca9d" fillOpacity={0.6} />
                <Bar dataKey="optimized" name="Kế hoạch tối ưu" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Tỉ lệ xe to/xe nhỏ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-center font-semibold text-gray-700 mb-2">Kế hoạch gốc</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={vehicleRatioData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                      {vehicleRatioData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="text-center font-semibold text-gray-700 mb-2">Kế hoạch tối ưu</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie data={currentJobData.vehicleRatioData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                      {currentJobData.vehicleRatioData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
      {resultTab === 'table' && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Ngày sản xuất</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Item Code</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Model</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Màu</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">LHD/RHD</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">Số lượng</th>
                </tr>
              </thead>
              <tbody>
                {currentJobData.optimizedProductionData.map((row, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50 transition">
                    <td className="px-4 py-3 text-sm text-gray-700">{row.date}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.itemCode}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.model}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.color}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.type}</td>
                    <td className="px-4 py-3 text-sm text-gray-700">{row.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {resultTab === 'summary' && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Summary KPIs</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-lg">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 border-b">Kế hoạch</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 border-b">Tổng số lần Change Over</th>
                  <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700 border-b">Tổng số ngày sản xuất nhiều hơn 3 màu xe</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">KHSX gốc</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">{currentJobData.summaryKPIs.original.changeOver}</td>
                  <td className="px-6 py-4 text-center text-sm text-gray-700">{currentJobData.summaryKPIs.original.multiColorDays}</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium text-gray-700">KHSX sau khi tối ưu</td>
                  <td className="px-6 py-4 text-center text-sm text-green-600 font-semibold">{currentJobData.summaryKPIs.optimized.changeOver}</td>
                  <td className="px-6 py-4 text-center text-sm text-green-600 font-semibold">{currentJobData.summaryKPIs.optimized.multiColorDays}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <TrendingUp className="text-white" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-green-800 mb-1">Cải thiện đáng kể</h3>
                <p className="text-sm text-green-700">
                  Số lần Change Over giảm <strong>{currentJobData.summaryKPIs.improvement.changeOver}</strong> và số ngày sản xuất nhiều màu giảm <strong>{currentJobData.summaryKPIs.improvement.multiColorDays}</strong> so với kế hoạch gốc.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Results;
