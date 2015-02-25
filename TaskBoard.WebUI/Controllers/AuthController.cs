using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaskBoard.Repository.Models;
using TaskBoard.Repository.Respositories;
using TaskBoard.WebUI.Services;

namespace TaskBoard.WebUI.Controllers
{
    [RoutePrefix("api/auth")]
    public class AuthController : ApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly ISecurityService _securityService;

        public AuthController(IUserRepository userRepository, ISecurityService securityService)
        {
            _userRepository = userRepository;
            _securityService = securityService;
        }

        [Route("signup")]
        [HttpPost]
        public object SignUp(UserModel user)
        {
            _userRepository.Save(user);
            return SignIn(user);
        }

        [Route("signin")]
        [HttpPost]
        public HttpResponseMessage SignIn(UserModel user)
        {
            string token = _securityService.SignIn(user.Username, user.Password);
            if (null == token)
            {
                return Request.CreateErrorResponse(HttpStatusCode.Unauthorized, "Unauthorized");
            }
            return Request.CreateResponse( new {
                user = _securityService.CurrentUser,
                token = token
            });
        }

        [Route("signout")]
        [HttpPost]
        public void SignOut()
        {
            _securityService.SignOut();
        }
    }
}
