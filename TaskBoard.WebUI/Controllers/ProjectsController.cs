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
    public class ProjectsController : ApiController
    {
        private readonly IProjectRepository _projectRepository;

        public ProjectsController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        [Route("/projects/{id}")]
        public HttpResponseMessage  Get(string id)
        {
            ObjectId _id;
            if (!ObjectId.TryParse(id, out _id))
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }
            ProjectModel pm = _projectRepository.GetById(_id);
            return Request.CreateResponse<ProjectModel>(
                statusCode: (null != pm) ? HttpStatusCode.OK : HttpStatusCode.NotFound,
                value: pm);
        }
    }
}
