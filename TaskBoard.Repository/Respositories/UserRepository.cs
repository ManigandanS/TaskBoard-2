﻿using MongoDB.Driver;
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
    public class UserRepository : Repository<UserModel>, IUserRepository
    {
        public UserRepository(string connectionString)
            : base(connectionString, "taskboard", "users") { }

        public override void Remove(UserModel model)
        {
            Collection.Remove(Query<UserModel>.EQ(t => t._id, model._id), RemoveFlags.None);
        }

        public UserModel GetByLogin(string login)
        {
            return GetOne(
                Query.Or(
                    Query<UserModel>.EQ(u => u.Username, login),
                    Query<UserModel>.EQ(u => u.Email, login)));
        }
    }
}