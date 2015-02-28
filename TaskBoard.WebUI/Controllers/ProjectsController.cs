using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using TaskBoard.Repository.Models;
using TaskBoard.Repository.Respositories;
using TaskBoard.WebUI.ActionFilters;

namespace TaskBoard.WebUI.Controllers
{
    [RoutePrefix("api/projects")]
    [JwtAuthorize]
    public class ProjectsController : ApiController
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectsController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        
        [HttpPost]
        [Route("")]
        public ProjectModel Create(ProjectModel project)
        {
            _projectRepository.Save(project);
            return project;
        }

        
        [HttpGet]
        [Route("{id}")]
        public ProjectModel GetById(string id)
        {
            return _projectRepository.GetById(new ObjectId(id));
        }
        
        [HttpGet]
        [Route("user/{username}")]
        public IEnumerable<ProjectModel> GetByUser(string username)
        {
            return _projectRepository.GetByUser(username);
        }

        [HttpPut]
        public string Update(ProjectModel project)
        {
           _projectRepository.Save(project);
           return project._id.ToString();
        }
        
        [HttpDelete]
        [Route("{id}")]
        public string Delete(string id)
        {
            _projectRepository.Remove(new ProjectModel { _id = id });
            return id;
        }
    }
}
