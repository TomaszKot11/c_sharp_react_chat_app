using System;
using reactchat.Models;

namespace reactchat.Services
{
    public interface IPasswordService
    {
        bool VerifyHashedPassword(UserDetails user, string providedPassword);
        string GetHash(string input);
    }
}
