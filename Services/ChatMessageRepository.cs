using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using reactchat.Models;
using System.Linq;

namespace reactchat.Services
{
    public class ChatMessageRepository : IChatMessageRepository
    {
        private readonly ChattingContext _context;

        public ChatMessageRepository(ChattingContext context)
        {
            _context = context;
        }

        public void AddMessage(ChatMessage message)
        {
            _context.Add(message);
            _context.SaveChangesAsync();
        }

        public IEnumerable<ChatMessage> GetTopMessages(int number = 100)
        {
            return _context.Messages.Select((arg) => arg).ToList();
        }
    }
}
