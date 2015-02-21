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
    [RoutePrefix("api/projects/{projectId}")]
    [JwtAuthorize]
    public class TasksController : ApiController
    {
        private readonly IProjectRepository _projectRepository;

        public TasksController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        [HttpPost]
        [Route("task")]
        public TaskModel Create(string projectId, TaskModel task)
        {
            _projectRepository.AddTask(task, projectId);
            return task;
        }

        [HttpPut]
        [Route("task")]
        public TaskModel Update(string projectId, TaskModel task)
        {
            _projectRepository.UpdateTask(task);
            return task;
        }

        [HttpDelete]
        [Route("task/{taskId}")]
        public string Delete(string projectId, string taskId)
        {
            _projectRepository.RemoveTask(projectId, taskId);
            return taskId;
        }
    }
}
