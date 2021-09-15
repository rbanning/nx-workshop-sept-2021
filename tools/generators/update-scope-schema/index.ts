import { Tree, formatFiles, updateJson } from '@nrwl/devkit';

export default async function (tree: Tree, schema: any) {
  updateJson(tree, "workspace.json", (json) => {
    json.defaultProject = 'api';
    return json;
  });

  await formatFiles(tree);  
}
