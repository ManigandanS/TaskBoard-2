using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskBoard.Repository.Models;
using TaskBoard.Repository.Respositories.Abstract;

namespace TaskBoard.Repository.Respositories
{
    public class ProjectRepository : Repository<ProjectModel>, IProjectRepository
    {
        public ProjectRepository(string connectionString)
            : base(connectionString, "taskboard", "projects") { }

        public void AddTask(TaskModel task, string projectId)
        {
            task._id = ObjectId.GenerateNewId().ToString();
            Collection.Update(
                Query<ProjectModel>.EQ(p => p._id, projectId),
                Update<ProjectModel>.AddToSet(p => p.Tasks, task));
        }

        public void UpdateTask(TaskModel task)
        {
            Collection.Update(
                Query.EQ("Tasks._id", task._id),
                Update.SetWrapped<TaskModel>("Tasks.$", task));
        }

        public override void Remove(ProjectModel model)
        {
            Collection.Remove(Query<ProjectModel>.EQ(t => t._id, model._id), RemoveFlags.None);
        }

        public void RemoveTask(string projectId, string taskId)
        {
            Collection.Update(
                Query<ProjectModel>.EQ(p => p._id, projectId),
                Update.PullWrapped("Tasks", 
                    Query<TaskModel>.EQ(t => t._id,  taskId)
                )
            );
        }


        public List<ProjectModel> GetByUser(string username)
        {
            return Get(
                query: Query.EQ("Participants.Username", username),
                skip: 0 ,
                take: int.MaxValue);
        }
    }
}
