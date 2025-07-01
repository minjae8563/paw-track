
import React from 'react';
import { Heart } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface User {
  id: string;
  name: string;
  dogName: string;
  isOnline: boolean;
  isFavorite: boolean;
}

interface FavoriteUsersProps {
  favoriteUsers: User[];
}

const FavoriteUsers: React.FC<FavoriteUsersProps> = ({ favoriteUsers }) => {
  if (favoriteUsers.length === 0) {
    return null;
  }

  return (
    <Card className="p-4 bg-white/80 backdrop-blur-sm border-orange-100">
      <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
        <Heart className="w-4 h-4 mr-2 text-red-500" />
        즐겨찾기
      </h3>
      <div className="space-y-2">
        {favoriteUsers.map(user => (
          <div key={user.id} className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
            <div>
              <p className="text-sm font-medium text-gray-800">{user.dogName}</p>
              <p className="text-xs text-gray-600">{user.name}</p>
            </div>
            <Badge variant={user.isOnline ? "default" : "secondary"} className="text-xs">
              {user.isOnline ? "활동중" : "오프라인"}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default FavoriteUsers;
