using System;
namespace reactchat.Models
{
    public class ChatMessage
    {
        public ChatMessage(Guid id)
        {
            Id = id.ToString();
        }

        public ChatMessage() { }

        public int ChatMessageId { get; set; }
        public string Id { get; set; }
        public DateTimeOffset Date { get; set; }
        public string Message { get; set; }
        public string Sender { get; set; }
    }
}
