
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

    // 실제 지도 라이브러리 대신 시각적 표현
    const mapContainer = mapRef.current;
    mapContainer.innerHTML = '';

    // 가상의 지도 배경
    const mapBackground = document.createElement('div');
    mapBackground.className = 'absolute inset-0 bg-gradient-to-br from-green-100 to-blue-100';
    mapContainer.appendChild(mapBackground);

    // 격자 패턴으로 도시 느낌 연출
    const gridOverlay = document.createElement('div');
    gridOverlay.className = 'absolute inset-0 opacity-20';
    gridOverlay.style.backgroundImage = `
      linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
    `;
    gridOverlay.style.backgroundSize = '40px 40px';
    mapContainer.appendChild(gridOverlay);

    // 사용자 마커 생성
    users.forEach((user, index) => {
      const marker = document.createElement('div');
      marker.className = `absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110 ${
        user.id === 'me' ? 'z-20' : 'z-10'
      }`;
      
      // 위치 계산 (상대적 위치)
      const xPos = 20 + (index * 15) + (Math.random() * 40);
      const yPos = 20 + (Math.random() * 60);
      marker.style.left = `${xPos}%`;
      marker.style.top = `${yPos}%`;

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
        </div>
      `;

      marker.addEventListener('click', () => {
        if (onUserClick) onUserClick(user);
      });

      mapContainer.appendChild(marker);
    });

    // 범례 추가
    const legend = document.createElement('div');
    legend.className = 'absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm p-3 rounded-lg shadow-md text-xs space-y-1';
    legend.innerHTML = `
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
    `;
    mapContainer.appendChild(legend);

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
          <p className="text-sm">지도 로딩 중...</p>
        </div>
      </div>
    </div>
  );
};

export default Map;
