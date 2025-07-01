
import React from 'react';
import { MapPin, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface QuickActionsProps {
  onLocationShare: () => void;
  onMessageClick: () => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onLocationShare, onMessageClick }) => {
  return (
    <Card className="p-4 bg-white/80 backdrop-blur-sm border-orange-100">
      <h3 className="font-semibold text-gray-800 mb-3">빠른 동작</h3>
      <div className="space-y-2">
        <Button 
          onClick={onLocationShare}
          className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600"
        >
          <MapPin className="w-4 h-4 mr-2" />
          내 위치 공유하기
        </Button>
        <Button 
          onClick={onMessageClick}
          variant="outline"
          className="w-full border-green-200 hover:bg-green-50"
        >
          <MessageCircle className="w-4 h-4 mr-2" />
          상태 메시지 보내기
        </Button>
      </div>
    </Card>
  );
};

export default QuickActions;
