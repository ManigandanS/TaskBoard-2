using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TaskBoard.WebUI.Services
{
    public interface ISecurityService
    {
        bool Authorize(string token);
        string SignIn(string username, string password);
    }
}