﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TaskBoard.Repository.Models;
using TaskBoard.Repository.Respositories.Abstract;

namespace TaskBoard.Repository.Respositories
{
    public interface IProjectRepository : IRepository<ProjectModel>
    {
        void AddTask(TaskModel task, string projectId);
        List<ProjectModel> GetByUser(string username);
        void UpdateTask(TaskModel task);
        void UpdateProject(ProjectModel project);
        void RemoveTask(string projectId, string taskId);
    }
}
