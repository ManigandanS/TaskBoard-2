using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
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

        public JwtAuthorizeAttribute()
        {
            _securityService = (ISecurityService)GlobalConfiguration.Configuration.DependencyResolver.GetService(typeof(ISecurityService));
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            if (!_securityService.Authorize(actionContext.Request.Headers.Authorization.Scheme))
            {
                actionContext.Response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
            }            
        }
    }
}