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
    [RoutePrefix("api/auth")]
    public class AuthController : ApiController
    {
        private readonly IUserRepository _userRepository;

        public AuthController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [Route("signup")]
        [HttpPost]
        public string SignUp(UserModel user)
        {
            _userRepository.Save(user);
            return user._id.ToString();
        }

        [Route("signin")]
        [HttpPost]
        public UserModel SignIn(UserModel user)
        {
            UserModel model = _userRepository.GetByLogin(user.Username);
            if (model.Password == user.Password)
            {
                model.Password = "";
                return model;
            }
            return null;
        }

        [Route("signout")]
        [HttpPost]
        public void SignOut()
        {

        }
    }
}
