
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSend: (message: string) => void;
}

const predefinedMessages = [
  { emoji: '🏃‍♂️', text: '지금 산책 나갑니다!', category: 'now' },
  { emoji: '🐕', text: '공원에 도착했어요!', category: 'now' },
  { emoji: '☕', text: '잠시 휴식 중이에요', category: 'now' },
  { emoji: '🏠', text: '집으로 돌아갑니다', category: 'now' },
  { emoji: '⏰', text: '30분 후에 나갈게요', category: 'later' },
  { emoji: '🌅', text: '아침 7시에 만나요', category: 'later' },
  { emoji: '🌆', text: '저녁 6시에 산책 나갈게요', category: 'later' },
  { emoji: '📅', text: '내일 같은 시간에 만나요', category: 'later' },
  { emoji: '😊', text: '반가워요!', category: 'social' },
  { emoji: '👋', text: '안녕히 가세요~', category: 'social' },
  { emoji: '🤝', text: '함께 산책해요', category: 'social' },
  { emoji: '📸', text: '사진 찍어드릴까요?', category: 'social' },
];

const MessageModal: React.FC<MessageModalProps> = ({ isOpen, onClose, onSend }) => {
  const [selectedCategory, setSelectedCategory] = useState<'now' | 'later' | 'social'>('now');
  const [customMessage, setCustomMessage] = useState('');

  const categories = [
    { id: 'now' as const, label: '지금', color: 'bg-green-500' },
    { id: 'later' as const, label: '나중에', color: 'bg-blue-500' },
    { id: 'social' as const, label: '인사', color: 'bg-purple-500' },
  ];

  const filteredMessages = predefinedMessages.filter(msg => msg.category === selectedCategory);

  const handleSendMessage = (message: string) => {
    if (message.trim()) {
      onSend(message);
      setCustomMessage('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span className="text-2xl">💬</span>
            <span>상태 메시지 보내기</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Category Tabs */}
          <div className="flex space-x-2">
            {categories.map(category => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? category.color : ''}
              >
                {category.label}
              </Button>
            ))}
          </div>

          {/* Predefined Messages */}
          <div className="space-y-2 max-h-60 overflow-y-auto">
            <p className="text-sm text-gray-600 font-medium">빠른 메시지</p>
            <div className="grid grid-cols-1 gap-2">
              {filteredMessages.map((message, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="justify-start h-auto p-3 text-left"
                  onClick={() => handleSendMessage(message.text)}
                >
                  <span className="text-lg mr-2">{message.emoji}</span>
                  <span className="text-sm">{message.text}</span>
                </Button>
              ))}
            </div>
          </div>

          {/* Custom Message */}
          <div className="space-y-2">
            <p className="text-sm text-gray-600 font-medium">직접 입력</p>
            <div className="flex space-x-2">
              <input
                type="text"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="메시지를 입력하세요..."
                className="flex-1 px-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleSendMessage(customMessage);
                  }
                }}
              />
              <Button
                onClick={() => handleSendMessage(customMessage)}
                disabled={!customMessage.trim()}
                className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600"
              >
                전송
              </Button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-2 pt-4 border-t border-gray-100">
            <Button variant="outline" onClick={onClose}>
              취소
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MessageModal;
