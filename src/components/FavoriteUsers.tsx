import React from 'react';
import { Heart, X } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface User {
  id: string;
  name: string;
  dogName: string;
  isOnline: boolean;
  isFavorite: boolean;
}

interface FavoriteUsersProps {
  favoriteUsers: User[];
  onRemoveFavorite: (userId: string) => void;
}

const FavoriteUsers: React.FC<FavoriteUsersProps> = ({ favoriteUsers, onRemoveFavorite }) => {
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
          <div key={user.id} className="flex items-center justify-between p-2 bg-orange-50 rounded-lg group">
            <div>
              <p className="text-sm font-medium text-gray-800">{user.dogName}</p>
              <p className="text-xs text-gray-600">{user.name}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={user.isOnline ? "default" : "secondary"} className="text-xs">
                {user.isOnline ? "활동중" : "오프라인"}
              </Badge>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onRemoveFavorite(user.id)}
                className="w-6 h-6 p-0 opacity-0 group-hover:opacity-100 hover:bg-red-100 transition-opacity"
              >
                <X className="w-3 h-3 text-red-500" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default FavoriteUsers;
