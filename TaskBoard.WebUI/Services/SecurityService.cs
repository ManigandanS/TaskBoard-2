using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Principal;
using System.Threading;
using System.Web;
using TaskBoard.Repository.Models;
using TaskBoard.Repository.Respositories;

namespace TaskBoard.WebUI.Services
{
    public class SecurityService : ISecurityService
    {
        private readonly string _secret;
        private readonly IUserRepository _userRepository;

        public UserModel CurrentUser { get; private set; }

        public SecurityService(string secret, IUserRepository userRepository)
        {
            _secret = secret;
            _userRepository = userRepository;
        }

        public bool Authorize(string token)
        {
            try 
            {
                IDictionary<string, object> claims = Decode(token);  
                IPrincipal principal = new ClaimsPrincipal(new ClaimsIdentity(claims.Select(c => new Claim(c.Key, c.Value.ToString()))));
                UserModel user = _userRepository.GetByLogin(principal.Identity.Name);
                if (null != user)
                {
                    CurrentUser = user;
                    HttpContext.Current.User = principal;
                    return true;
                }
                return false;
            }
            catch { return false; }
        }

        public string SignIn(string username, string password)
        {
            UserModel model = _userRepository.GetByLogin(username);
            if ((null != model) && (password == model.Password))
            {
                CurrentUser = model;
                ClaimsPrincipal principal = new ClaimsPrincipal(new ClaimsIdentity(new List<Claim>
                {
                    new Claim(ClaimTypes.NameIdentifier, model._id),
                    new Claim(ClaimTypes.Name, model.Username),
                    new Claim(ClaimTypes.Email, model.Email),
                    new Claim(ClaimTypes.GivenName, model.FullName)
                }));
                HttpContext.Current.User = principal;
                Thread.CurrentPrincipal = principal;
                return Encode(principal);
            }
            return null;
        }

        public void SignOut()
        {
            CurrentUser = null;
        }

        private IDictionary<string, object> Decode(string token)
        {
            return (IDictionary<string, object>)JWT.JsonWebToken.DecodeToObject(token, _secret);
        }

        private string Encode(ClaimsPrincipal principal)
        {
            IDictionary<string, object> claims = principal.Claims.ToList().ToDictionary(c => c.Type, c => (object)c.Value);
            return JWT.JsonWebToken.Encode(claims, _secret, JWT.JwtHashAlgorithm.HS256);
        }
    }
}