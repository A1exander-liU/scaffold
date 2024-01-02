import fs from 'fs-extra';
import * as parser from '@babel/parser';
import traverse from '@babel/traverse';
import { ObjectProperty } from '@babel/types';
import generator from '@babel/generator';

async function generateAST(file: string, options: parser.ParserOptions) {
  const exists = await fs.pathExists(file);
  let fileContent;
  if (exists) {
    fileContent = await fs.readFile(file, 'utf-8');
  } else {
    fileContent = file;
  }
  const ast = parser.parse(fileContent, options);
  return { fileContent, ast };
}

export async function addImport(
  file: string,
  options: parser.ParserOptions,
  importStatement: string,
) {
  const { fileContent, ast } = await generateAST(file, options);

  let last = -1;

  traverse.default(ast, {
    ImportDeclaration(path) {
      last = Math.max(last, path.node.end);
    },
  });

  if (last == -1) {
    return `${importStatement}\n` + fileContent;
  } else {
    return (
      fileContent.slice(0, last) +
      `\n${importStatement}\n` +
      fileContent.slice(last)
    );
  }
}

export async function addIdentifierToDecoratorArray(
  file: string,
  options: parser.ParserOptions,
  name: string,
  value: string,
  decorator?: string,
) {
  const { fileContent, ast } = await generateAST(file, options);

  traverse.default(ast, {
    Decorator(path) {
      const node = path.node;
      const expression = path.node.expression;

      if (
        (!decorator && expression.type === 'CallExpression') ||
        (decorator &&
          expression.type === 'CallExpression' &&
          expression.callee.type === 'Identifier' &&
          expression.callee.name === decorator)
      ) {
        if (expression.arguments[0].type !== 'ObjectExpression') {
          return;
        }
        const decoratorProp = expression.arguments[0].properties.find(
          (property: ObjectProperty) => {
            if (property.key.type !== 'Identifier') {
              return false;
            }

            if (property.key.name === name) {
              return true;
            }

            return false;
          },
        ) as ObjectProperty;

        if (decoratorProp.value.type === 'ArrayExpression') {
          decoratorProp.value.elements.push({
            type: 'Identifier',
            name: value,
          });
        }
      }
    },
  });

  return generator.default(ast).code;
}
