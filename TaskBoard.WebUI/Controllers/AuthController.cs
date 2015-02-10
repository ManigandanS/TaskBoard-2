using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaskBoard.Repository.Models;
using TaskBoard.Repository.Respositories;

namespace TaskBoard.WebUI.Controllers
{
    public class AuthController : ApiController
    {
        private readonly IUserRepository _userRepository;

        public AuthController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [Route("/auth/signup")]
        [HttpPost]
        public string SignUp(UserModel user)
        {
            _userRepository.Save(user);
            return user._id.ToString();
        }

        [Route("auth/signin")]
        [HttpPost]
        public UserModel SignIn(string login, string password)
        {
            UserModel user = _userRepository.GetByLogin(login);
            if(user.Password == password)
            {
                user.Password = "";
                return user;
            }
            return null;
        }

        [Route("auth/signout")]
        [HttpPost]
        public void SignOut()
        {

        }
    }
}
