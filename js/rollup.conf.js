import cleanup from 'rollup-plugin-cleanup';
import {terser} from 'rollup-plugin-terser';

const out_dir = 'src/yafowil/widget/ace/resources';

const outro = `
if (window.yafowil === undefined) {
    window.yafowil = {};
}
window.yafowil.ace = exports;
`;

export default args => {
    let conf = {
        input: 'js/src/bundle.js',
        plugins: [
            cleanup()
        ],
        output: [{
            name: 'yafowil_ace',
            file: `${out_dir}/widget.js`,
            format: 'iife',
            outro: outro,
            globals: {
                jquery: 'jQuery',
                ace: 'ace'
            },
            interop: 'default'
        }],
        external: [
            'jquery',
            'ace'
        ]
    };
    if (args.configDebug !== true) {
        conf.output.push({
            name: 'yafowil_ace',
            file: `${out_dir}/widget.min.js`,
            format: 'iife',
            plugins: [
                terser()
            ],
            outro: outro,
            globals: {
                jquery: 'jQuery',
                ace: 'ace'
            },
            interop: 'default'
        });
    }
    return conf;
};