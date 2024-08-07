// components/custom-editor.js
'use client' // only in App Router
import React, { useState, useRef, useMemo } from 'react'

import JoditEditor from 'jodit-react'

function CustomEditor({ setValue }) {
  const editor = useRef(null)
  const [content, setContent] = useState()

  const handleChange = newContent => {
    setContent(newContent)
  }

  // const config = useMemo(
  //   {
  //     readonly: false,
  //     placeholder: placeholder || 'Start typings...'
  //   },
  //   [placeholder]
  // )
  const seveData = () => {
    setValue('html', content)
  }

  return (
    <div>
      <JoditEditor
        ref={editor}
        value={content}
        tabIndex={1} // tabIndex of textarea
        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
        onChange={handleChange}
      />
      <button onClick={seveData}>Seve</button>
    </div>
  )
}

export default CustomEditor
