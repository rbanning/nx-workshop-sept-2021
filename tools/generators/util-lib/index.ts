import { Tree, formatFiles, installPackagesTask } from '@nrwl/devkit';
import { libraryGenerator } from '@nrwl/workspace/generators';


export default async function (tree: Tree, schema: any) {
  const PREFIX = "util-";
  let { name } = schema;
  if (name?.indexOf(PREFIX) !== 0) {
    name = PREFIX + name;
  }

  //add scope tag
  const tag = `scope:${schema.directory}, type:util`;
  schema.tags = !!schema.tags ? `${schema.tags}, ${tag}` : tag;

  console.log("DEBUG: -- ", {name, schema});

  await libraryGenerator(tree, schema);
  await formatFiles(tree);
  return () => {
    installPackagesTask(tree);
  };
}
