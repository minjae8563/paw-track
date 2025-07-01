
import React from 'react';
import { Card } from '@/components/ui/card';

interface User {
  dogName: string;
  dogBreed: string;
  status: string;
}

interface StatusCardProps {
  user: User;
}

const StatusCard: React.FC<StatusCardProps> = ({ user }) => {
  return (
    <Card className="p-4 bg-white/80 backdrop-blur-sm border-orange-100">
      <div className="text-center space-y-3">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mx-auto flex items-center justify-center">
          <span className="text-white text-2xl">🐕</span>
        </div>
        <div>
          <h3 className="font-semibold text-gray-800">{user.dogName}</h3>
          <p className="text-sm text-gray-600">{user.dogBreed}</p>
        </div>
        <div className="p-3 bg-orange-50 rounded-lg">
          <p className="text-sm text-gray-700">"{user.status}"</p>
        </div>
      </div>
    </Card>
  );
};

export default StatusCard;
