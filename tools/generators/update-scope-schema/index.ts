import { Tree, formatFiles, updateJson, readJson } from '@nrwl/devkit';

function getScopes(nxJson: any): string[] {
  const TARGET = 'scope:';
  const projects: any[] = Object.values(nxJson.projects);
  const allScopes = projects
    .map(project => project.tags
      .filter((tag: string) => tag.startsWith(TARGET))
    )
    .reduce((acc, tags) => [...acc, ...tags], [])         //convert to array of strings (from array of arrays) - i.e. flatten array
    .map((scope: string) => scope.slice(TARGET.length));  //remove the prefix (TARGET)
  return Array.from(new Set(allScopes));                  //remove duplicates
}

//replaces schema interface's list of directory options (scopes)
function updateInterfaceScopes(content: string, scopes: string[]): string {
  const joinScopes = scopes.map((s) => `'${s}'`).join(' | ');
  const PATTERN = /interface ISchema \{\n.*\n.*\n.*\n\}/gm;
  return content.replace(
    PATTERN,
    `interface ISchema {
  name: string;
  directory: ${joinScopes};
  tags?: string;
}`
  );
}


function addScopeTagIfMissing(host: Tree) {
  updateJson(host, 'nx.json', (json) => {
    Object.keys(json.projects).forEach((projectName) => {
      if (!json.projects[projectName].tags.some((tag) => tag.startsWith('scope:'))) {
        const scope = projectName.split('-')[0];
        json.projects[projectName].tags.push(`scope:${scope}`);
      }
    });
    return json;
  });
}

export default async function (tree: Tree, schema: any) {
  //update scopes in util-lib
  const scopes = getScopes(readJson(tree, "nx.json"));
  updateJson(tree, 'tools/generators/util-lib/schema.json', schemaJson => {
    schemaJson.properties.directory["x-prompt"].items = scopes.map(scope => ({
      value: scope,
      label: scope
    }))
    return schemaJson;
  });

  //add any missing scope tags to nx.json
  await addScopeTagIfMissing(tree);

  //update scopes in util-lib ISchema interface
  const content = tree.read('tools/generators/util-lib/index.ts', 'utf-8');
  const newContent = updateInterfaceScopes(content, scopes);
  tree.write('tools/generators/util-lib/index.ts', newContent);

  //finally
  await formatFiles(tree);  
}
