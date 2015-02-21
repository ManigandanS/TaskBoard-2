using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.IdGenerators;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskBoard.Repository.Models
{
    public class UserModel
    {
        [BsonId(IdGenerator = typeof(StringObjectIdGenerator))]
        public string _id { get; set; }
        public string Username { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public List<string> Roles { get; set; }

        public UserModel()
        {
            Roles = new List<string>();
        }
    }
}
