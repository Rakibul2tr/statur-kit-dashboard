'use client'

// Next Imports
import Link from 'next/link'

// Third-party Imports
import classnames from 'classnames'

// Hook Imports
import useVerticalNav from '@menu/hooks/useVerticalNav'
import useHorizontalNav from '@menu/hooks/useHorizontalNav'
import { useSettings } from '@core/hooks/useSettings'

// Util Imports
import { verticalLayoutClasses } from '@layouts/utils/layoutClasses'

const FooterContent = () => {
  return (
    <div className={classnames(verticalLayoutClasses.footerContent, 'text-right')}>
      <p>
        <span className='text-textSecondary'>Created</span>
        <span className='text-textSecondary'>{` by `}</span>
        <span> Fike Fit</span>
      </p>
    </div>
  )
}

export default FooterContent
