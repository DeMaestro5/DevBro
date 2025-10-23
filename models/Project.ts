import { JsonDatabase } from '../config/database';
import { logger } from '../utils/logger';

export interface Project {
  id?: number;
  name: string;
  repo_url?: string;
  language?: string | null;
  last_commit_date?: string | null;
  is_stale: number;
  created_at?: string;
  updated_at?: string;
}

export class ProjectModel {
  static create(
    project: Omit<Project, 'id' | 'created_at' | 'updated_at'>,
  ): Project {
    const newProject = JsonDatabase.insert('projects', project);
    logger.info(`Created project: ${project.name}`);
    return newProject;
  }

  static findById(id: number): Project | null {
    return JsonDatabase.findById('projects', id);
  }

  static findByName(name: string): Project | null {
    return JsonDatabase.findByField('projects', 'name', name);
  }

  static findAll(): Project[] {
    const projects = JsonDatabase.get('projects');
    return projects.sort(
      (a: Project, b: Project) =>
        new Date(b.updated_at || b.created_at || '').getTime() -
        new Date(a.updated_at || a.created_at || '').getTime(),
    );
  }

  static findStale(): Project[] {
    return JsonDatabase.findAllByField('projects', 'is_stale', 1);
  }

  static update(id: number, updates: Partial<Project>): Project | null {
    const updated = JsonDatabase.update('projects', id, {
      ...updates,
      updated_at: new Date().toISOString(),
    });
    if (updated) {
      logger.info(`Updated project ${id}`);
    }
    return updated;
  }

  static delete(id: number): boolean {
    const deleted = JsonDatabase.delete('projects', id);
    if (deleted) {
      logger.info(`Deleted project ${id}`);
    }
    return deleted;
  }
}
