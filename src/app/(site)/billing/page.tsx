"use client";

import { useState } from "react";
import Link from "next/link";

// Fake data for the billing chart
const monthlyData = [
  { day: "1", usage: 120 },
  { day: "2", usage: 140 },
  { day: "3", usage: 160 },
  { day: "4", usage: 180 },
  { day: "5", usage: 200 },
  { day: "6", usage: 220 },
  { day: "7", usage: 240 },
  { day: "8", usage: 260 },
  { day: "9", usage: 280 },
  { day: "10", usage: 300 },
  { day: "11", usage: 320 },
  { day: "12", usage: 340 },
  { day: "13", usage: 360 },
  { day: "14", usage: 380 },
  { day: "15", usage: 400 },
  { day: "16", usage: 420 },
  { day: "17", usage: 440 },
  { day: "18", usage: 460 },
  { day: "19", usage: 480 },
  { day: "20", usage: 500 },
  { day: "21", usage: 520 },
  { day: "22", usage: 540 },
  { day: "23", usage: 560 },
  { day: "24", usage: 580 },
  { day: "25", usage: 600 },
  { day: "26", usage: 620 },
  { day: "27", usage: 640 },
  { day: "28", usage: 660 },
  { day: "29", usage: 680 },
  { day: "30", usage: 700 },
];

// Define the type for revenue data
interface RevenueItem {
  provider: string;
  revenue: number;
  color: string;
  percentage?: number;
}

// Fake revenue data by provider
const revenueData: RevenueItem[] = [
  { provider: "Eleven Labs", revenue: 2450.75, color: "bg-blue-500" },
  { provider: "Resemble AI", revenue: 1875.30, color: "bg-indigo-500" },
  { provider: "Cartesia", revenue: 1320.45, color: "bg-purple-500" },
];

// Calculate total revenue
const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);

// Calculate percentage for each provider
revenueData.forEach(item => {
  item.percentage = Math.round((item.revenue / totalRevenue) * 100);
});

const UsageChart = () => {
  const maxUsage = Math.max(...monthlyData.map(item => item.usage));
  
  return (
    <div className="h-80 w-full">
      {/* Chart container */}
      <div className="relative h-64 w-full">
        {/* Y-axis labels */}
        <div className="absolute -left-10 top-0 h-full flex flex-col justify-between text-xs text-gray-500">
          <span>{maxUsage}</span>
          <span>{Math.round(maxUsage * 0.75)}</span>
          <span>{Math.round(maxUsage * 0.5)}</span>
          <span>{Math.round(maxUsage * 0.25)}</span>
          <span>0</span>
        </div>
        
        {/* Y-axis grid lines */}
        <div className="absolute left-0 top-0 h-full w-full">
          {[0, 1, 2, 3, 4].map((_, index) => (
            <div 
              key={index} 
              className="absolute w-full border-t border-gray-800" 
              style={{ top: `${index * 25}%` }}
            ></div>
          ))}
        </div>
        
        {/* Chart line and points */}
        <div className="absolute left-0 top-0 h-full w-full px-2">
          <svg className="h-full w-full" viewBox={`0 0 ${monthlyData.length - 1} 100`} preserveAspectRatio="none">
            {/* Line chart */}
            <polyline
              points={monthlyData.map((item, index) => `${index}, ${100 - (item.usage / maxUsage) * 100}`).join(' ')}
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            
            {/* Area under the line */}
            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
            </linearGradient>
            
            <polygon
              points={`0,100 ${monthlyData.map((item, index) => `${index},${100 - (item.usage / maxUsage) * 100}`).join(' ')} ${monthlyData.length - 1},100`}
              fill="url(#gradient)"
              opacity="0.3"
            />
            
            {/* Data points */}
            {monthlyData.map((item, index) => (
              <g key={index} className="group">
                <circle
                  cx={index}
                  cy={100 - (item.usage / maxUsage) * 100}
                  r="0.7"
                  fill="#3B82F6"
                  className="transition-all duration-200 group-hover:r-1.5"
                />
                
                {/* Tooltip */}
                <foreignObject
                  x={index - 3}
                  y={100 - (item.usage / maxUsage) * 100 - 20}
                  width="6"
                  height="6"
                  className="pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <div className="bg-dark-2 text-white text-xs rounded px-2 py-1 whitespace-nowrap">
                    Day {item.day}: {item.usage} calls
                  </div>
                </foreignObject>
              </g>
            ))}
          </svg>
        </div>
      </div>
      
      {/* X-axis labels */}
      <div className="mt-4 flex justify-between text-xs text-gray-500">
        {[1, 5, 10, 15, 20, 25, 30].map(day => (
          <span key={day}>Day {day}</span>
        ))}
      </div>
    </div>
  );
};

