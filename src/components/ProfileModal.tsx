
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface User {
  id: string;
  name: string;
  dogName: string;
  dogBreed: string;
  status: string;
}

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  onSave: (user: User) => void;
}

const dogBreeds = [
  '골든리트리버', '시바견', '푸들', '치와와', '닥스훈트', '보더콜리',
  '비글', '허스키', '말티즈', '요크셔테리어', '불독', '코기', '믹스', '기타'
];

const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose, user, onSave }) => {
  const [formData, setFormData] = useState(user);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleChange = (field: keyof User, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span className="text-2xl">👤</span>
            <span>프로필 수정</span>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Profile Avatar */}
          <div className="flex justify-center">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-white text-3xl">🐕</span>
            </div>
          </div>

          {/* User Name */}
          <div className="space-y-2">
            <Label htmlFor="userName">내 이름</Label>
            <Input
              id="userName"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="이름을 입력하세요"
            />
          </div>

          {/* Dog Name */}
          <div className="space-y-2">
            <Label htmlFor="dogName">반려견 이름</Label>
            <Input
              id="dogName"
              value={formData.dogName}
              onChange={(e) => handleChange('dogName', e.target.value)}
              placeholder="반려견 이름을 입력하세요"
            />
          </div>

          {/* Dog Breed */}
          <div className="space-y-2">
            <Label htmlFor="dogBreed">견종</Label>
            <select
              id="dogBreed"
              value={formData.dogBreed}
              onChange={(e) => handleChange('dogBreed', e.target.value)}
              className="w-full px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            >
              {dogBreeds.map(breed => (
                <option key={breed} value={breed}>{breed}</option>
              ))}
            </select>
          </div>

          {/* Status Message */}
          <div className="space-y-2">
            <Label htmlFor="status">상태 메시지</Label>
            <Input
              id="status"
              value={formData.status}
              onChange={(e) => handleChange('status', e.target.value)}
              placeholder="상태 메시지를 입력하세요"
            />
          </div>

          {/* Dog Info Tips */}
          <div className="bg-orange-50 p-3 rounded-lg">
            <p className="text-xs text-orange-700">
              💡 <strong>팁:</strong> 반려견의 성격이나 특징을 상태 메시지에 적어보세요!
              (예: "활발한 아이라 친구들을 좋아해요", "조용한 산책을 선호해요")
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100">
            <Button type="button" variant="outline" onClick={onClose}>
              취소
            </Button>
            <Button 
              type="submit"
              className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600"
            >
              저장
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileModal;
