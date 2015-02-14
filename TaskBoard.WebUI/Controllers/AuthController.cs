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
        public UserModel SignUp(UserModel user)
        {
            var project = new ProjectModel
            {
                Owner = new UserModel
                {
                    Username = user.Username,
                    FullName = user.FullName
                },
                Participants = new List<UserModel>
                {
                    new UserModel
                    {
                        Username = user.Username,
                        FullName = user.FullName
                    }
                },
                Title = "Project",
                Description = "Description",
                _id = ObjectId.GenerateNewId()
            };
            _userRepository.Save(user);
            _projectRepository.Save(project);
            user.Password = "";
            return user;
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
