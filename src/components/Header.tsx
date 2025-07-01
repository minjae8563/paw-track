
import React from 'react';
import { User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onProfileClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onProfileClick }) => {
  return (
    <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-orange-100">
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🐾</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">PawTrack</h1>
              <p className="text-sm text-gray-600">서울 반려견 산책 친구 찾기</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onProfileClick}
              className="border-orange-200 hover:bg-orange-50"
            >
              <User className="w-4 h-4 mr-2" />
              프로필
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
