
import React, { useEffect, useRef } from 'react';

interface User {
  id: string;
  name: string;
  dogName: string;
  location: { lat: number; lng: number };
  isOnline: boolean;
  isFavorite?: boolean;
}

interface SeoulMapProps {
  users: User[];
  onUserClick?: (user: User) => void;
}

const SeoulMap: React.FC<SeoulMapProps> = ({ users, onUserClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const mapContainer = mapRef.current;
    mapContainer.innerHTML = '';

    // 서울 지도 배경 - 실제 서울의 지형을 연상시키는 디자인
    const mapBackground = document.createElement('div');
    mapBackground.className = 'absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50';
    mapContainer.appendChild(mapBackground);

    // 한강 표현
    const hanRiver = document.createElement('div');
    hanRiver.className = 'absolute bg-blue-200 opacity-60';
    hanRiver.style.left = '10%';
    hanRiver.style.top = '45%';
    hanRiver.style.width = '80%';
    hanRiver.style.height = '8px';
    hanRiver.style.borderRadius = '4px';
    hanRiver.style.transform = 'rotate(-5deg)';
    mapContainer.appendChild(hanRiver);

    // 서울의 주요 구역들을 나타내는 배경
    const districts = [
      { name: '강남구', left: '60%', top: '60%', color: 'from-purple-100 to-purple-200' },
      { name: '종로구', left: '40%', top: '30%', color: 'from-yellow-100 to-yellow-200' },
      { name: '마포구', left: '25%', top: '40%', color: 'from-green-100 to-green-200' },
      { name: '서초구', left: '55%', top: '70%', color: 'from-pink-100 to-pink-200' },
    ];

    districts.forEach(district => {
      const districtDiv = document.createElement('div');
      districtDiv.className = `absolute w-16 h-12 bg-gradient-to-r ${district.color} rounded-lg opacity-30`;
      districtDiv.style.left = district.left;
      districtDiv.style.top = district.top;
      mapContainer.appendChild(districtDiv);
    });

    // 서울의 주요 랜드마크 표시
    const landmarks = [
      { name: '남산타워', left: '45%', top: '50%', icon: '🗼' },
      { name: '한강공원', left: '50%', top: '45%', icon: '🌊' },
      { name: '경복궁', left: '42%', top: '35%', icon: '🏰' },
      { name: '올림픽공원', left: '70%', top: '55%', icon: '🏟️' },
    ];

    landmarks.forEach(landmark => {
      const landmarkDiv = document.createElement('div');
      landmarkDiv.className = 'absolute text-lg opacity-60';
      landmarkDiv.style.left = landmark.left;
      landmarkDiv.style.top = landmark.top;
      landmarkDiv.innerHTML = landmark.icon;
      landmarkDiv.title = landmark.name;
      mapContainer.appendChild(landmarkDiv);
    });

    // 사용자 마커 생성 - 서울 지역 내 배치
    users.forEach((user, index) => {
      const marker = document.createElement('div');
      marker.className = `absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 ${
        user.id === 'me' ? 'z-20' : 'z-10'
      }`;
      
      // 서울 지역 내에서 위치 계산 (실제 좌표를 화면 위치로 변환)
      const centerLat = 37.5665; // 서울 중심 위도
      const centerLng = 126.9780; // 서울 중심 경도
      const latRange = 0.1; // 위도 범위
      const lngRange = 0.1; // 경도 범위

      const xPos = 50 + ((user.location.lng - centerLng) / lngRange) * 40; // 10%-90% 범위
      const yPos = 50 - ((user.location.lat - centerLat) / latRange) * 40; // 10%-90% 범위 (y축 반전)

      marker.style.left = `${Math.max(10, Math.min(90, xPos))}%`;
      marker.style.top = `${Math.max(10, Math.min(90, yPos))}%`;

      // 마커 디자인
      const isCurrentUser = user.id === 'me';
      const markerColor = isCurrentUser 
        ? 'from-orange-400 to-orange-500' 
        : user.isOnline 
          ? 'from-green-400 to-green-500'
          : 'from-gray-400 to-gray-500';

      marker.innerHTML = `
        <div class="relative">
          <div class="w-12 h-12 bg-gradient-to-r ${markerColor} rounded-full flex items-center justify-center shadow-lg border-2 border-white">
            <span class="text-white text-lg">${isCurrentUser ? '🏠' : '🐕'}</span>
          </div>
          ${user.isFavorite ? '<div class="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"><span class="text-white text-xs">❤️</span></div>' : ''}
          <div class="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 bg-white px-2 py-1 rounded shadow-md text-xs font-medium whitespace-nowrap">
            ${user.dogName}
            ${user.isOnline ? '<span class="inline-block w-2 h-2 bg-green-400 rounded-full ml-1"></span>' : ''}
          </div>
          ${isCurrentUser ? '<div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-600 whitespace-nowrap">내 위치</div>' : ''}
        </div>
      `;

      marker.addEventListener('click', () => {
        if (onUserClick) onUserClick(user);
      });

      mapContainer.appendChild(marker);
    });

    // 서울 지역 범례
    const legend = document.createElement('div');
    legend.className = 'absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md text-xs space-y-1';
    legend.innerHTML = `
      <div class="font-semibold text-gray-700 mb-2">🗺️ 서울 지역</div>
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full"></div>
        <span>내 위치</span>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
        <span>활동중인 사용자</span>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-3 h-3 bg-gradient-to-r from-gray-400 to-gray-500 rounded-full"></div>
        <span>오프라인 사용자</span>
      </div>
      <div class="text-xs text-gray-500 mt-2">
        🌊 한강 🗼 남산 🏰 궁궐 🏟️ 공원
      </div>
    `;
    mapContainer.appendChild(legend);

    // 서울 구역 정보
    const seoulInfo = document.createElement('div');
    seoulInfo.className = 'absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md text-xs';
    seoulInfo.innerHTML = `
      <div class="font-semibold text-gray-700 mb-1">📍 서울특별시</div>
      <div class="text-gray-600">반려견 산책 친구 찾기</div>
    `;
    mapContainer.appendChild(seoulInfo);

  }, [users, onUserClick]);

  return (
    <div 
      ref={mapRef} 
      className="relative w-full h-full bg-gray-100 rounded-lg overflow-hidden"
      style={{ minHeight: '300px' }}
    >
      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
        <div className="text-center">
          <div className="text-4xl mb-2">🗺️</div>
          <p className="text-sm">서울 지도 로딩 중...</p>
        </div>
      </div>
    </div>
  );
};

export default SeoulMap;
