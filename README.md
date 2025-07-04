# paw-track

# 🐶 페르소나 정의

## 1. 김민수 (29세, 유튜브 크리에이터, 강아지 '콩이' 보호자)

- **배경**: 재택근무가 많아 낮 시간에 강아지와 자주 산책함

- **문제**:
  - 자주 산책 나오는 이웃이 있지만, 정확히 누가 있는지 알 수 없음
  - 우연히 마주쳐도 서로 연락처를 따로 교환하지 않음

- **욕구**:
  - 지금 누가 공원에 나와 있는지 알고 싶음
  - “오늘 3시에 나갈게요~” 같은 가벼운 메시지를 보내고 싶음

## 2. 배용남 (42세, 고기집 사장, 강아지 '라떼' 보호자)

- **배경**: 주방을 마감하고, 저녁 7시쯤 산책 나감

- **문제**:
  - 사교적인 강아지를 위해 친구들을 만들어 주고 싶으나, 동네 강아지가 어디에 있는지 알 수 없음

- **욕구**:
  - 실시간으로 상대방 위치 확인 가능
  - 최소한의 대화만으로 다시 만날 수 있으면 좋겠음

 ## 3. 정재혁 (42세, 백엔드 개발자, 강아지 '솜이' 보호자)

- **배경**: 퇴근 후, 저녁 8시쯤 산책 나감

- **문제**:
  - 낯가림이 많은 강아지를 위해 강아지가 없는 한적한 곳에서 산책을 하고 싶으나, 강아지가 없는 곳을 알 수 없음.

- **욕구**:
  - 실시간으로 상대방 위치 확인 가능

# 🐾 사용자 스토리

## Epic 1: 위치 공유

### 🧍‍♀️ 사용자 스토리 1
**“나는 공원에 도착하면, 다른 사람들이 있는지 보고 싶다.”**
- Given: 사용자가 앱에 접속함
- When: 위치 공유 기능을 활성화함
- Then: 지도에서 현재 위치와 다른 사용자들의 위치가 보임

---

### 🧍‍♂️ 사용자 스토리 2
**“나는 나갈 예정이면, 그걸 간단하게 알리고 싶다.”**

- Given: 사용자가 집에 있음
- When: '오늘 5시에 갈게요!' 메세지 전송
- Then: 다른 사용자들에게 메시지가 전송됨

---

## Epic 2: 메시지 교환

### 사용자 스토리 3
**“나는 너무 복잡한 채팅 말고, 간단한 한마디만 보내고 싶다.”**

- Given: 사용자가 산책 중임
- When: “왔어요~” 메시지를 전송
- Then: 다른 사용자들에게 메시지가 전송됨

---
## Epic 3: 연결 유지

### 사용자 스토리 4
**“나는 자주 보는 사람들을 따로 친구처럼 등록하고 싶다.”**

- Given: 사용자가 특정 유저를 자주 만남
- When: '즐겨찾기' 등록
- Then: 그 유저가 활동 중이면 상단에 표시됨


# 배포 url
https://paw-pal-beacon.lovable.app/
