import { JsonDatabase } from '../config/database.js';
import { logger } from '../utils/logger.js';
export class ProjectModel {
    static create(project) {
        const newProject = JsonDatabase.insert('projects', project);
        logger.info(`Created project: ${project.name}`);
        return newProject;
    }
    static findById(id) {
        return JsonDatabase.findById('projects', id);
    }
    static findByName(name) {
        return JsonDatabase.findByField('projects', 'name', name);
    }
    static findAll() {
        const projects = JsonDatabase.get('projects');
        return projects.sort((a, b) => new Date(b.updated_at || b.created_at || '').getTime() -
            new Date(a.updated_at || a.created_at || '').getTime());
    }
    static findStale() {
        return JsonDatabase.findAllByField('projects', 'is_stale', 1);
    }
    static update(id, updates) {
        const updated = JsonDatabase.update('projects', id, {
            ...updates,
            updated_at: new Date().toISOString(),
        });
        if (updated) {
            logger.info(`Updated project ${id}`);
        }
        return updated;
    }
    static delete(id) {
        const deleted = JsonDatabase.delete('projects', id);
        if (deleted) {
            logger.info(`Deleted project ${id}`);
        }
        return deleted;
    }
}
//# sourceMappingURL=Project.js.map