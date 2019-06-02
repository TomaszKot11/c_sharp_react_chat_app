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
        private readonly IUserService _userService;

        public ChatController(IChatService chatService, IUserService userService)
        {
            _chatService = chatService;
            _userService = userService;
        }


        [HttpGet("[action]")]
        public IEnumerable<UserDetails> LoggedOnUsers()
        {
            return _userService.GetAll();
          
            //return new[]
            ///{
               // new UserDetails { Id = "1", Name = "Joe" },
                //new UserDetails { Id = "2", Name = "Mary" },
                //new UserDetails { Id = "3", Name = "Pete" },
                //new UserDetails { Id = "4", Name = "Mo" }
            //};
        }

        [HttpGet("[action]")]
        public IEnumerable<ChatMessage> InitialMessages()
        {
            return _chatService.GetAllInitially();
        }

        [HttpPost("[action]")]
        public IActionResult Authenticate([FromBody]UserDetails userParam)
        {
            var user = _userService.Authenticate(userParam.Name, userParam.Password);

            if (user == null)
                return BadRequest(new { message = "Username or password is incorrect" });

            return Ok(user);
        }
    }
}
