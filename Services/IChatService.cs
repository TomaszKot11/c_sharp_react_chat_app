using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using reactchat.Models;

namespace reactchat.Services
{
    public interface IChatService
    {
        Task<IEnumerable<ChatMessage>> GetAllInitially();
        Task<ChatMessage> CreateNewMessage(string senderName, string message);
    }
}
