using System;
namespace reactchat.Models
{
    public class UserDetails
    {
        public string Name { get; set; }
        public string Id { get; internal set; }
        public string Password { get; set; }
        public string Token { get; set; }
    }
}
