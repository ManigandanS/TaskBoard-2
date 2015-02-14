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
    [RoutePrefix("api/projects")]
    public class ProjectsController : ApiController
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectsController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        [HttpPost]
        public string Create(ProjectModel project)
        {
            _projectRepository.Save(project);
            return project._id.ToString();
        }

        [Route("{id}")]
        [HttpGet]
        public ProjectModel GetById(string id)
        {
            return _projectRepository.GetById(new ObjectId(id));
        }

        [Route("user/{username}")]
        [HttpGet]
        public IEnumerable<ProjectModel> GetByOwner(string username)
        {
            return _projectRepository.GetByOwner(username);
        }

        [HttpPut]
        public string Update(ProjectModel project)
        {
           _projectRepository.Save(project);
           return project._id.ToString();
        }

        [Route("api/projects/{id}")]
        [HttpDelete]
        public string Delete(string id)
        {
            _projectRepository.Remove(new ProjectModel { _id = ObjectId.Parse(id) });
            return id;
        }
    }
}
