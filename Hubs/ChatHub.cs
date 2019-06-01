using System;
using Microsoft.AspNetCore.SignalR;
using reactchat.Services;

namespace reactchat.Hubs
{
    // defines the websocket (channel) through which the data 
    // is being transformed
    public class ChatHub : Hub
    {
        private readonly IChatService _chatService;

        public ChatHub(IChatService chatService) 
        {
            _chatService = chatService;
        }

        public void AddMessage(string message)
        {

            var chatMessage = _chatService.CreateNewMessage("Juergen", message);
            Clients.All.SendAsync("MessageAdded", chatMessage);
        }
    }
}
