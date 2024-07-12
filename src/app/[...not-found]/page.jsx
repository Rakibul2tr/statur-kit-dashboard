// Component Imports
import Providers from '@components/Providers'
import BlankLayout from '@layouts/BlankLayout'
import NotFound from '@views/NotFound'

// Util Imports
import { getServerMode, getSystemMode } from '@core/utils/serverHelpers'

const NotFoundPage = () => {
  // Vars
  const direction = 'ltr'

  // const mode = getServerMode()

  const systemMode = getSystemMode()

  return (
    <Providers direction={direction}>
      <BlankLayout systemMode={systemMode}>
        <NotFound />
      </BlankLayout>
    </Providers>
  )
}

export async function generateStaticParams() {
  // Provide a list of paths that you want to statically generate
  // In this case, we can generate a fallback for any path
  return [{ params: { slug: [] } }]
}

export default NotFoundPage
