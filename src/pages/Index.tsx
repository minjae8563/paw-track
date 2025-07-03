import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import Map from '@/components/Map';
import MessageModal from '@/components/MessageModal';
import ProfileModal from '@/components/ProfileModal';
import FavoriteRequestModal from '@/components/FavoriteRequestModal';
import UserList from '@/components/UserList';
import Header from '@/components/Header';
import StatusCard from '@/components/StatusCard';
import QuickActions from '@/components/QuickActions';
import FavoriteUsers from '@/components/FavoriteUsers';
import ViewToggle from '@/components/ViewToggle';

// 더미 데이터 - 서울 내 실제 다른 위치들로 분산 배치
const mockUsers = [
  {
    id: '1',
    name: '김민수',
    dogName: '콩이',
    dogBreed: '골든리트리버',
    location: { lat: 37.5708, lng: 126.9856 }, // 광화문광장
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
    location: { lat: 37.5172, lng: 127.0473 }, // 강남역
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
    location: { lat: 37.5563, lng: 126.9723 }, // 홍대입구
    status: '조용한 곳에서 산책 중...',
    isOnline: true,
    isFavorite: true,
    lastSeen: new Date(),
  },
];

interface FavoriteRequest {
  id: string;
  fromUser: {
    id: string;
    name: string;
    dogName: string;
    dogBreed: string;
  };
  toUser: {
    id: string;
    name: string;
    dogName: string;
    dogBreed: string;
  };
  timestamp: Date;
}

const Index = () => {
  const [users, setUsers] = useState(mockUsers);
  const [favoriteRequests, setFavoriteRequests] = useState<FavoriteRequest[]>([]);
  const [showFavoriteRequestModal, setShowFavoriteRequestModal] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: 'me',
    name: '나',
    dogName: '내 강아지',
    dogBreed: '믹스',
    location: { lat: 37.5665, lng: 126.9780 }, // 명동
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

  const handleFavoriteRequest = (userId: string) => {
    const targetUser = users.find(user => user.id === userId);
    if (!targetUser) return;

    // 이미 즐겨찾기된 사용자인지 확인
    if (targetUser.isFavorite) {
      toast({
        title: "이미 즐겨찾기에 추가된 사용자입니다! ❤️",
        description: `${targetUser.dogName}님은 이미 즐겨찾기에 있어요.`,
      });
      return;
    }

    // 이미 요청을 보냈는지 확인
    const existingRequest = favoriteRequests.find(
      req => req.fromUser.id === 'me' && req.toUser.id === userId
    );

    if (existingRequest) {
      toast({
        title: "이미 요청을 보냈습니다! ⏳",
        description: `${targetUser.dogName}님의 응답을 기다리고 있어요.`,
      });
      return;
    }

    // 새로운 즐겨찾기 요청 생성 (실제로는 상대방에게 전송)
    const newRequest: FavoriteRequest = {
      id: Date.now().toString(),
      fromUser: {
        id: currentUser.id,
        name: currentUser.name,
        dogName: currentUser.dogName,
        dogBreed: currentUser.dogBreed,
      },
      toUser: {
        id: targetUser.id,
        name: targetUser.name,
        dogName: targetUser.dogName,
        dogBreed: targetUser.dogBreed,
      },
      timestamp: new Date(),
    };

    // 데모를 위해 자동으로 상대방의 요청 목록에 추가 (실제로는 서버를 통해 처리)
    setFavoriteRequests(prev => [...prev, newRequest]);

    toast({
      title: "즐겨찾기 요청을 보냈습니다! 💌",
      description: `${targetUser.dogName}님에게 즐겨찾기 요청을 보냈어요.`,
    });
  };

  const handleAcceptFavoriteRequest = (requestId: string) => {
    const request = favoriteRequests.find(req => req.id === requestId);
    if (!request) return;

    // 양방향으로 즐겨찾기 추가
    setUsers(prev => prev.map(user => 
      user.id === request.fromUser.id 
        ? { ...user, isFavorite: true }
        : user
    ));

    // 요청 제거
    setFavoriteRequests(prev => prev.filter(req => req.id !== requestId));

    toast({
      title: "즐겨찾기가 추가되었습니다! ❤️",
      description: `${request.fromUser.dogName}님과 서로 즐겨찾기가 되었어요!`,
    });
  };

  const handleRejectFavoriteRequest = (requestId: string) => {
    const request = favoriteRequests.find(req => req.id === requestId);
    if (!request) return;

    // 요청 제거
    setFavoriteRequests(prev => prev.filter(req => req.id !== requestId));

    toast({
      title: "요청을 거절했습니다",
      description: `${request.fromUser.dogName}님의 즐겨찾기 요청을 거절했어요.`,
    });
  };

  const removeFavorite = (userId: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, isFavorite: false }
        : user
    ));

    const user = users.find(u => u.id === userId);
    if (user) {
      toast({
        title: "즐겨찾기에서 제거되었습니다",
        description: `${user.dogName}님을 즐겨찾기에서 제거했어요.`,
      });
    }
  };

  const favoriteUsers = users.filter(user => user.isFavorite);
  const onlineUsers = users.filter(user => user.isOnline);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-green-50">
      <Header 
        onProfileClick={() => setShowProfileModal(true)}
        favoriteRequestCount={favoriteRequests.length}
        onFavoriteRequestClick={() => setShowFavoriteRequestModal(true)}
      />

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="space-y-4">
          <StatusCard user={currentUser} />
          <QuickActions 
            onLocationShare={handleLocationShare}
            onMessageClick={() => setShowMessageModal(true)}
          />
          <FavoriteUsers favoriteUsers={favoriteUsers} onRemoveFavorite={removeFavorite} />
        </div>

        <div className="lg:col-span-2 space-y-4">
          <ViewToggle 
            selectedView={selectedView}
            onViewChange={setSelectedView}
            onlineUsersCount={onlineUsers.length}
          />

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
                  onFavoriteRequest={handleFavoriteRequest}
                  onRemoveFavorite={removeFavorite}
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

      <FavoriteRequestModal
        isOpen={showFavoriteRequestModal}
        onClose={() => setShowFavoriteRequestModal(false)}
        requests={favoriteRequests}
        onAccept={handleAcceptFavoriteRequest}
        onReject={handleRejectFavoriteRequest}
      />
    </div>
  );
};

export default Index;
