import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'https://beta.pokeapi.co/graphql/v1beta',
    documents: 'src/**/*.ts?(x)',
    overwrite: true,
    config: {
        namingConvention: {
            enumValues: 'keep',
        },
    },
    generates: {
        './src/api/__generated__/graphql.ts': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
            ],
        },
    },
};

export default config;
