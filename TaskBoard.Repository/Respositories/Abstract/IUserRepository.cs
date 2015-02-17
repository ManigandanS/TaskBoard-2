using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskBoard.Repository.Models;
using TaskBoard.Repository.Respositories.Abstract;

namespace TaskBoard.Repository.Respositories
{
    public interface IUserRepository : IRepository<UserModel>
    {
        UserModel GetByLogin(string login);
        List<UserModel> Find(string query);
    }
}
