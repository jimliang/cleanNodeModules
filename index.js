/**
 * Created by jimliang on 2016/4/3 0003.
 */
"use strict";
const fs = require('fs')
const path = require('path')
const exec = require('child_process').exec

const removeDir = (dir)=> {
    exec(`rmdir ${dir} /s /q`, (err, stdout, stderr)=> {
        console.log('remove', dir, stdout, stderr);
        err && console.log(err);
    })
}

const handleDir = (dir)=> {
    fs.readdir(dir, (err, files)=> {
        if (err)  throw err;

        files.forEach((file)=> {
            const fpath = path.join(dir, file)
            fs.stat(fpath, (err, stats)=> {
                if (err) throw err
                if (stats.isDirectory()) {
                    if (file == 'node_modules') {
                        removeDir(fpath)
                    } else if (!file.startsWith('.')) {
                        handleDir(path.join(dir, file))
                    }
                }
            })
        })
    })
}

module.exports = handleDir