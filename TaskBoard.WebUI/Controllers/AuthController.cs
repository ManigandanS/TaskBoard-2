using MongoDB.Bson;
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

        // temporaty
        private readonly IProjectRepository _projectRepository;

        public AuthController(IUserRepository userRepository, IProjectRepository projectRepository)
        {
            _userRepository = userRepository;
            _projectRepository = projectRepository;
        }

        [Route("signup")]
        [HttpPost]
        public object SignUp(UserModel user)
        {
            _userRepository.Save(user);
            return new
            {
                user = user,
                token = "123456789"
            };
        }

        [Route("signin")]
        [HttpPost]
        public HttpResponseMessage SignIn(UserModel user)
        {
            UserModel model = _userRepository.GetByLogin(user.Username);
            if (model.Password == user.Password)
            {
                return Request.CreateResponse<object>( new
                {
                    user = model,
                    token = "123456789"
                });
            }
            return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Unauthorized");
        }

        [Route("signout")]
        [HttpPost]
        public void SignOut()
        {

        }
    }
}
