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
    public class UsersController : ApiController
    {
        private readonly IUserRepository _userRepository;

        public UsersController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [Route("api/users/{login}")]
        [HttpGet]
        public UserModel Get(string login)
        {
            return _userRepository.GetByLogin(login);
        }

        [Route("api/users/exists/{login}")]
        [HttpGet]
        public HttpResponseMessage IsExists(string login)
        {
            UserModel user = _userRepository.GetByLogin(login);
            return (null != user)
                ? Request.CreateErrorResponse(HttpStatusCode.Conflict, login)
                : Request.CreateResponse<string>(HttpStatusCode.OK, login);
        }
    }
}
