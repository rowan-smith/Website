/** @type {import('eslint').Rule.RuleModule} */
export const oneExportPerFile = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Enforce one component, class, interface, or type export per file',
    },
    messages: {
      multipleInFile:
        'Each component, class, interface, and type must live in its own file. Found {{count}} exports: {{names}}.',
    },
    schema: [
      {
        type: 'object',
        properties: {
          ignorePatterns: {
            type: 'array',
            items: { type: 'string' },
          },
        },
        additionalProperties: false,
      },
    ],
  },
  create(context) {
    const filename = context.filename.replace(/\\/g, '/');
    const options = context.options[0] ?? {};
    const ignorePatterns = options.ignorePatterns ?? [
      '/index\\.tsx?$',
      '/components/ui/',
    ];

    if (ignorePatterns.some((pattern) => new RegExp(pattern).test(filename))) {
      return {};
    }

    const exported = [];

    const trackExport = (name) => {
      if (name) {
        exported.push(name);
      }
    };

    return {
      ExportNamedDeclaration(node) {
        const { declaration: decl, specifiers } = node;

        if (specifiers?.length) {
          specifiers.forEach((specifier) => trackExport(specifier.exported.name));
          return;
        }

        if (!decl) {
          return;
        }

        if (
          decl.type === 'FunctionDeclaration'
          || decl.type === 'ClassDeclaration'
          || decl.type === 'TSInterfaceDeclaration'
          || decl.type === 'TSTypeAliasDeclaration'
        ) {
          trackExport(decl.id?.name);
          return;
        }

        if (decl.type === 'VariableDeclaration') {
          decl.declarations.forEach((variable) => {
            if (variable.id?.type !== 'Identifier') {
              return;
            }

            const { name } = variable.id;
            const init = variable.init;
            const isComponent = init
              && (init.type === 'ArrowFunctionExpression' || init.type === 'FunctionExpression')
              && /^[A-Z]/.test(name);

            if (isComponent) {
              trackExport(name);
            }
          });
        }
      },
      'Program:exit'(node) {
        if (exported.length <= 1) {
          return;
        }

        context.report({
          node,
          messageId: 'multipleInFile',
          data: {
            count: exported.length,
            names: exported.join(', '),
          },
        });
      },
    };
  },
};
