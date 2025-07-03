import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageCircle, MapPin, HeartOff } from 'lucide-react';

interface User {
  id: string;
  name: string;
  dogName: string;
  dogBreed: string;
  status: string;
  isOnline: boolean;
  isFavorite: boolean;
  lastSeen: Date;
}

interface UserListProps {
  users: User[];
  onFavoriteRequest: (userId: string) => void;
  onRemoveFavorite: (userId: string) => void;
}

const UserList: React.FC<UserListProps> = ({ users, onFavoriteRequest, onRemoveFavorite }) => {
  const formatLastSeen = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return '방금 전';
    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}시간 전`;
    return `${Math.floor(diffMins / 1440)}일 전`;
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">근처 산책자들</h3>
        <Badge variant="secondary">{users.length}명</Badge>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <div className="text-4xl mb-2">🐕</div>
          <p>근처에 활동중인 산책자가 없습니다</p>
          <p className="text-sm">잠시 후 다시 확인해보세요!</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {users.map(user => (
            <div 
              key={user.id} 
              className={`p-4 rounded-lg border transition-all hover:shadow-md ${
                user.isOnline 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-gray-50 border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    user.isOnline 
                      ? 'bg-gradient-to-r from-green-400 to-green-500' 
                      : 'bg-gradient-to-r from-gray-400 to-gray-500'
                  }`}>
                    <span className="text-white text-lg">🐕</span>
                  </div>

                  {/* User Info */}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-800">{user.dogName}</h4>
                      <Badge 
                        variant={user.isOnline ? "default" : "secondary"}
                        className={user.isOnline ? "bg-green-500" : ""}
                      >
                        {user.isOnline ? '활동중' : '오프라인'}
                      </Badge>
                      {user.isFavorite && (
                        <Heart className="w-4 h-4 text-red-500 fill-current" />
                      )}
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-1">
                      {user.name} • {user.dogBreed}
                    </p>

                    <div className="bg-white/70 px-3 py-2 rounded-md mb-2">
                      <p className="text-sm text-gray-700">"{user.status}"</p>
                    </div>

                    <p className="text-xs text-gray-500">
                      마지막 활동: {formatLastSeen(user.lastSeen)}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col space-y-2">
                  {user.isFavorite ? (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onRemoveFavorite(user.id)}
                      className="w-10 h-10 p-0 border-red-200 hover:bg-red-50"
                    >
                      <HeartOff className="w-4 h-4 text-red-500" />
                    </Button>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onFavoriteRequest(user.id)}
                      className="w-10 h-10 p-0 border-red-200 hover:bg-red-50"
                    >
                      <Heart className="w-4 h-4 text-gray-400" />
                    </Button>
                  )}

                  <Button
                    size="sm"
                    variant="outline"
                    className="w-10 h-10 p-0 border-blue-200 hover:bg-blue-50"
                    onClick={() => console.log('메시지 보내기:', user.id)}
                  >
                    <MessageCircle className="w-4 h-4 text-blue-500" />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    className="w-10 h-10 p-0 border-green-200 hover:bg-green-50"
                    onClick={() => console.log('위치 보기:', user.id)}
                  >
                    <MapPin className="w-4 h-4 text-green-500" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
