'use client'

import { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Dashboard() {
  const [metrics] = useState({
    totalUsers: 1234,
    activeChats: 56,
    messagesSent: 9876,
    newUsers: 78
  });

  const [recentActivity] = useState([
    { id: 1, action: 'New user registered', time: '5 minutes ago' },
    { id: 2, action: 'Message sent to broadcast list', time: '10 minutes ago' },
    { id: 3, action: 'New chat initiated', time: '15 minutes ago' },
    { id: 4, action: 'User updated profile', time: '20 minutes ago' },
    { id: 5, action: 'New feedback received', time: '30 minutes ago' },
  ]);

  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Active Users',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      {/* Metrics Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard title="Total Users" value={metrics.totalUsers} />
        <MetricCard title="Active Chats" value={metrics.activeChats} />
        <MetricCard title="Messages Sent" value={metrics.messagesSent} />
        <MetricCard title="New Users (Last 7 Days)" value={metrics.newUsers} />
      </div>

      {/* Chart */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Weekly Active Users</h2>
        <div className="bg-white p-4 rounded-lg shadow">
          <Bar data={chartData} />
        </div>
      </div>

      {/* Recent Activity */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <ul>
            {recentActivity.map((activity) => (
              <li key={activity.id} className="border-b last:border-b-0 p-4">
                <p className="font-medium">{activity.action}</p>
                <p className="text-sm text-gray-500">{activity.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ title, value }: { title: string; value: number }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-3xl font-bold">{value.toLocaleString()}</p>
    </div>
  );
}