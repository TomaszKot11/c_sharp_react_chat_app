using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using reactchat.Helpers;
using reactchat.Models;

namespace reactchat.Services
{
    public class UserService : IUserService
    {
        private readonly AppSettings _appSettings;
        private readonly ChattingContext _context;

        public UserService(IOptions<AppSettings> appSettings, ChattingContext context)
        {
            _appSettings = appSettings.Value;
            _context = context;
        }

        public UserDetails Authenticate(string name, string password)
        {
            var user = _context.Users.SingleOrDefault((obj) => obj.Name == name && obj.Password == password);
            

            // return null if user not found
            if (user == null)
                return null;

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.UserDetailsId.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            // save the token to the databasex
            _context.SaveChangesAsync();

            // remove password before returning
            user.Password = null;

            return user;
        }

        public IEnumerable<UserDetails> GetAll()
        {
            // return users without passwords
            //TODO: do not return the password
            return _context.Users.Select((arg) => arg).ToList();
        }
    }
}
