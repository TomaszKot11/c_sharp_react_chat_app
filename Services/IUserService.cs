using System;
using System.Collections.Generic;
using reactchat.Models;

namespace reactchat.Services
{
    public interface IUserService
    {
        UserDetails Authenticate(string username, string password);
        IEnumerable<UserDetails> GetAll();
    }
}
