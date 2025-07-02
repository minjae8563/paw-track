
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import Map from '@/components/Map';
import MessageModal from '@/components/MessageModal';
import ProfileModal from '@/components/ProfileModal';
import UserList from '@/components/UserList';
import Header from '@/components/Header';
import StatusCard from '@/components/StatusCard';
import QuickActions from '@/components/QuickActions';
import FavoriteUsers from '@/components/FavoriteUsers';
import ViewToggle from '@/components/ViewToggle';

// 더미 데이터 - 서울 실제 위치 기반 (하드코딩)
const mockUsers = [
  {
    id: '1',
    name: '김민수',
    dogName: '콩이',
    dogBreed: '골든리트리버',
    location: { lat: 37.5665, lng: 126.9780 }, // 명동
    status: '지금 남산공원에 있어요! 🐕',
    isOnline: true,
    isFavorite: true,
    lastSeen: new Date(),
  },
  {
    id: '2',
    name: '배용남',
    dogName: '라떼',
    dogBreed: '시바견',
    location: { lat: 37.5658, lng: 126.9775 }, // 명동 근처
    status: '7시에 한강공원 산책 나갈게요~',
    isOnline: false,
    isFavorite: false,
    lastSeen: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: '3',
    name: '정재혁',
    dogName: '솜이',
    dogBreed: '푸들',
    location: { lat: 37.5672, lng: 126.9785 }, // 을지로
    status: '조용한 곳에서 산책 중...',
    isOnline: true,
    isFavorite: true,
    lastSeen: new Date(),
  },
];

const Index = () => {
  const [users, setUsers] = useState(mockUsers);
  // 현재 사용자 위치를 완전히 하드코딩으로 고정
  const [currentUser, setCurrentUser] = useState({
    id: 'me',
    name: '나',
    dogName: '내 강아지',
    dogBreed: '믹스',
    location: { lat: 37.5665, lng: 126.9780 }, // 서울 명동 중심부 완전 하드코딩
    status: '산책 준비 중...',
    isOnline: true,
  });
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedView, setSelectedView] = useState<'map' | 'list'>('map');

  const handleLocationShare = () => {
    // 하드코딩된 서울 위치로 고정 (변경 없음)
    const seoulLocation = { lat: 37.5665, lng: 126.9780 };
    setCurrentUser(prev => ({ ...prev, location: seoulLocation }));
    toast({
      title: "위치가 공유되었습니다! 🐾",
      description: "서울 명동 중심가로 위치가 고정되었어요.",
    });
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
      <Header onProfileClick={() => setShowProfileModal(true)} />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Sidebar - Status & Actions */}
        <div className="space-y-4">
          <StatusCard user={currentUser} />
          <QuickActions 
            onLocationShare={handleLocationShare}
            onMessageClick={() => setShowMessageModal(true)}
          />
          <FavoriteUsers favoriteUsers={favoriteUsers} />
        </div>

        {/* Center - Map/List View */}
        <div className="lg:col-span-2 space-y-4">
          <ViewToggle 
            selectedView={selectedView}
            onViewChange={setSelectedView}
            onlineUsersCount={onlineUsers.length}
          />

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
          // 타입 호환성을 위해 필요한 속성들을 포함한 객체로 업데이트
          setCurrentUser(prev => ({
            ...prev,
            ...updatedUser,
            location: prev.location, // 기존 위치 유지
            isOnline: prev.isOnline   // 기존 온라인 상태 유지
          }));
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
