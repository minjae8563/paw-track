
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ViewToggleProps {
  selectedView: 'map' | 'list';
  onViewChange: (view: 'map' | 'list') => void;
  onlineUsersCount: number;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ selectedView, onViewChange, onlineUsersCount }) => {
  return (
    <Card className="p-3 bg-white/80 backdrop-blur-sm border-orange-100">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-gray-700">서울 지역 활동중인 사용자</span>
          <Badge className="bg-green-500">{onlineUsersCount}</Badge>
        </div>
        <div className="flex rounded-lg border border-gray-200 overflow-hidden">
          <Button
            variant={selectedView === 'map' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('map')}
            className="rounded-none"
          >
            지도
          </Button>
          <Button
            variant={selectedView === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onViewChange('list')}
            className="rounded-none"
          >
            목록
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ViewToggle;
