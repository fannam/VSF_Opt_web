import React from 'react';
import { Plus, Trash2, Search, ChevronsUpDown, Settings } from 'lucide-react';
import { MODELS } from '../constants';

const Config = ({ 
  configurations, 
  selectedConfig, 
  setSelectedConfig,
  setConfigurations,
  selectedWorkshop,
  setSelectedWorkshop,
  handleCreateConfig,
  handleDeleteConfig,
  updateConfigState,
  configFilters,
  setConfigFilters,
  configSortOrder,
  setConfigSortOrder
}) => {
  return (
    <div className="flex h-full bg-gray-100">
      <div className="w-[400px] border-r bg-white flex flex-col shadow-sm">
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h2 className="text-lg font-bold text-gray-800">Danh sách Cấu hình</h2>
          <button onClick={handleCreateConfig} className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 text-sm shadow-sm hover:shadow-md">
            <Plus size={16} /> Tạo mới
          </button>
        </div>
        <div className="p-3 border-b bg-gray-50">
          <div className="relative mb-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Lọc theo tên cấu hình..."
              value={configFilters.name}
              onChange={(e) => setConfigFilters({...configFilters, name: e.target.value})}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text"
              placeholder="Lọc theo người tạo..."
              value={configFilters.createdBy}
              onChange={(e) => setConfigFilters({...configFilters, createdBy: e.target.value})}
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mt-2 text-right">
            <button onClick={() => setConfigSortOrder(configSortOrder === 'asc' ? 'desc' : 'asc')} className="text-xs text-blue-600 hover:underline font-medium flex items-center justify-end">
              Sắp xếp theo ngày tạo 
              <ChevronsUpDown size={14} className="ml-1" />
              ({configSortOrder === 'asc' ? 'Cũ nhất' : 'Mới nhất'})
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {configurations
            .filter(config => 
              config.name.toLowerCase().includes(configFilters.name.toLowerCase()) &&
              config.createdBy.toLowerCase().includes(configFilters.createdBy.toLowerCase())
            )
            .sort((a, b) => {
              const dateA = new Date(a.createdAt);
              const dateB = new Date(b.createdAt);
              return configSortOrder === 'asc' ? dateA - dateB : dateB - dateA;
            })
            .map(config => (
              <div 
                key={config.id} 
                onClick={() => setSelectedConfig(config)}
                className={`p-4 cursor-pointer border-l-4 group transition-colors duration-200 ${selectedConfig?.id === config.id ? 'bg-blue-50 border-blue-600' : 'border-transparent hover:bg-gray-100'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className={`font-semibold ${selectedConfig?.id === config.id ? 'text-blue-700' : 'text-gray-800'}`}>{config.name}</p>
                    <p className="text-xs text-gray-500 mt-1">Tạo bởi: {config.createdBy}</p>
                    <p className="text-xs text-gray-500">Ngày tạo: {config.createdAt}</p>
                  </div>
                  <button onClick={(e) => { e.stopPropagation(); handleDeleteConfig(config.id); }} className="text-gray-400 hover:text-red-600 p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 size={16}/>
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="w-2/3 p-6 overflow-y-auto">
        {selectedConfig ? (
          <>
            <div className="flex justify-between items-center mb-6 pb-4 border-b">
              <input 
                type="text" 
                value={selectedConfig.name}
                onChange={(e) => {
                  const newName = e.target.value;
                  setConfigurations(prev => prev.map(c => c.id === selectedConfig.id ? {...c, name: newName} : c));
                  setSelectedConfig(prev => ({...prev, name: newName}));
                }}
                className="text-3xl font-bold text-gray-800 border-b-2 border-transparent focus:border-blue-600 outline-none bg-transparent"
              />
              <button className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2 shadow-sm hover:shadow-lg transform hover:-translate-y-0.5">
                Lưu thay đổi
              </button>
            </div>
            <div className="mb-6">
              <div className="flex gap-2 border-b">
                {['GA', 'Body', 'Paint', 'Calendar'].map(ws => (
                  <button key={ws} onClick={() => setSelectedWorkshop(ws)}
                    className={`px-6 py-3 font-medium transition ${selectedWorkshop === ws ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600 hover:text-gray-800'}`}>
                    {ws === 'Calendar' ? 'Ngày sản xuất' : `Xưởng ${ws}`}
                  </button>
                ))}
              </div>
            </div>
            
            {selectedWorkshop === 'GA' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Số ca làm việc/ngày</label>
                    <input type="number" value={selectedConfig.gaConfig.shifts}
                      onChange={(e) => {
                        const newGaConfig = {...selectedConfig.gaConfig, shifts: +e.target.value};
                        updateConfigState('gaConfig', newGaConfig);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Số giờ/ca</label>
                    <input type="number" value={selectedConfig.gaConfig.hoursPerShift}
                      onChange={(e) => {
                        const newGaConfig = {...selectedConfig.gaConfig, hoursPerShift: +e.target.value};
                        updateConfigState('gaConfig', newGaConfig);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Công suất chung (JPH)</label>
                    <input type="number" value={selectedConfig.gaConfig.overallJPH}
                      onChange={(e) => {
                        const newGaConfig = {...selectedConfig.gaConfig, overallJPH: +e.target.value};
                        updateConfigState('gaConfig', newGaConfig);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Công suất riêng theo Model (JPH)</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border rounded-lg">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Model</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">JPH</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MODELS.map(model => (
                        <tr key={model} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium">{model}</td>
                          <td className="px-4 py-3">
                            <input type="number" value={selectedConfig.gaConfig.modelJPH[model]}
                              onChange={(e) => {
                                const newModelJPH = {...selectedConfig.gaConfig.modelJPH, [model]: +e.target.value};
                                const newGaConfig = {...selectedConfig.gaConfig, modelJPH: newModelJPH};
                                updateConfigState('gaConfig', newGaConfig);
                              }}
                              className="w-32 px-3 py-2 border border-gray-300 rounded-lg"/>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {selectedWorkshop === 'Body' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Change over time (giờ)</label>
                    <input type="number" value={selectedConfig.bodyConfig.changeOverTime}
                      onChange={(e) => {
                        const newBodyConfig = {...selectedConfig.bodyConfig, changeOverTime: +e.target.value};
                        updateConfigState('bodyConfig', newBodyConfig);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Công suất Finishing Line (giờ)</label>
                    <input type="number" value={selectedConfig.bodyConfig.finishingLineCapacity}
                      onChange={(e) => {
                        const newBodyConfig = {...selectedConfig.bodyConfig, finishingLineCapacity: +e.target.value};
                        updateConfigState('bodyConfig', newBodyConfig);
                      }}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800">Cấu hình theo Model</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border rounded-lg">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Model</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Công suất (JPH)</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Số lượng Paint Bar</th>
                        <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Routing Time (giờ)</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MODELS.map(model => (
                        <tr key={model} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm font-medium">{model}</td>
                          <td className="px-4 py-3"><input type="number" value={selectedConfig.bodyConfig.models[model].jph} 
                            onChange={e => {
                              const newModels = {...selectedConfig.bodyConfig.models, [model]: {...selectedConfig.bodyConfig.models[model], jph: +e.target.value}};
                              updateConfigState('bodyConfig', {...selectedConfig.bodyConfig, models: newModels});
                            }}
                            className="w-28 px-3 py-2 border rounded-lg"/></td>
                          <td className="px-4 py-3"><input type="number" value={selectedConfig.bodyConfig.models[model].paintBars}
                            onChange={e => {
                              const newModels = {...selectedConfig.bodyConfig.models, [model]: {...selectedConfig.bodyConfig.models[model], paintBars: +e.target.value}};
                              updateConfigState('bodyConfig', {...selectedConfig.bodyConfig, models: newModels});
                            }}
                            className="w-28 px-3 py-2 border rounded-lg"/></td>
                          <td className="px-4 py-3"><input type="number" step="0.1" value={selectedConfig.bodyConfig.models[model].routingTime} 
                            onChange={e => {
                              const newModels = {...selectedConfig.bodyConfig.models, [model]: {...selectedConfig.bodyConfig.models[model], routingTime: +e.target.value}};
                              updateConfigState('bodyConfig', {...selectedConfig.bodyConfig, models: newModels});
                            }}
                            className="w-28 px-3 py-2 border rounded-lg"/></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {selectedWorkshop === 'Paint' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <p className="text-gray-600">Cấu hình Paint đang được phát triển...</p>
              </div>
            )}
            {selectedWorkshop === 'Calendar' && (
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="mb-4 text-sm text-gray-600">
                  <p>Nhấn vào từng ô ngày để chuyển đổi trạng thái Hoạt động/Nghỉ</p>
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {selectedConfig.calendarDays.map((day, idx) => (
                    <div key={idx} onClick={() => {
                      const newCalendar = selectedConfig.calendarDays.map((d, i) => i === idx ? {...d, isActive: !d.isActive} : d);
                      updateConfigState('calendarDays', newCalendar);
                    }}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition text-center ${day.isActive ? 'border-green-300 bg-green-50 hover:bg-green-100' : 'border-red-300 bg-red-50 hover:bg-red-100'}`}>
                      <div className="text-sm font-medium text-gray-700">{day.day}</div>
                      <div className={`text-xs mt-1 font-semibold ${day.isActive ? 'text-green-600' : 'text-red-600'}`}>
                        {day.isActive ? 'Hoạt động' : 'Nghỉ'}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full bg-white rounded-lg shadow-md">
            <div className="text-center">
              <Settings size={48} className="mx-auto text-gray-300" />
              <p className="mt-4 text-gray-500">Chọn hoặc tạo một cấu hình để xem chi tiết.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Config;
