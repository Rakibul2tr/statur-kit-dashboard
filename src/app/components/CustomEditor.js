// components/custom-editor.js
'use client' // only in App Router
import React, { useState, useRef, useMemo } from 'react'

import JoditEditor from 'jodit-react'

function CustomEditor({ value, onBlur, setSelectType }) {
  const editor = useRef(null)

  // const [content, setContent] = useState()

  // const handleChange = newContent => {
  //   setContent(newContent)
  // }

  // const seveData = () => {
  //   setValue('html', content)
  // }

  // setSelectType={setSelectType}

  return (
    <div className='my-3'>
      <JoditEditor
        ref={editor}
        value={value}
        tabIndex={1} // tabIndex of textarea
        onBlur={onBlur}
        config={config}
      />
      {/* <button onClick={() => setSelectedOptions(false)} className='py-2 mt-1 px-4 bg-[#fff000] text-black rounded-md'>
        Save
      </button> */}
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
