import React, { useState } from 'react';
import './App.css'

type FileTreeNode = {
  name: string;
  children?: FileTreeNode[];
}

type FileTreeNodeComponentProps = {
  fileTree: FileTreeNode,
  depth?: number;
}

function FileTreeNodeComponent({ fileTree, depth = 0 }: FileTreeNodeComponentProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { name, children } = fileTree;

  const shouldShowButtons = children && children.length;

  return (
    <div style={{ paddingLeft: depth ? depth * 10 : 0 }}>
      {
        shouldShowButtons ? (
          isExpanded ? (
            <button style={{fontSize: '2em', marginRight: '15px'}} onClick={() => setIsExpanded(false)}>-</button>
          ) : (
            <button style={{fontSize: '2em', marginRight: '15px'}} onClick={() => setIsExpanded(true)}>+</button>
          )
        ) : (null)
      }
      <p style={{display: 'inline-block'}}>{name}</p>
      {
        isExpanded ? (
          children?.map(child => <FileTreeNodeComponent key={child.name} fileTree={child} depth={depth + 1} />)
    
        ) : (null)
      }
    </div>
  )
}

function App() {

  const fileTree = {
    name: 'root',
    children: [
      {
        name: 'node_modules',
        children: [
          {
            name: 'express',
            children: [
              {
                name: 'braces'
              }
            ]
          },
          {
            name: 'vitest',
            children: [
              {
                name: 'acorn'
              }
            ]
          }
        ]
      },
      {
        name: 'eslint',
        children: [
          {
            name: 'node_lib',
            children: [
              {
                name: 'types',
                children: [
                  { name: 'array_chalk' }
                ]
              }
            ]
          },
          {
            name: 'argaspe',
            children: [
              {
                name: 'ansi'
              }
            ]
          }
        ]
      }
    ]
  }
  return (
    <>
      <h1>File tree explorer app</h1>

      <FileTreeNodeComponent fileTree={fileTree} />

    </>
  )
}

export default App
