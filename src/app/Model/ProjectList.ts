import { Resource } from 'src/app/Model/Resource';

export class ProjectList {
  pid = 0;
  project_name = '';
  resources: Resource[];
  columns: object[];
  constructor() { }
}
