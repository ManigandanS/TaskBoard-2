using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskBoard.Repository.Models
{
    public class CommentModel
    {
        [BsonId]
        public ObjectId _id { get; set; }
        public string Comment { get; set; }
        public UserModel User { get; set; }
    }
}
