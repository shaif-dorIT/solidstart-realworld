import fs from 'fs'
import path from 'path'

const vite_ref_matcher = /import vite from "vite";/

function fix_vite_imports(filepath) {
  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) throw err
    fs.writeFile(
      filepath,
      data.replace(vite_ref_matcher, 'import * as vite from "vite";'),
      'utf8',
      function (error) {
        if (error) throw error
      }
    )
  })
}

const startNode = path.resolve('node_modules', 'solid-start-node', 'index.js')
// const client_adapter = path.resolve(
//   'node_modules',
//   'solid-start',
//   'client-adapter.js'
// )

fix_vite_imports(startNode)
// fix_vite_imports(client_adapter)

if (process.NODE_ENV !== 'production') {
  const typesPath = path.resolve(
    'node_modules',
    '@types',
    'testing-library__jest-dom',
    'index.d.ts'
  )
  const refMatcher = /[\r\n]+\/\/\/ <reference types="jest" \/>/

  fs.readFile(typesPath, 'utf8', (err, data) => {
    if (err) throw err

    fs.writeFile(
      typesPath,
      data.replace(refMatcher, ''),
      'utf8',
      function (error) {
        if (error) throw error
      }
    )
  })
}
