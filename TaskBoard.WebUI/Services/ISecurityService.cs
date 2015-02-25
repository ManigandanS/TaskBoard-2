using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using TaskBoard.Repository.Models;

namespace TaskBoard.WebUI.Services
{
    public interface ISecurityService
    {
        bool Authorize(string token);
        string SignIn(string username, string password);
        void SignOut();
        UserModel CurrentUser { get; }
    }
}