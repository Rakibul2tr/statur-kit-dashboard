// components/custom-editor.js
'use client' // only in App Router
import React, { useState, useRef, useMemo } from 'react'

import JoditEditor from 'jodit-react'

function CustomEditor({ value, onBlur }) {
  const editor = useRef(null)

  return (
    <div className='my-3'>
      <JoditEditor
        ref={editor}
        value={value}
        tabIndex={1} // tabIndex of textarea
        onBlur={onBlur}
        config={config}
      />
    </div>
  )
}

const config = {
  readonly: false,
  height: '300px',
  width: '100%',
  enableDragAndDropFileToEditor: true,
  buttons: [
    'source',
    '|',
    'bold',
    'italic',
    'underline',
    '|',
    'ul',
    'ol',
    '|',
    'font',
    'fontsize',
    'brush',
    'paragraph',
    '|',
    'image',
    'table',
    'link',
    '|',
    'left',
    'center',
    'right',
    'justify',
    '|',
    'undo',
    'redo',
    '|',
    'hr',
    'eraser',
    'fullsize'
  ],
  uploader: { insertImageAsBase64URI: true },
  removeButtons: ['brush', 'file'],
  showXPathInStatusbar: false,
  showCharsCounter: false,
  showWordsCounter: false,
  toolbarAdaptive: true,
  toolbarSticky: true,
  style: {
    background: '#27272E',
    color: 'rgba(255,255,255,0.5)'
  }
}

export default CustomEditor
