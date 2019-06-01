using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using reactchat.Models;

namespace reactchat.Services
{
    public interface IChatMessageRepository
    {
       void AddMessage(ChatMessage message);
       IEnumerable<ChatMessage> GetTopMessages(int number = 100);
    }
}
