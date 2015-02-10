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
        [HttpPost]
        public HttpResponseMessage Create(ProjectModel project)
        {
            HttpResponseMessage res = null;
            try
            {
                _projectRepository.Save(project);
                res = Request.CreateResponse<string>(project._id.ToString());
            }
            catch (Exception err) { res = Request.CreateErrorResponse(HttpStatusCode.InternalServerError, err.Message); }
            return res;
        }

        [Route("/projects/{id}")]
        [HttpGet]
        public HttpResponseMessage Read(string id)
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

        [Route("/projects/{id}")]
        [HttpPut]
        public HttpResponseMessage Update(ProjectModel project)
        {
            HttpResponseMessage res = null;
            try
            {
                _projectRepository.Save(project);
                res = Request.CreateResponse<string>(project._id.ToString());
            }
            catch (Exception err) { res = Request.CreateErrorResponse(HttpStatusCode.InternalServerError, err.Message); }
            return res;
        }

        [Route("/projects/{id}")]
        [HttpDelete]
        public HttpResponseMessage Delete(string id)
        {
            HttpResponseMessage res = null;
            ObjectId _id;
            if (!ObjectId.TryParse(id, out _id)) { res = Request.CreateErrorResponse(HttpStatusCode.NotFound, "Wrong id"); }
            try
            {
                _projectRepository.Remove(new ProjectModel { _id = _id });
                res = Request.CreateResponse<string>(id);
            }
            catch (Exception err) { res = Request.CreateErrorResponse(HttpStatusCode.InternalServerError, err.Message); }
            return res;
        }
    }
}
