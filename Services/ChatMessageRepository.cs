using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using reactchat.Models;

namespace reactchat.Services
{
    public class ChatMessageRepository : IChatMessageRepository
    {
        private List<ChatMessage> _chatMessages;

        public ChatMessageRepository()
        {
            _chatMessages = new List<ChatMessage>();
        }

        public Task AddMessage(ChatMessage message)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<ChatMessage>> GetTopMessages(int number = 100)
        {
            throw new NotImplementedException();
        }
    }
}
