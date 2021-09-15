import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';

interface ISchema {
  name: string;
  directory: 'store' | 'shared';
  tags?: string;
}

export default async function (tree: Tree, schema: ISchema) {
  const PREFIX = 'util-';
  if (schema.name && schema.name.indexOf(PREFIX) !== 0) {
    schema.name = PREFIX + schema.name;
  }

  //add scope tag
  const tag = `scope:${schema.directory}, type:util`;
  schema.tags = !!schema.tags ? `${schema.tags}, ${tag}` : tag;

  console.log('DEBUG: -- ', { name, schema });

  await libraryGenerator(tree, schema);
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
