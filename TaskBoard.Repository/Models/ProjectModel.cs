using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskBoard.Repository.Models
{
    public class ProjectModel
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public ObjectId _id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public List<TaskModel> Tasks { get; set; }
        public List<UserModel> Participants { get; set; }
        public List<ColumnModel> Columns { get; set; }
        public UserModel Owner { get; set; }
        

        public ProjectModel()
        {
            Tasks = new List<TaskModel>();
            Participants = new List<UserModel>();
            Columns = new List<ColumnModel>();
        }
    }
}
