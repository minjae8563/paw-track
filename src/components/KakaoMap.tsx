
import React, { useEffect, useRef } from 'react';

interface User {
  id: string;
  name: string;
  dogName: string;
  location: { lat: number; lng: number };
  isOnline: boolean;
  isFavorite?: boolean;
}

interface KakaoMapProps {
  users: User[];
  onUserClick?: (user: User) => void;
}

declare global {
  interface Window {
    kakao: any;
  }
}

const KakaoMap: React.FC<KakaoMapProps> = ({ users, onUserClick }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  useEffect(() => {
    // 기존 스크립트 제거
    const existingScript = document.querySelector('script[src*="dapi.kakao.com"]');
    if (existingScript) {
      existingScript.remove();
    }

    // 카카오맵 스크립트 동적 로드 (새로운 JavaScript 키 사용)
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=1ac839b0724e5dc767563533b657aba9&autoload=false`;
    script.async = true;
    
    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          initializeMap();
        });
      }
    };
    
    script.onerror = () => {
      console.error('카카오맵 스크립트 로드 실패');
    };
    
    document.head.appendChild(script);

    return () => {
      // 컴포넌트 언마운트 시 스크립트 제거
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      updateMarkers();
    }
  }, [users]);

  const initializeMap = () => {
    if (!mapContainer.current || !window.kakao) return;

    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780), // 서울 명동 하드코딩
      level: 3, // 지도 확대 레벨
    };

    mapRef.current = new window.kakao.maps.Map(mapContainer.current, options);
    
    // 지도 타입 컨트롤 추가
    const mapTypeControl = new window.kakao.maps.MapTypeControl();
    mapRef.current.addControl(mapTypeControl, window.kakao.maps.ControlPosition.TOPRIGHT);

    // 줌 컨트롤 추가
    const zoomControl = new window.kakao.maps.ZoomControl();
    mapRef.current.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    console.log('카카오맵 초기화 완료');
    updateMarkers();
  };

  const updateMarkers = () => {
    if (!mapRef.current || !window.kakao) return;

    // 기존 마커 제거
    markersRef.current.forEach(marker => {
      if (marker && marker.setMap) {
        marker.setMap(null);
      }
    });
    markersRef.current = [];

    console.log('마커 업데이트 시작, 사용자 수:', users.length);

    users.forEach(user => {
      const position = new window.kakao.maps.LatLng(user.location.lat, user.location.lng);
      
      // 마커 이미지 설정
      const isCurrentUser = user.id === 'me';
      const markerImageSrc = isCurrentUser 
        ? 'data:image/svg+xml;base64,' + btoa(`
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="#f97316" stroke="white" stroke-width="2"/>
            <text x="20" y="26" text-anchor="middle" font-size="16" fill="white">🏠</text>
          </svg>
        `)
        : 'data:image/svg+xml;base64,' + btoa(`
          <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="18" fill="${user.isOnline ? '#22c55e' : '#6b7280'}" stroke="white" stroke-width="2"/>
            <text x="20" y="26" text-anchor="middle" font-size="16" fill="white">🐕</text>
          </svg>
        `);

      const imageSize = new window.kakao.maps.Size(40, 40);
      const markerImage = new window.kakao.maps.MarkerImage(markerImageSrc, imageSize);

      const marker = new window.kakao.maps.Marker({
        position: position,
        image: markerImage,
      });

      marker.setMap(mapRef.current);
      markersRef.current.push(marker);

      // 인포윈도우 생성
      const infoWindow = new window.kakao.maps.InfoWindow({
        content: `
          <div style="padding: 10px; min-width: 120px; text-align: center;">
            <div style="font-weight: bold; color: #374151; margin-bottom: 4px;">
              ${user.dogName}
              ${user.isFavorite ? ' ❤️' : ''}
            </div>
            <div style="font-size: 12px; color: #6b7280;">
              ${user.name}
            </div>
            <div style="font-size: 11px; color: ${user.isOnline ? '#22c55e' : '#6b7280'}; margin-top: 4px;">
              ${user.isOnline ? '🟢 활동중' : '⚪ 오프라인'}
            </div>
            ${isCurrentUser ? '<div style="font-size: 11px; color: #f97316; margin-top: 2px;">내 위치</div>' : ''}
          </div>
        `,
        removable: true,
      });

      // 마커 클릭 이벤트
      window.kakao.maps.event.addListener(marker, 'click', () => {
        // 다른 인포윈도우 닫기
        markersRef.current.forEach((m) => {
          if (m !== marker && m.infoWindow) {
            m.infoWindow.close();
          }
        });
        
        infoWindow.open(mapRef.current, marker);
        
        if (onUserClick) {
          onUserClick(user);
        }
      });

      // 마커에 인포윈도우 참조 저장
      marker.infoWindow = infoWindow;
    });

    console.log('마커 업데이트 완료, 총 마커 수:', markersRef.current.length);
  };

  return (
    <div className="relative w-full h-full">
      <div 
        ref={mapContainer} 
        className="w-full h-full rounded-lg overflow-hidden"
        style={{ minHeight: '400px' }}
      />
      
      {/* 지도 범례 */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm p-3 rounded-lg shadow-lg text-xs space-y-1 border max-w-48">
        <div className="font-semibold text-gray-700 mb-2 flex items-center">
          <span className="mr-2">🗺️</span>카카오맵 - 서울
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
          <span>내 위치</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          <span>활동중</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
          <span>오프라인</span>
        </div>
        <div className="text-xs text-gray-500 mt-2 pt-2 border-t">
          💡 마커를 클릭하면 상세 정보를 볼 수 있어요
        </div>
      </div>
    </div>
  );
};

export default KakaoMap;