export default function BillingPage() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [radiusApiKey, setRadiusApiKey] = useState("radius_api_7x9f2e8d1c5b3a_prod");
  
  return (
    <div className="min-h-screen bg-dark-1 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Billing & Usage</h1>
          <div className="flex space-x-2">
            <button 
              className={`rounded-md px-4 py-2 text-sm font-medium ${
                billingCycle === "monthly" ? "bg-blue-600 text-white" : "bg-dark-3 text-gray-400"
              }`}
              onClick={() => setBillingCycle("monthly")}
            >
              Monthly
            </button>
            <button 
              className={`rounded-md px-4 py-2 text-sm font-medium ${
                billingCycle === "yearly" ? "bg-blue-600 text-white" : "bg-dark-3 text-gray-400"
              }`}
              onClick={() => setBillingCycle("yearly")}
            >
              Yearly
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Summary Cards */}
          <div className="rounded-xl border border-gray-700 bg-dark-2 p-6">
            <h3 className="mb-4 text-lg font-medium">Total Revenue</h3>
            <p className="text-3xl font-bold">${totalRevenue.toFixed(2)}</p>
            <p className="mt-2 text-sm text-green-400">+12.5% from last month</p>
          </div>
          
          <div className="rounded-xl border border-gray-700 bg-dark-2 p-6">
            <h3 className="mb-4 text-lg font-medium">API Calls</h3>
            <p className="text-3xl font-bold">12,450</p>
            <p className="mt-2 text-sm text-green-400">+8.3% from last month</p>
          </div>
          
          <div className="rounded-xl border border-gray-700 bg-dark-2 p-6">
            <h3 className="mb-4 text-lg font-medium">Active Voices</h3>
            <p className="text-3xl font-bold">24</p>
            <p className="mt-2 text-sm text-green-400">+4 new this month</p>
          </div>
        </div>
        
        {/* Usage Chart */}
        <div className="mt-8 rounded-xl border border-gray-700 bg-dark-2 p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-medium">API Usage (Last 30 Days)</h3>
            <div className="rounded-md bg-dark-3 px-3 py-1 text-sm text-gray-400">
              Total: 12,450 calls
            </div>
          </div>
          <UsageChart />
        </div>
        
        {/* Revenue Breakdown */}
        <div className="mt-8 rounded-xl border border-gray-700 bg-dark-2 p-6">
          <h3 className="mb-6 text-lg font-medium">Revenue by Provider</h3>
          
          <div className="space-y-6">
            {revenueData.map((item, index) => (
              <div key={index}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm font-medium">{item.provider}</span>
                  <span className="text-sm font-medium">${item.revenue.toFixed(2)}</span>
                </div>
                <div className="h-2 w-full rounded-full bg-dark-3">
                  <div 
                    className={`h-full rounded-full ${item.color}`} 
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
                <div className="mt-1 text-right text-xs text-gray-400">{item.percentage}%</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Billing Information */}
        <div className="mt-8 rounded-xl border border-gray-700 bg-dark-2 p-6">
          <h3 className="mb-6 text-lg font-medium">Billing Information</h3>
          
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-400">Payment Method</h4>
              <div className="flex items-center rounded-lg border border-gray-700 bg-dark-3 p-4">
                <div className="mr-4 h-10 w-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  R
                </div>
                <div>
                  <p className="text-sm font-medium">Radius Payment Network</p>
                  <p className="text-xs text-gray-400">Connected via API Key</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="mb-2 text-sm font-medium text-gray-400">Billing Cycle</h4>
              <div className="rounded-lg border border-gray-700 bg-dark-3 p-4">
                <p className="text-sm font-medium">Monthly Billing</p>
                <p className="text-xs text-gray-400">Next invoice: June 1, 2023</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <h4 className="mb-2 text-sm font-medium text-gray-400">Radius API Key</h4>
            <div className="flex items-center">
              <input
                type="text"
                value={radiusApiKey}
                onChange={(e) => setRadiusApiKey(e.target.value)}
                className="flex-1 rounded-md border border-gray-700 bg-dark-3 px-4 py-2 text-sm text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none"
              />
              <button className="ml-3 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700">
                Update
              </button>
            </div>
          </div>
        </div>
        
        {/* Back to Dashboard */}
        <div className="mt-8 text-center">
          <Link href="/dashboard" className="text-blue-400 hover:text-blue-300 text-sm">
            ← Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
} 