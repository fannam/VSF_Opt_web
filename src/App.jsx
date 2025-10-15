import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Input from './components/Input';
import Config from './components/Config';
import Optimize from './components/Optimize';
import Results from './components/Results';
import Account from './components/Account';
import UploadModal from './components/UploadModal';
import CreateJobModal from './components/CreateJobModal';
import { MODELS, initialGaConfig, initialBodyConfig, initialCalendarDays } from './constants';
import { sampleProductionData, jobResultsData } from './data/sampleData';

const App = () => {
  // Global State
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  
  // Input (KHSX) Page State
  const [productionPlans, setProductionPlans] = useState([
    { id: 1, name: 'KHSX Tháng 4/2025', createdBy: 'Nguyễn Văn A', createdAt: '2025-03-15', data: [...sampleProductionData] },
    { id: 2, name: 'KHSX Tháng 5/2025', createdBy: 'Trần Thị B', createdAt: '2025-03-20', data: [...sampleProductionData.slice(2, 4)] },
    { id: 3, name: 'KHSX Tháng 6/2025', createdBy: 'Lê Văn C', createdAt: '2025-03-25', data: [...sampleProductionData.slice(0, 3)] },
  ]);
  const [selectedPlan, setSelectedPlan] = useState(productionPlans[0]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [newPlanName, setNewPlanName] = useState('');
  const [planFilters, setPlanFilters] = useState({ name: '', createdBy: '' });
  const [planSortOrder, setPlanSortOrder] = useState('desc');

  // Config Page State
  const [configurations, setConfigurations] = useState([
    { id: 1, name: 'Cấu hình GA-01', createdBy: 'Nguyễn Văn A', createdAt: '2025-03-10', gaConfig: {...initialGaConfig}, bodyConfig: {...initialBodyConfig}, calendarDays: [...initialCalendarDays] },
    { id: 2, name: 'Cấu hình Body-02', createdBy: 'Trần Thị B', createdAt: '2025-03-12', gaConfig: {...initialGaConfig}, bodyConfig: {...initialBodyConfig}, calendarDays: [...initialCalendarDays] },
    { id: 3, name: 'Cấu hình Paint-01', createdBy: 'Lê Văn C', createdAt: '2025-03-14', gaConfig: {...initialGaConfig}, bodyConfig: {...initialBodyConfig}, calendarDays: [...initialCalendarDays] },
  ]);
  const [selectedConfig, setSelectedConfig] = useState(configurations[0]);
  const [selectedWorkshop, setSelectedWorkshop] = useState('GA');
  const [configFilters, setConfigFilters] = useState({ name: '', createdBy: '' });
  const [configSortOrder, setConfigSortOrder] = useState('desc');

  // Optimize Page State
  const [optimizationPlans, setOptimizationPlans] = useState([
    { id: 1, jobId: '20251014_1', planName: 'KHSX Tháng 1/2025', configName: 'Cấu hình GA-01', createdAt: '2025-01-01T10:30:00', createdBy: 'Nguyễn Văn A', completedAt: '2025-01-01T11:45:00', status: 'Đã Tối Ưu' },
    { id: 2, jobId: '20251014_2', planName: 'KHSX Tháng 2/2025', configName: 'Cấu hình Body-02', createdAt: '2025-01-15T09:15:00', createdBy: 'Trần Thị B', completedAt: null, status: 'Đang Tối Ưu' },
    { id: 3, jobId: '20251014_3', planName: 'KHSX Tháng 3/2025', configName: 'Cấu hình Paint-01', createdAt: '2025-02-01T14:20:00', createdBy: 'Lê Văn C', completedAt: null, status: 'Chưa Tối Ưu' },
    { id: 4, jobId: '20251013_1', planName: 'KHSX Q2/2025', configName: 'Cấu hình GA-02', createdAt: '2025-02-10T11:00:00', createdBy: 'Phạm Thị D', completedAt: '2025-02-10T13:30:00', status: 'Đã Tối Ưu' },
    { id: 5, jobId: '20251012_5', planName: 'KHSX Q3/2025', configName: 'Cấu hình Body-01', createdAt: '2025-02-20T08:45:00', createdBy: 'Hoàng Văn E', completedAt: null, status: 'Chưa Tối Ưu' },
  ]);
  const [showCreateJobModal, setShowCreateJobModal] = useState(false);
  const [newJobPlanId, setNewJobPlanId] = useState('');
  const [newJobConfigId, setNewJobConfigId] = useState('');
  const [filters, setFilters] = useState({
    planName: '',
    configName: '',
    createdBy: '',
    status: ''
  });

  // Results Page State
  const [resultTab, setResultTab] = useState('body');
  const [selectedJobId, setSelectedJobId] = useState(optimizationPlans.find(p => p.status === 'Đã Tối Ưu')?.jobId || '');
  
  const defaultVisibleModels = MODELS.reduce((acc, model) => ({ ...acc, [model]: true }), {});
  const [bodyLineVisible, setBodyLineVisible] = useState(defaultVisibleModels);
  const [changeOverVisible, setChangeOverVisible] = useState(defaultVisibleModels);
  const [paintBarVisible, setPaintBarVisible] = useState(defaultVisibleModels);
  const [gaCapacityVisible, setGaCapacityVisible] = useState(defaultVisibleModels);

  // -- Helper Functions & Handlers --
  
  useEffect(() => {
    const runningPlans = optimizationPlans.filter(p => p.status === 'Đang Tối Ưu');

    if (runningPlans.length > 0) {
      const timer = setTimeout(() => {
        setOptimizationPlans(prevPlans =>
          prevPlans.map(plan => {
            if (plan.status === 'Đang Tối Ưu') {
              return {
                ...plan,
                status: 'Đã Tối Ưu',
                completedAt: new Date().toISOString(),
              };
            }
            return plan;
          })
        );
      }, 5000); // 5 seconds

      return () => clearTimeout(timer);
    }
  }, [optimizationPlans]);

  const handleUploadPlan = () => {
    if (!newPlanName.trim()) {
      alert("Vui lòng nhập tên cho KHSX.");
      return;
    }
    const newPlan = {
      id: Math.max(...productionPlans.map(p => p.id), 0) + 1,
      name: newPlanName,
      createdBy: 'Người dùng hiện tại',
      createdAt: new Date().toISOString().split('T')[0],
      data: [] // Dữ liệu sẽ được điền từ file excel
    };
    setProductionPlans([newPlan, ...productionPlans]);
    setSelectedPlan(newPlan);
    setShowUploadModal(false);
    setNewPlanName('');
  };

  const handleDeletePlan = (planId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa kế hoạch sản xuất này không?")) {
      setProductionPlans(prev => {
        const newPlans = prev.filter(p => p.id !== planId);
        if (selectedPlan?.id === planId) {
          setSelectedPlan(newPlans[0] || null);
        }
        return newPlans;
      });
    }
  };

  const handleCreateConfig = () => {
    const newConfig = {
      id: Math.max(...configurations.map(c => c.id), 0) + 1,
      name: `Cấu hình mới ${configurations.length + 1}`,
      createdBy: 'Người dùng hiện tại',
      createdAt: new Date().toISOString().split('T')[0],
      gaConfig: {...initialGaConfig}, 
      bodyConfig: {...initialBodyConfig}, 
      calendarDays: [...initialCalendarDays]
    };
    setConfigurations([newConfig, ...configurations]);
    setSelectedConfig(newConfig);
  };

  const handleDeleteConfig = (configId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa cấu hình này không?")) {
      setConfigurations(prev => {
        const newConfigs = prev.filter(c => c.id !== configId);
        if (selectedConfig?.id === configId) {
          setSelectedConfig(newConfigs[0] || null);
        }
        return newConfigs;
      });
    }
  };
  
  const updateConfigState = (field, value) => {
    if (!selectedConfig) return;

    const updatedConfig = { ...selectedConfig, [field]: value };

    setConfigurations(prev => prev.map(c =>
      c.id === selectedConfig.id ? updatedConfig : c
    ));
    setSelectedConfig(updatedConfig);
  };

  const handleCreateJob = () => {
    if (!newJobPlanId || !newJobConfigId) {
      alert('Vui lòng chọn KHSX và Cấu hình ràng buộc!');
      return;
    }
    const plan = productionPlans.find(p => p.id === parseInt(newJobPlanId));
    const config = configurations.find(c => c.id === parseInt(newJobConfigId));
    
    const today = new Date();
    const dateString = today.getFullYear() + String(today.getMonth() + 1).padStart(2, '0') + String(today.getDate()).padStart(2, '0');
    const jobsToday = optimizationPlans.filter(p => p.jobId.startsWith(dateString)).length;
    
    const newJob = {
      id: Math.max(...optimizationPlans.map(p => p.id), 0) + 1,
      jobId: `${dateString}_${jobsToday + 1}`,
      planName: plan.name,
      configName: config.name,
      createdAt: new Date().toISOString(),
      createdBy: 'Người dùng hiện tại',
      completedAt: null,
      status: 'Chưa Tối Ưu',
    };
    
    setOptimizationPlans([newJob, ...optimizationPlans]);
    setShowCreateJobModal(false);
    setNewJobPlanId('');
    setNewJobConfigId('');
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };
  
  const handleJobAction = (jobIdToUpdate, action) => {
    if (action === 'view_results') {
      const job = optimizationPlans.find(p => p.id === jobIdToUpdate);
      if (job) {
        setSelectedJobId(job.jobId);
        setCurrentPage('results');
      }
      return;
    }

    setOptimizationPlans(prevPlans => prevPlans.map(plan => {
      if (plan.id === jobIdToUpdate) {
        let newStatus = plan.status;
        if (action === 'start' && plan.status === 'Chưa Tối Ưu') {
          newStatus = 'Đang Tối Ưu';
        } else if (action === 'stop' && plan.status === 'Đang Tối Ưu') {
          newStatus = 'Chưa Tối Ưu';
        }
        return { ...plan, status: newStatus };
      }
      return plan;
    }));
  };
  
  const handleStartAllJobs = () => {
    setOptimizationPlans(prevPlans =>
      prevPlans.map(plan =>
        plan.status === 'Chưa Tối Ưu' ? { ...plan, status: 'Đang Tối Ưu' } : plan
      )
    );
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'dashboard': 
        return <Dashboard optimizationPlans={optimizationPlans} />;
      case 'input': 
        return <Input 
          productionPlans={productionPlans}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          setShowUploadModal={setShowUploadModal}
          handleDeletePlan={handleDeletePlan}
          planFilters={planFilters}
          setPlanFilters={setPlanFilters}
          planSortOrder={planSortOrder}
          setPlanSortOrder={setPlanSortOrder}
        />;
      case 'config': 
        return <Config 
          configurations={configurations}
          selectedConfig={selectedConfig}
          setSelectedConfig={setSelectedConfig}
          setConfigurations={setConfigurations}
          selectedWorkshop={selectedWorkshop}
          setSelectedWorkshop={setSelectedWorkshop}
          handleCreateConfig={handleCreateConfig}
          handleDeleteConfig={handleDeleteConfig}
          updateConfigState={updateConfigState}
          configFilters={configFilters}
          setConfigFilters={setConfigFilters}
          configSortOrder={configSortOrder}
          setConfigSortOrder={setConfigSortOrder}
        />;
      case 'optimize': 
        return <Optimize 
          optimizationPlans={optimizationPlans}
          setShowCreateJobModal={setShowCreateJobModal}
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleJobAction={handleJobAction}
          handleStartAllJobs={handleStartAllJobs}
        />;
      case 'results': 
        return <Results 
          optimizationPlans={optimizationPlans}
          selectedJobId={selectedJobId}
          setSelectedJobId={setSelectedJobId}
          resultTab={resultTab}
          setResultTab={setResultTab}
          jobResultsData={jobResultsData}
          bodyLineVisible={bodyLineVisible}
          setBodyLineVisible={setBodyLineVisible}
          changeOverVisible={changeOverVisible}
          setChangeOverVisible={setChangeOverVisible}
          paintBarVisible={paintBarVisible}
          setPaintBarVisible={setPaintBarVisible}
          gaCapacityVisible={gaCapacityVisible}
          setGaCapacityVisible={setGaCapacityVisible}
        />;
      case 'account': 
        return <Account />;
      default: 
        return <Dashboard optimizationPlans={optimizationPlans} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans">
      <Sidebar 
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
      
      <div className="flex-1 overflow-auto">
        {renderPage()}
        <UploadModal 
          showUploadModal={showUploadModal}
          setShowUploadModal={setShowUploadModal}
          newPlanName={newPlanName}
          setNewPlanName={setNewPlanName}
          handleUploadPlan={handleUploadPlan}
        />
        <CreateJobModal 
          showCreateJobModal={showCreateJobModal}
          setShowCreateJobModal={setShowCreateJobModal}
          newJobPlanId={newJobPlanId}
          setNewJobPlanId={setNewJobPlanId}
          newJobConfigId={newJobConfigId}
          setNewJobConfigId={setNewJobConfigId}
          handleCreateJob={handleCreateJob}
          productionPlans={productionPlans}
          configurations={configurations}
        />
      </div>
    </div>
  );
};

export default App;
