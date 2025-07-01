
import React, { useState, useEffect } from 'react';
import { MapPin, MessageCircle, Heart, User, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';
import Map from '@/components/Map';
import MessageModal from '@/components/MessageModal';
import ProfileModal from '@/components/ProfileModal';
import UserList from '@/components/UserList';

// 더미 데이터
const mockUsers = [
  {
    id: '1',
    name: '김민수',
    dogName: '콩이',
    dogBreed: '골든리트리버',
    location: { lat: 37.5665, lng: 126.9780 },
    status: '지금 공원에 있어요! 🐕',
    isOnline: true,
    isFavorite: true,
    lastSeen: new Date(),
  },
  {
    id: '2',
    name: '배용남',
    dogName: '라떼',
    dogBreed: '시바견',
    location: { lat: 37.5675, lng: 126.9785 },
    status: '7시에 산책 나갈게요~',
    isOnline: false,
    isFavorite: false,
    lastSeen: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: '3',
    name: '정재혁',
    dogName: '솜이',
    dogBreed: '푸들',
    location: { lat: 37.5670, lng: 126.9775 },
    status: '조용한 곳에서 산책 중...',
    isOnline: true,
    isFavorite: true,
    lastSeen: new Date(),
  },
];

const Index = () => {
  const [users, setUsers] = useState(mockUsers);
  const [currentUser, setCurrentUser] = useState({
    id: 'me',
    name: '나',
    dogName: '내 강아지',
    dogBreed: '믹스',
    location: { lat: 37.5665, lng: 126.9780 },
    status: '산책 준비 중...',
    isOnline: true,
  });
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedView, setSelectedView] = useState<'map' | 'list'>('map');

  const handleLocationShare = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentUser(prev => ({ ...prev, location: newLocation }));
          toast({
            title: "위치가 공유되었습니다! 🐾",
            description: "다른 사용자들이 내 위치를 볼 수 있어요.",
          });
        },
        (error) => {
          console.error('위치 접근 오류:', error);
          toast({
            title: "위치 접근 실패",
            description: "위치 접근을 허용해주세요.",
            variant: "destructive",
          });
        }
      );
    }
  };

  const handleSendMessage = (message: string) => {
    setCurrentUser(prev => ({ ...prev, status: message }));
    toast({
      title: "메시지가 전송되었습니다! 📱",
      description: `"${message}"`,
    });
    setShowMessageModal(false);
  };

  const toggleFavorite = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, isFavorite: !user.isFavorite }
        : user
    ));
  };

  const favoriteUsers = users.filter(user => user.isFavorite);
  const onlineUsers = users.filter(user => user.isOnline);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
                <span className="text-white text-lg">🐾</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">PawTrack</h1>
                <p className="text-sm text-gray-600">반려견 산책 친구 찾기</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowProfileModal(true)}
                className="border-orange-200 hover:bg-orange-50"
              >
                <User className="w-4 h-4 mr-2" />
                프로필
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Status & Actions */}
        <div className="space-y-4">
          {/* Current Status Card */}
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-orange-100">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full mx-auto flex items-center justify-center">
                <span className="text-white text-2xl">🐕</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">{currentUser.dogName}</h3>
                <p className="text-sm text-gray-600">{currentUser.dogBreed}</p>
              </div>
              <div className="p-3 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-700">"{currentUser.status}"</p>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-orange-100">
            <h3 className="font-semibold text-gray-800 mb-3">빠른 동작</h3>
            <div className="space-y-2">
              <Button 
                onClick={handleLocationShare}
                className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600"
              >
                <MapPin className="w-4 h-4 mr-2" />
                내 위치 공유하기
              </Button>
              <Button 
                onClick={() => setShowMessageModal(true)}
                variant="outline"
                className="w-full border-green-200 hover:bg-green-50"
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                상태 메시지 보내기
              </Button>
            </div>
          </Card>

          {/* Favorite Users */}
          {favoriteUsers.length > 0 && (
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
          )}
        </div>

        {/* Center - Map/List View */}
        <div className="lg:col-span-2 space-y-4">
          {/* View Toggle */}
          <Card className="p-3 bg-white/80 backdrop-blur-sm border-orange-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">현재 활동중인 사용자</span>
                <Badge className="bg-green-500">{onlineUsers.length}</Badge>
              </div>
              <div className="flex rounded-lg border border-gray-200 overflow-hidden">
                <Button
                  variant={selectedView === 'map' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedView('map')}
                  className="rounded-none"
                >
                  지도
                </Button>
                <Button
                  variant={selectedView === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setSelectedView('list')}
                  className="rounded-none"
                >
                  목록
                </Button>
              </div>
            </div>
          </Card>

          {/* Map or List View */}
          <Card className="bg-white/80 backdrop-blur-sm border-orange-100 overflow-hidden">
            {selectedView === 'map' ? (
              <div className="h-96 lg:h-[500px]">
                <Map 
                  users={[currentUser, ...users]} 
                  onUserClick={(user) => console.log('User clicked:', user)}
                />
              </div>
            ) : (
              <div className="p-4">
                <UserList 
                  users={users}
                  onToggleFavorite={toggleFavorite}
                />
              </div>
            )}
          </Card>
        </div>
      </main>

      {/* Modals */}
      <MessageModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        onSend={handleSendMessage}
      />
      
      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        user={currentUser}
        onSave={(updatedUser) => {
          setCurrentUser(updatedUser);
          setShowProfileModal(false);
          toast({
            title: "프로필이 업데이트되었습니다! ✨",
          });
        }}
      />
    </div>
  );
};

export default Index;
