// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { webpack as typescriptWebpack } from '@dolittle/typescript.webpack';
import { Configuration } from "webpack";
import path from 'path';

const aureliaPlugin = require("aurelia-webpack-plugin");

export function webpack(dirname: string, settingsCallback?: (config: Configuration) => void) {
    return typescriptWebpack(dirname, _ => {
        _.entry = {
            app: ['aurelia-bootstrapper']
        };
        _.plugins!.push(new aureliaPlugin.AureliaPlugin(),
            new aureliaPlugin.ModuleDependenciesPlugin({
                'aurelia-testing': ['./compile-spy', './view-spy']
            }));
           
        _.resolve!.alias!['aurelia-binding'] = path.resolve(dirname, 'node_modules/aurelia-binding');
        if (typeof settingsCallback === 'function') settingsCallback(_);
    });
}