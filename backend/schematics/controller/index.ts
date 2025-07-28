import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  mergeWith,
  template,
  url,
  move,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';

interface ControllerOptions {
  name: string;
  path?: string;
  skipImport?: boolean;
  flat?: boolean;
}

export function customController(options: ControllerOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    // Define the path where files will be generated
    const path = options.path || 'src';
    const name = options.name;

    // Log what we're doing
    context.logger.info(`Generating custom controller: ${name}`);
    context.logger.info(`Path: ${path}/${strings.dasherize(name)}`);

    // Generate the template source
    const templateSource = apply(url('./files'), [
      template({
        ...strings,
        name,
        // Add any additional template variables here
      }),
      move(`${path}/${strings.dasherize(name)}`),
    ]);

    // Merge the generated files with the existing tree
    return mergeWith(templateSource);
  };
}
