import { CalendarCheck2, Hourglass, TriangleAlert } from 'lucide-react';
import React from 'react';

const StatCard = ({ title, count, icon, color }) => {

  const iconColors = {
    green: 'text-green-600',
    blue: 'text-blue-600',
    red: 'text-red-600',
  };

  return (
    <div className="bg-linear-to-br from-[#212629] to-[#CCEBEB00] backdrop-blur-sm bg-opacity-10 rounded-2xl shadow-lg p-6 flex items-center transition-all duration-300 hover:shadow-xl hover:backdrop-blur">
      <div>
        <div className='flex items-center gap-2 pb-5'>
          <div className={``}>
            <div className={`w-6 h-6 ${iconColors[color]}`}>{icon}</div>
          </div>
          <p className="text-3xl font-bold text-white">{count}</p>
        </div>
        <p className="text-base font-normal text-gray-300">{title}</p>
      </div>
    </div>
  );
};

const StatsCards = () => {
  const stats = [
    {
      title: 'Total number of scheduled appointments',
      count: '94',
      icon: (
        <CalendarCheck2 color='#FFD147'/>
      ),
      color: 'green',
    },
    {
      title: 'Total number of pending appointments',
      count: '32',
      icon: <Hourglass color="#79B5EC" />,
      color: 'blue',
    },
    {
      title: 'Total number of cancelled appointments',
      count: '56',
      icon: (
        <TriangleAlert color='#FF4F4E'/>
      ),
      color: 'red',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          count={stat.count}
          icon={stat.icon}
          color={stat.color}
        />
      ))}
    </div>
  );
};

export default StatsCards;
