
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Heart, X } from 'lucide-react';

interface User {
  id: string;
  name: string;
  nickname: string;
  dogName: string;
  dogBreed: string;
}

interface FavoriteRequest {
  id: string;
  fromUser: User;
  toUser: User;
  timestamp: Date;
}

interface FavoriteRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  requests: FavoriteRequest[];
  onAccept: (requestId: string) => void;
  onReject: (requestId: string) => void;
}

const FavoriteRequestModal: React.FC<FavoriteRequestModalProps> = ({
  isOpen,
  onClose,
  requests,
  onAccept,
  onReject
}) => {
  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return '방금 전';
    if (diffMins < 60) return `${diffMins}분 전`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}시간 전`;
    return `${Math.floor(diffMins / 1440)}일 전`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500" />
            <span>즐겨찾기 요청</span>
          </DialogTitle>
          <DialogDescription>
            다른 사용자들이 보낸 즐겨찾기 요청을 확인하고 수락하세요.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 max-h-80 overflow-y-auto">
          {requests.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Heart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>새로운 즐겨찾기 요청이 없습니다</p>
            </div>
          ) : (
            requests.map(request => (
              <div key={request.id} className="border rounded-lg p-4 bg-orange-50">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">🐕</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{request.fromUser.dogName}</h4>
                      <p className="text-sm text-gray-600">{request.fromUser.nickname} • {request.fromUser.dogBreed}</p>
                      <p className="text-xs text-gray-500">{formatTimeAgo(request.timestamp)}</p>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-gray-700 mb-4">
                  <strong>{request.fromUser.dogName}</strong>님이 즐겨찾기를 요청했습니다!
                </p>

                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={() => onAccept(request.id)}
                    className="flex-1 bg-green-500 hover:bg-green-600"
                  >
                    <Heart className="w-4 h-4 mr-1" />
                    수락
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onReject(request.id)}
                    className="flex-1 border-red-200 hover:bg-red-50"
                  >
                    <X className="w-4 h-4 mr-1" />
                    거절
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FavoriteRequestModal;
