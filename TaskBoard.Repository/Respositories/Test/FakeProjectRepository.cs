using MongoDB.Bson;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskBoard.Repository.Models;
using TaskBoard.Repository.Respositories.Abstract;

namespace TaskBoard.Repository.Respositories
{
    public class FakeProjectRepository : IProjectRepository
    {
        private static List<ProjectModel> __projects = new List<ProjectModel>();

        public void AddTask(TaskModel task, string projectId)
        {
            ProjectModel project = __projects.Where(p => p._id == projectId).First();
            task._id = ObjectId.GenerateNewId().ToString();
            project.Tasks.Add(task);
        }

        public void UpdateTask(TaskModel task)
        {
            ProjectModel project = __projects.Where(p => p.Tasks.Any(t => t._id == task._id)).First();
            TaskModel old = project.Tasks.Where(t => t._id == task._id).First();
            project.Tasks.Remove(old);
            project.Tasks.Add(task);
        }

        public void RemoveTask(string projectId, string taskId)
        {
            //ProjectModel project = __projects.Where(p => p.Tasks.Any(t => t._id == model._id)).First();
            //TaskModel old = project.Tasks.Where(t => t._id == model._id).First();
            //project.Tasks.Remove(old);
        }

        public List<ProjectModel> Get(MongoDB.Driver.IMongoQuery query, int skip, int take)
        {
            throw new NotImplementedException();
        }

        public ProjectModel GetById(MongoDB.Bson.ObjectId id)
        {
            throw new NotImplementedException();
        }

        public ProjectModel GetOne(MongoDB.Driver.IMongoQuery query)
        {
            throw new NotImplementedException();
        }

        public long Count(MongoDB.Driver.IMongoQuery query)
        {
            throw new NotImplementedException();
        }

        public List<ProjectModel> GetAll()
        {
            throw new NotImplementedException();
        }

        public void InsertRange(IEnumerable<ProjectModel> models)
        {
            throw new NotImplementedException();
        }

        public void Save(ProjectModel model)
        {
            model._id = ObjectId.GenerateNewId().ToString();
            __projects.Add(model);
        }

        public void RemoveAll()
        {
            throw new NotImplementedException();
        }

        public void Remove(ProjectModel model)
        {
            throw new NotImplementedException();
        }


        public List<ProjectModel> GetByUser(string username)
        {
            return __projects.Where(p => p.Participants.Any(u => u.Username == username)).ToList();
        }
    }
}
