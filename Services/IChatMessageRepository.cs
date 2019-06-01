using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using reactchat.Models;

namespace reactchat.Services
{
    public interface IChatMessageRepository
    {
       Task AddMessage(ChatMessage message);
       Task<IEnumerable<ChatMessage>> GetTopMessages(int number = 100);
    }
}
