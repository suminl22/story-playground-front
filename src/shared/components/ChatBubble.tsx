import React from 'react';

interface ChatBubbleProps {
  message: string;
  isUser: boolean;
}

class ChatBubble extends React.Component<ChatBubbleProps> {
  render() {
    const { message, isUser } = this.props;
    const className = isUser ? 'message user-message' : 'message computer-message';

    return (
      <div className={className}>
        {message}
      </div>
    );
  }
}

export default ChatBubble;
