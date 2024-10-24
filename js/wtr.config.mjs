import {importMapsPlugin} from '@web/dev-server-import-maps';

export default {
    nodeResolve: true,
    testFramework: {
        path: './node_modules/web-test-runner-qunit/dist/autorun.js',
        config: {
            noglobals: false
        }
    },
    files: [
        'tests/**/test_*.js'
    ],
    plugins: [
        importMapsPlugin({
            inject: {
                importMap: {
                    imports: {
                        'jquery': './node_modules/jquery/dist-module/jquery.module.js'
                    },
                },
            },
        }),
    ],
}
