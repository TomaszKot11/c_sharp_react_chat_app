using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using reactchat.Models;
using System.Linq;

namespace reactchat.Services
{
    public class ChatService : IChatService
    {
        private readonly IChatMessageRepository _repository;

        public ChatService(IChatMessageRepository repository)
        {
            _repository = repository;
        }

        public  ChatMessage CreateNewMessage(string senderName, string message)
        {
            var chatMessage = new ChatMessage(Guid.NewGuid())
            {
                Sender = senderName,
                Message = message
            };

            _repository.AddMessage(chatMessage);

            return chatMessage;
        }

        public IEnumerable<ChatMessage> GetAllInitially()
        {
            return _repository.GetTopMessages();
        }
    }
}
