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
    public class FakeUserRepository : IUserRepository
    {
        private static List<UserModel> __users = new List<UserModel>();

        public UserModel GetByLogin(string login)
        {
            return __users.Where(u => u.Email == login || u.Username == login).FirstOrDefault();
        }

        public List<UserModel> Get(MongoDB.Driver.IMongoQuery query, int skip, int take)
        {
            throw new NotImplementedException();
        }

        public UserModel GetById(MongoDB.Bson.ObjectId id)
        {
            throw new NotImplementedException();
        }

        public UserModel GetOne(MongoDB.Driver.IMongoQuery query)
        {
            throw new NotImplementedException();
        }

        public long Count(MongoDB.Driver.IMongoQuery query)
        {
            throw new NotImplementedException();
        }

        public List<UserModel> GetAll()
        {
            throw new NotImplementedException();
        }

        public void InsertRange(IEnumerable<UserModel> models)
        {
            throw new NotImplementedException();
        }

        public void Save(UserModel model)
        {
            UserModel old = __users.Where(u => model._id == u._id).FirstOrDefault();
            if (null != old)
            {
                __users.Remove(old);
                __users.Add(model);
            }
            else if (model._id == ObjectId.Empty)
            {
                model._id = ObjectId.GenerateNewId();
                __users.Add(model);
            }            
        }

        public void RemoveAll()
        {
            throw new NotImplementedException();
        }

        public void Remove(UserModel model)
        {
            throw new NotImplementedException();
        }


        public List<UserModel> Find(string query)
        {
            return __users
                .Where(u => u.Username.Contains(query) || u.Email.Contains(query) || u.FullName.Contains(query))
                .ToList();
        }
    }
}
