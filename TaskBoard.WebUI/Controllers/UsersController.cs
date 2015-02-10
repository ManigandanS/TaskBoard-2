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

        [Route("/users/{login}")]
        [HttpGet]
        public UserModel Create(string login)
        {
            return _userRepository.GetByLogin(login);
        }

        [Route("/users/{login}")]
        [HttpGet]
        public UserModel Read(string login)
        {
            return _userRepository.GetByLogin(login);
        }

        [Route("/users/{login}")]
        [HttpGet]
        public UserModel Update(string login)
        {
            return _userRepository.GetByLogin(login);
        }

        [Route("/users/{login}")]
        [HttpGet]
        public UserModel Delete(string login)
        {
            return _userRepository.GetByLogin(login);
        }
    }
}
