"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectModel = void 0;
const database_1 = require("../config/database");
const logger_1 = require("../utils/logger");
class ProjectModel {
    static create(project) {
        const newProject = database_1.JsonDatabase.insert('projects', project);
        logger_1.logger.info(`Created project: ${project.name}`);
        return newProject;
    }
    static findById(id) {
        return database_1.JsonDatabase.findById('projects', id);
    }
    static findByName(name) {
        return database_1.JsonDatabase.findByField('projects', 'name', name);
    }
    static findAll() {
        const projects = database_1.JsonDatabase.get('projects');
        return projects.sort((a, b) => new Date(b.updated_at || b.created_at || '').getTime() -
            new Date(a.updated_at || a.created_at || '').getTime());
    }
    static findStale() {
        return database_1.JsonDatabase.findAllByField('projects', 'is_stale', 1);
    }
    static update(id, updates) {
        const updated = database_1.JsonDatabase.update('projects', id, {
            ...updates,
            updated_at: new Date().toISOString(),
        });
        if (updated) {
            logger_1.logger.info(`Updated project ${id}`);
        }
        return updated;
    }
    static delete(id) {
        const deleted = database_1.JsonDatabase.delete('projects', id);
        if (deleted) {
            logger_1.logger.info(`Deleted project ${id}`);
        }
        return deleted;
    }
}
exports.ProjectModel = ProjectModel;
//# sourceMappingURL=Project.js.map