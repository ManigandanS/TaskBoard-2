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
        public ProjectModel Read(string id)
        {
            return _projectRepository.GetById(new ObjectId(id));
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

        [Route("api/projects/{id}/task")]
        [HttpPost]
        public string CreateTask(string id, TaskModel task)
        {
            task._id = ObjectId.GenerateNewId();
            _projectRepository.AddTask(task, id);
            return task._id.ToString();
        }

        [Route("api/projects/{id}/task")]
        [HttpPost]
        public string UpdateTask(string id, TaskModel task)
        {
            task._id = ObjectId.GenerateNewId();
            _projectRepository.UpdateTask(task);
            return task._id.ToString();
        }
    }
}
