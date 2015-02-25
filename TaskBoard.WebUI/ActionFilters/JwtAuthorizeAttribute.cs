using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;
using TaskBoard.WebUI.Services;

namespace TaskBoard.WebUI.ActionFilters
{
    public class JwtAuthorizeAttribute : AuthorizationFilterAttribute
    {
        private readonly ISecurityService _securityService;
        public override void OnAuthorization(HttpActionContext actionContext)
        {
            //Perform your logic here
            base.OnAuthorization(actionContext);
        }
    }
}