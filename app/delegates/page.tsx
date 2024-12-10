'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

interface Delegate {
  id: string;
  title: string;
  fullName: string;
  email: string;
  designation: string;
  kingschatPhone: string;
  kingschatHandle: string;
  gender: string;
  age: string;
  zoneMinistryCenter: string;
  registrationDate: string;
}

export default function DelegatesPage() {
  const { data: delegates = [], isLoading, error } = useQuery<Delegate[]>({
    queryKey: ['delegates'],
    queryFn: async () => {
      const { data } = await axios.get('/api/delegates');
      return data;
    },
  });

  // Analytics calculations
  const analytics = {
    totalDelegates: delegates.length,
    genderDistribution: delegates.reduce((acc, delegate) => {
      acc[delegate.gender] = (acc[delegate.gender] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
    zoneDistribution: delegates.reduce((acc, delegate) => {
      acc[delegate.zoneMinistryCenter] = (acc[delegate.zoneMinistryCenter] || 0) + 1;
      return acc;
    }, {} as Record<string, number>),
  };

  // Prepare data for charts
  const genderChartData = Object.entries(analytics.genderDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  const zoneChartData = Object.entries(analytics.zoneDistribution).map(([name, value]) => ({
    name,
    value,
  }));

  // Colors for pie chart
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(delegates.map(delegate => ({
      'Title': delegate.title,
      'Full Name': delegate.fullName,
      'Email': delegate.email,
      'Phone': delegate.kingschatPhone,
      'KingsChat Handle': delegate.kingschatHandle,
      'Designation': delegate.designation,
      'Gender': delegate.gender,
      'Age': delegate.age,
      'Zone/Ministry Center': delegate.zoneMinistryCenter,
      'Registration Date': new Date(delegate.registrationDate).toLocaleDateString(),
    })));

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Delegates');
    XLSX.writeFile(workbook, 'ITPLC2025_Delegates.xlsx');
  };

  if (isLoading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center min-h-screen text-red-600">
      Error loading delegates
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Registered Delegates</h1>
        <button
          onClick={downloadExcel}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download Excel
        </button>
      </div>

      {/* Analytics Dashboard */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Analytics Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Total Delegates Card */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="text-lg font-medium text-blue-800">Total Delegates</h3>
            <p className="text-3xl font-bold text-blue-600">{analytics.totalDelegates}</p>
          </div>

          {/* Gender Distribution Chart */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Gender Distribution</h3>
            <PieChart width={200} height={200}>
              <Pie
                data={genderChartData}
                cx={100}
                cy={100}
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {genderChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* Zone Distribution Chart */}
          <div className="col-span-full bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-medium mb-2">Zone Distribution</h3>
            <div className="overflow-x-auto">
              <BarChart width={600} height={300} data={zoneChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </div>
          </div>
        </div>
      </div>

      {/* Updated Delegates List */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {delegates.map((delegate) => (
          <div 
            key={delegate.id} 
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
          >
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-white">
                    {delegate.title} {delegate.fullName}
                  </h2>
                  <p className="text-blue-100 mt-1 text-sm">
                    {delegate.designation}
                  </p>
                </div>
                <span className="bg-blue-500/30 text-white text-xs px-3 py-1 rounded-full">
                  {new Date(delegate.registrationDate).toLocaleDateString()}
                </span>
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6">
              {/* Contact Information */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{delegate.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm">{delegate.kingschatPhone}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                  <span className="text-sm">{delegate.kingschatHandle}</span>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-100 my-4"></div>

              {/* Additional Information */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">Gender</p>
                  <p className="text-sm font-medium text-gray-700">{delegate.gender}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">Age</p>
                  <p className="text-sm font-medium text-gray-700">{delegate.age}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-500 mb-1">Zone</p>
                  <p className="text-sm font-medium text-gray-700 truncate" title={delegate.zoneMinistryCenter}>
                    {delegate.zoneMinistryCenter}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}