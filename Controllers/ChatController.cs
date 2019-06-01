using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using reactchat.Models;
using reactchat.Services;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace reactchat.Controllers
{
    [Route("api/[controller]")]
    public class ChatController : Controller
    {

        private readonly IChatService _chatService;

        public ChatController(IChatService chatService)
        {
            _chatService = chatService;
        }


        [HttpGet("[action]")]
        public IEnumerable<UserDetails> LoggedOnUsers()
        {
            return new[]
            {
                new UserDetails { Id = "1", Name = "Joe" },
                new UserDetails { Id = "2", Name = "Mary" },
                new UserDetails { Id = "3", Name = "Pete" },
                new UserDetails { Id = "4", Name = "Mo" }
            };
        }

        [HttpGet("[action]")]
        public IEnumerable<ChatMessage> InitialMessages()
        {
            // return _chatService.GetAllInitially();
            return new List<ChatMessage>()
            {
               ChatMessageFactory(),
               ChatMessageFactory(),
               ChatMessageFactory()
            };
        }

        // temporary 
        private ChatMessage ChatMessageFactory()
        {
            String[] sampleMessages = new String[]
            {
                "Hello :)",
                "Bye :)",
                "What's up?",
                "Everything ok",
                "It's beautiful day, isn't it?"
            };

            ChatMessage chatMessage = new ChatMessage(Guid.NewGuid());
            chatMessage.Message = sampleMessages[(new Random()).Next(0, sampleMessages.Length)];

            return chatMessage;
        }

    }
}
