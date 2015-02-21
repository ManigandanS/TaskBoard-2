using System.Web;
using System.Web.Mvc;
using TaskBoard.WebUI.ActionFilters;

namespace TaskBoard.WebUI
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
            //filters.Add(new JwtAuthorizeAttribute());
        }
    }
}