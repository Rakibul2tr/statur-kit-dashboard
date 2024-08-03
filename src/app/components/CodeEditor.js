'use client'
import React, { useEffect, useRef, useState } from 'react'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

// import Quill from 'quill'

// // Extend Quill to handle video formats
// const VideoEmbed = Quill.import('blots/block/embed')

// class VideoBlot extends VideoEmbed {
//   static create(value) {
//     const node = super.create()

//     node.setAttribute('src', value)
//     node.setAttribute('frameborder', '0')
//     node.setAttribute('allowfullscreen', true)

//     return node
//   }

//   static value(node) {
//     return node.getAttribute('src')
//   }
// }

// VideoBlot.blotName = 'video'
// VideoBlot.tagName = 'iframe'
// Quill.register(VideoBlot)

const EditorComponent = ({ setValue, selectedItem }) => {
  const [htmlValue, setHtmlValue] = useState(selectedItem?.data ? selectedItem?.data : '')

  // const quillRef = useRef(null)

  // const handleVideoUpload = () => {
  //   const input = document.createElement('input')

  //   input.setAttribute('type', 'file')
  //   input.setAttribute('accept', 'video/*')
  //   input.click()

  //   input.onchange = async () => {
  //     const file = input.files[0]
  //     const formData = new FormData()

  //     formData.append('video', file)

  //     // Upload the video to your server or a third-party service
  //     // and get the URL
  //     const response = await fetch('/upload-video', {
  //       method: 'POST',
  //       body: formData
  //     })

  //     const data = await response.json()
  //     const videoURL = data.url

  //     const editor = quillRef.current.getEditor()
  //     const range = editor.getSelection()

  //     editor.insertEmbed(range.index, 'video', videoURL)
  //   }
  // }

  // console.log('selected', selectedItem)

  const handleEditorChange = html => {
    setHtmlValue(html)
    setValue('data', html)
  }

  return (
    <div>
      <ReactQuill
        value={htmlValue}
        onChange={handleEditorChange}
        modules={EditorComponent.modules}
        formats={EditorComponent.formats}
        className='custom-quill'

        // ref={quillRef}
        // theme='snow'
      />
    </div>
  )
}

// Optional: Add custom modules and formats for ReactQuill
EditorComponent.modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }, { font: [] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
      [{ color: [] }, { background: [] }],
      [{ align: 'left' }, { align: 'center' }, { align: 'right' }],
      ['link', 'image', 'video', 'formula'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false
    }

    // handlers: {
    //   video: handleVideoUpload
    // }
  }
}

EditorComponent.formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video'
]

export default EditorComponent
