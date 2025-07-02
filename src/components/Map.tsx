
import React, { useEffect, useRef } from 'react';

interface User {
  id: string;
  name: string;
  dogName: string;
  location: { lat: number; lng: number };
  isOnline: boolean;
  isFavorite?: boolean;
}

interface MapProps {
  users: User[];
  onUserClick?: (user: User) => void;
}

const Map: React.FC<MapProps> = ({ users, onUserClick }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    const mapContainer = mapRef.current;
    mapContainer.innerHTML = '';

    // 모던한 지도 배경 - 그라데이션과 블러 효과
    const mapBackground = document.createElement('div');
    mapBackground.className = 'absolute inset-0 bg-gradient-to-br from-blue-100 via-green-50 to-blue-50';
    mapContainer.appendChild(mapBackground);

    // 한강을 더 자연스럽게 표현
    const hanRiver = document.createElement('div');
    hanRiver.className = 'absolute bg-gradient-to-r from-blue-300/60 to-blue-400/40 shadow-sm';
    hanRiver.style.left = '5%';
    hanRiver.style.top = '55%';
    hanRiver.style.width = '90%';
    hanRiver.style.height = '12px';
    hanRiver.style.borderRadius = '8px';
    hanRiver.style.transform = 'rotate(-3deg)';
    hanRiver.style.filter = 'blur(0.5px)';
    mapContainer.appendChild(hanRiver);

    // 서울의 주요 구역들을 더 예쁘게 표현
    const districts = [
      { name: '강남구', left: '65%', top: '70%', color: 'from-violet-200/40 to-purple-300/30', size: 'w-20 h-16' },
      { name: '종로구', left: '45%', top: '35%', color: 'from-amber-200/40 to-yellow-300/30', size: 'w-18 h-14' },
      { name: '마포구', left: '25%', top: '45%', color: 'from-emerald-200/40 to-green-300/30', size: 'w-16 h-12' },
      { name: '서초구', left: '60%', top: '80%', color: 'from-rose-200/40 to-pink-300/30', size: 'w-16 h-12' },
      { name: '송파구', left: '75%', top: '75%', color: 'from-cyan-200/40 to-blue-300/30', size: 'w-14 h-10' },
    ];

    districts.forEach(district => {
      const districtDiv = document.createElement('div');
      districtDiv.className = `absolute ${district.size} bg-gradient-to-br ${district.color} rounded-2xl shadow-sm backdrop-blur-sm border border-white/20`;
      districtDiv.style.left = district.left;
      districtDiv.style.top = district.top;
      mapContainer.appendChild(districtDiv);
    });

    // 서울의 주요 랜드마크를 더 크고 예쁘게 표시
    const landmarks = [
      { name: '남산타워', left: '50%', top: '60%', icon: '🗼', size: 'text-2xl' },
      { name: '한강공원', left: '55%', top: '55%', icon: '🌊', size: 'text-xl' },
      { name: '경복궁', left: '47%', top: '40%', icon: '🏰', size: 'text-xl' },
      { name: '올림픽공원', left: '75%', top: '70%', icon: '🏟️', size: 'text-lg' },
      { name: '여의도', left: '35%', top: '52%', icon: '🏢', size: 'text-lg' },
    ];

    landmarks.forEach(landmark => {
      const landmarkDiv = document.createElement('div');
      landmarkDiv.className = `absolute ${landmark.size} opacity-70 hover:opacity-100 transition-all duration-300 cursor-pointer transform hover:scale-110 drop-shadow-sm`;
      landmarkDiv.style.left = landmark.left;
      landmarkDiv.style.top = landmark.top;
      landmarkDiv.innerHTML = landmark.icon;
      landmarkDiv.title = landmark.name;
      mapContainer.appendChild(landmarkDiv);
    });

    // 사용자 마커 생성 - 더 예쁘고 현대적인 디자인
    users.forEach((user, index) => {
      const marker = document.createElement('div');
      marker.className = `absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 hover:scale-125 hover:z-30 ${
        user.id === 'me' ? 'z-20' : 'z-10'
      }`;
      
      // 실제 좌표를 화면 위치로 변환
      const centerLat = 37.5665;
      const centerLng = 126.9780;
      const latRange = 0.08;
      const lngRange = 0.08;

      const xPos = 50 + ((user.location.lng - centerLng) / lngRange) * 35;
      const yPos = 50 - ((user.location.lat - centerLat) / latRange) * 35;

      marker.style.left = `${Math.max(10, Math.min(90, xPos))}%`;
      marker.style.top = `${Math.max(10, Math.min(90, yPos))}%`;

      const isCurrentUser = user.id === 'me';
      const markerColor = isCurrentUser 
        ? 'from-orange-400 to-orange-600' 
        : user.isOnline 
          ? 'from-emerald-400 to-emerald-600'
          : 'from-slate-400 to-slate-600';

      const pulseAnimation = user.isOnline || isCurrentUser 
        ? 'animate-pulse' 
        : '';

      marker.innerHTML = `
        <div class="relative group">
          <!-- 외부 링 (펄스 효과) -->
          <div class="absolute -inset-2 bg-gradient-to-r ${markerColor} rounded-full opacity-20 ${pulseAnimation}"></div>
          
          <!-- 메인 마커 -->
          <div class="relative w-14 h-14 bg-gradient-to-br ${markerColor} rounded-full flex items-center justify-center shadow-lg border-3 border-white/90 backdrop-blur-sm">
            <span class="text-white text-xl drop-shadow-sm">${isCurrentUser ? '🏠' : '🐕'}</span>
          </div>
          
          <!-- 즐겨찾기 배지 -->
          ${user.isFavorite ? `
            <div class="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-400 to-red-500 rounded-full flex items-center justify-center shadow-md border border-white">
              <span class="text-white text-xs">❤️</span>
            </div>
          ` : ''}
          
          <!-- 라벨 (호버 시 나타남) -->
          <div class="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg text-sm font-medium whitespace-nowrap border border-gray-200/50">
            <div class="flex items-center space-x-2">
              <span class="font-semibold text-gray-800">${user.dogName}</span>
              ${user.isOnline ? '<div class="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>' : '<div class="w-2 h-2 bg-gray-400 rounded-full"></div>'}
            </div>
            <div class="text-xs text-gray-600">${user.name}</div>
          </div>
          
          ${isCurrentUser ? `
            <div class="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-orange-600 font-semibold whitespace-nowrap bg-orange-50/80 px-2 py-1 rounded-md">
              내 위치
            </div>
          ` : ''}
        </div>
      `;

      marker.addEventListener('click', () => {
        if (onUserClick) onUserClick(user);
      });

      mapContainer.appendChild(marker);
    });

    // 현대적인 범례 디자인
    const legend = document.createElement('div');
    legend.className = 'absolute bottom-6 left-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl text-sm border border-gray-200/50';
    legend.innerHTML = `
      <div class="font-bold text-gray-800 mb-3 flex items-center text-base">
        <span class="mr-2 text-lg">🗺️</span>서울특별시
      </div>
      <div class="space-y-2">
        <div class="flex items-center space-x-3">
          <div class="w-4 h-4 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full shadow-sm"></div>
          <span class="text-gray-700">내 위치</span>
        </div>
        <div class="flex items-center space-x-3">
          <div class="w-4 h-4 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full shadow-sm"></div>
          <span class="text-gray-700">활동중</span>
        </div>
        <div class="flex items-center space-x-3">
          <div class="w-4 h-4 bg-gradient-to-r from-slate-400 to-slate-600 rounded-full shadow-sm"></div>
          <span class="text-gray-700">오프라인</span>
        </div>
        <div class="pt-2 mt-2 border-t border-gray-200">
          <div class="text-xs text-gray-500 flex items-center">
            <span class="mr-1">💡</span>
            마커를 클릭하거나 호버하면 상세 정보를 볼 수 있어요
          </div>
        </div>
      </div>
    `;
    mapContainer.appendChild(legend);

    // 우측 상단 정보 패널
    const infoPanel = document.createElement('div');
    infoPanel.className = 'absolute top-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-xl text-sm border border-gray-200/50';
    infoPanel.innerHTML = `
      <div class="font-bold text-gray-800 mb-2 flex items-center">
        <span class="mr-2">📍</span>실시간 위치
      </div>
      <div class="text-gray-600 text-xs">
        활동중인 친구들: ${users.filter(u => u.isOnline).length}명
      </div>
      <div class="text-gray-600 text-xs">
        즐겨찾기: ${users.filter(u => u.isFavorite).length}명
      </div>
    `;
    mapContainer.appendChild(infoPanel);

  }, [users, onUserClick]);

  return (
    <div 
      ref={mapRef} 
      className="relative w-full h-full bg-gradient-to-br from-blue-50 via-white to-green-50 rounded-xl overflow-hidden border-2 border-gray-100/50 shadow-inner"
      style={{ minHeight: '400px' }}
    >
      {/* Loading state */}
      <div className="absolute inset-0 flex items-center justify-center text-gray-400 z-0">
        <div className="text-center">
          <div className="text-5xl mb-3 animate-pulse">🗺️</div>
          <p className="text-base font-medium">서울 지도 로딩 중...</p>
        </div>
      </div>
    </div>
  );
};

export default Map;
