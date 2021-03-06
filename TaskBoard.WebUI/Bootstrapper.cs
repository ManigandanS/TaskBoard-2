using System.Web.Mvc;
using Microsoft.Practices.Unity;
using Unity.Mvc4;
using Unity.WebApi;
using System.Web.Http;
using System.Configuration;
using TaskBoard.Repository.Respositories;
using TaskBoard.WebUI.Services;

namespace TaskBoard.WebUI
{
    public static class Bootstrapper
    {
        public static IUnityContainer Initialize()
        {
            var mvcContainer = BuildUnityMvcContainer();
            var webApiContainer = BuildUnityWebApiContainer();

            DependencyResolver.SetResolver(new Unity.Mvc4.UnityDependencyResolver(mvcContainer));
            GlobalConfiguration.Configuration.DependencyResolver = new Unity.WebApi.UnityDependencyResolver(webApiContainer);

            return mvcContainer;
        }

        private static IUnityContainer BuildUnityMvcContainer()
        {
            var container = new UnityContainer();

            RegisterMvcTypes(container);

            return container;
        }

        public static void RegisterMvcTypes(IUnityContainer container)
        {

        }

        private static IUnityContainer BuildUnityWebApiContainer()
        {
            var container = new UnityContainer();
            RegisterWebApiTypes(container);

            return container;
        }

        public static void RegisterWebApiTypes(IUnityContainer container)
        {
            var connectionString = ConfigurationManager.ConnectionStrings["Taskboard"].ConnectionString;
            var secret = ConfigurationManager.AppSettings["secret"];

            container.RegisterType<IProjectRepository, ProjectRepository>(new InjectionConstructor(connectionString));
            container.RegisterType<IUserRepository, UserRepository>(new InjectionConstructor(connectionString));
            container.RegisterType<ISecurityService, SecurityService>(new InjectionConstructor(secret, new ResolvedParameter<IUserRepository>()));
        }
    }
}