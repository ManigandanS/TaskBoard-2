using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Web;
using TaskBoard.Repository.Models;
using TaskBoard.Repository.Respositories;

namespace TaskBoard.WebUI.Services
{
    public class SecurityService : ISecurityService
    {
        private readonly string _secret;
        private readonly IUserRepository _userRepository;

        public SecurityService(string secret, IUserRepository userRepository)
        {
            _secret = secret;
            _userRepository = userRepository;
        }

        public bool Authorize(string token)
        {
            Dictionary<string, string> claims = Decode(token);
                return (null != claims
                    && null != HttpContext.Current.User.Identity.Name
                    && claims.ContainsKey(ClaimTypes.Name)
                    && claims[ClaimTypes.Name] == HttpContext.Current.User.Identity.Name);
            
        }

        public string SignIn(string username, string password)
        {
            UserModel model = _userRepository.GetByLogin(username);
            if (password == model.Password)
            {
                ClaimsPrincipal principal = new ClaimsPrincipal(new ClaimsIdentity(new List<Claim>
                {
                    new Claim(ClaimTypes.Name, model.Username),
                    new Claim(ClaimTypes.Email, model.Email),
                    new Claim(ClaimTypes.GivenName, model.FullName)
                }));
                HttpContext.Current.User = principal;
                return Encode(principal);
            }
            return null;
        }

        private void RefreshPrincipal(string token)
        {
            Dictionary<string, string> claims = Decode(token);
            HttpContext.Current.User = new ClaimsPrincipal(new ClaimsIdentity(claims.Select(c => new Claim(c.Key, c.Value))));
        }

        private Dictionary<string, string> Decode(string token)
        {
            try { return JWT.JsonWebToken.DecodeToObject(token, _secret) as Dictionary<string, string>; }
            catch (JWT.SignatureVerificationException) { return null; }
        }

        private string Encode(ClaimsPrincipal principal)
        {
            Dictionary<string, string> claims = principal.Claims.ToList().ToDictionary(c => c.Type, c => c.Value);
            return JWT.JsonWebToken.Encode(claims, _secret, JWT.JwtHashAlgorithm.HS256);
        }
    }
}