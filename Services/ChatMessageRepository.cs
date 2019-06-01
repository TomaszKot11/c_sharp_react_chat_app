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

        public void AddMessage(ChatMessage message)
        {
             _chatMessages.Add(message);
            //throw new NotImplementedException();
            //return new Task((obj) => { return 1; };);
        }

        public IEnumerable<ChatMessage> GetTopMessages(int number = 100)
        {
            //throw new NotImplementedException();
            return _chatMessages.GetRange(0, number - 1);
        }
    }
}
