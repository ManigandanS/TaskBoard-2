using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TaskBoard.Repository.Models;
using TaskBoard.Repository.Respositories;

namespace TaskBoard.WebUI.Services
{
    public class SecurityService
    {
        private readonly string _secret;
        private readonly IUserRepository _userRepository;

        public SecurityService(string secret, IUserRepository userRepository)
        {
            _secret = secret;
            _userRepository = userRepository;
        }

        public bool CheckCredentials(string token)
        {
            if (!CheckToken(token)) { return false; }
            Dictionary<string, string> claims = Decode(token);
            return true;
        }

        public bool CheckToken(string token)
        {
            Dictionary<string, string> claims = Decode(token);
            return (null != claims && claims.ContainsKey("username"));
        }

        public Dictionary<string, string> Decode(string token)
        {
            try { return JWT.JsonWebToken.DecodeToObject(token, _secret) as Dictionary<string, string>; }
            catch (JWT.SignatureVerificationException) { return null; }
        }

        public string Encode(Dictionary<string, string> claims)
        {
            return JWT.JsonWebToken.Encode(claims, _secret, JWT.JwtHashAlgorithm.HS256);
        }
    }
}