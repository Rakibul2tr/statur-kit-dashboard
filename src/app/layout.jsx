// Third-party Imports
import 'react-perfect-scrollbar/dist/css/styles.css'

// Style Imports
import '@/app/globals.css'

// Generated Icon CSS Imports
import '@assets/iconify-icons/generated-icons.css'
import Providers from '../lib/Provider'

export const metadata = {
  title: 'Fike-fit'
}

const RootLayout = ({ children }) => {
  // Vars
  const direction = 'ltr'

  return (
    <Providers>
      <html id='__next' lang='en' dir={direction}>
        <body className='flex is-full min-bs-full flex-auto flex-col'>{children}</body>
      </html>
    </Providers>
  )
}

export default RootLayout
