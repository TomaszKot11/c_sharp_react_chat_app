using System;
using reactchat.Models;
using System.Security.Cryptography;
using System.Text;

namespace reactchat.Services
{
    public class PasswordService : IPasswordService
    {
        public bool VerifyHashedPassword(UserDetails user, string providedPassword)
        {
            // Hash the input.
            string hashOfInput = GetHash(providedPassword);

            // Create a StringComparer an compare the hashes.
            StringComparer comparer = StringComparer.OrdinalIgnoreCase;

            return 0 == comparer.Compare(hashOfInput, user.Password);

        }

        public string GetHash(string input)
        {
            using (MD5 md5Hash = MD5.Create())
            {

                // Convert the input string to a byte array and compute the hash.
                byte[] data = md5Hash.ComputeHash(Encoding.UTF8.GetBytes(input));

                // Create a new Stringbuilder to collect the bytes
                // and create a string.
                StringBuilder sBuilder = new StringBuilder();

                // Loop through each byte of the hashed data 
                // and format each one as a hexadecimal string.
                for (int i = 0; i < data.Length; i++)
                {
                    sBuilder.Append(data[i].ToString("x2"));
                }

                // Return the hexadecimal string.
                return sBuilder.ToString();
            }
        }

    }
}
