'use client'

// MUI Imports
import { useParams } from 'next/navigation'

import { useTheme } from '@mui/material/styles'

// Third-party Imports
import PerfectScrollbar from 'react-perfect-scrollbar'

// Component Imports
import { Menu, SubMenu, MenuItem, MenuSection } from '@menu/vertical-menu'

// Hook Imports
import { useSettings } from '@core/hooks/useSettings'
import useVerticalNav from '@menu/hooks/useVerticalNav'

// Styled Component Imports
import StyledVerticalNavExpandIcon from '@menu/styles/vertical/StyledVerticalNavExpandIcon'

// Style Imports
import menuItemStyles from '@core/styles/vertical/menuItemStyles'
import menuSectionStyles from '@core/styles/vertical/menuSectionStyles'

const RenderExpandIcon = ({ open, transitionDuration }) => (
  <StyledVerticalNavExpandIcon open={open} transitionDuration={transitionDuration}>
    <i className='tabler-chevron-right' />
  </StyledVerticalNavExpandIcon>
)

const VerticalMenu = ({ scrollMenu, dictionary }) => {
  // Hooks
  const theme = useTheme()
  const verticalNavOptions = useVerticalNav()
  const { settings } = useSettings()
  const { isBreakpointReached } = useVerticalNav()

  // Vars
  const { transitionDuration } = verticalNavOptions
  const ScrollWrapper = isBreakpointReached ? 'div' : PerfectScrollbar

  return (
    // eslint-disable-next-line lines-around-comment
    /* Custom scrollbar instead of browser scroll, remove if you want browser scroll only */
    <ScrollWrapper
      {...(isBreakpointReached
        ? {
            className: 'bs-full overflow-y-auto overflow-x-hidden',
            onScroll: container => scrollMenu(container, false)
          }
        : {
            options: { wheelPropagation: false, suppressScrollX: true },
            onScrollY: container => scrollMenu(container, true)
          })}
    >
      {/* Incase you also want to scroll NavHeader to scroll with Vertical Menu, remove NavHeader from above and paste it below this comment */}
      {/* Vertical Menu */}
      <Menu
        popoutMenuOffset={{ mainAxis: 23 }}
        menuItemStyles={menuItemStyles(verticalNavOptions, theme, settings)}
        renderExpandIcon={({ open }) => <RenderExpandIcon open={open} transitionDuration={transitionDuration} />}
        renderExpandedMenuItemIcon={{ icon: <i className='tabler-circle text-xs' /> }}
        menuSectionStyles={menuSectionStyles(verticalNavOptions, theme)}
      >
        <MenuItem href='/dashboard' icon={<i className='tabler-layout-dashboard' />}>
          Dashboard
        </MenuItem>

        {/* menu section */}
        <MenuSection>
          <SubMenu label={'User'} icon={<i className='tabler-user' />}>
            <MenuItem href={`/user/list`}>User list</MenuItem>
            <MenuItem href={`/user/view`}>Preview</MenuItem>
          </SubMenu>
        </MenuSection>
        {/* equipment menu */}
        <MenuSection>
          <SubMenu label={'Equipment'} icon={<i className='tabler-barbell' />}>
            <MenuItem href={`/equipment/list`}>Equipment List</MenuItem>
            <MenuItem href={`/equipment/add`}>Add Equipment</MenuItem>
          </SubMenu>
        </MenuSection>
        {/* Exercise menu */}
        <MenuSection>
          <SubMenu label={'Exercise'} icon={<i className='tabler-woman' />}>
            <MenuItem href={`/exercise/list`}>Exercise List</MenuItem>
            <MenuItem href={`/exercise/add`}>Add Exercise</MenuItem>
          </SubMenu>
        </MenuSection>

        {/* Workout menu */}
        <MenuSection>
          <SubMenu label={'Workout'} icon={<i className='tabler-stretching' />}>
            <MenuItem href={`/workout/list`}>Workout List</MenuItem>
            <MenuItem href={`/workout/add`}>Add Workout</MenuItem>
            <MenuItem href={`/workout/typelist`}>Workout Type List</MenuItem>
          </SubMenu>
        </MenuSection>
        {/* Diet menu */}
        <MenuSection>
          <SubMenu label={'Diet'} icon={<i className='tabler-grill-off' />}>
            <MenuItem href={`/diet/list`}>Diet List</MenuItem>
            <MenuItem href={`/diet/add`}>Add Diet</MenuItem>
            <MenuItem href={`/diet/categorylist`}>Category Diet List</MenuItem>
          </SubMenu>
        </MenuSection>
        {/* Body Part menu */}
        <MenuSection>
          <SubMenu label={'Body Part'} icon={<i className='tabler-play-handball' />}>
            <MenuItem href={`/bodyPart/list`}>Body Part List</MenuItem>
            <MenuItem href={`/bodyPart/add`}>Add Body Part</MenuItem>
          </SubMenu>
        </MenuSection>
        {/* Store menu */}
        {/* product folder is Store */}
        <MenuSection>
          <SubMenu label={'Stores'} icon={<i className='tabler-shopping-cart' />}>
            <MenuItem href={`/stores/list`}>Store List</MenuItem>
            <MenuItem href={`/stores/add`}>Add new Store</MenuItem>
            <MenuItem href={`/stores/update`}>Update Store</MenuItem>
            <MenuItem href={`/stores/categorylist`}>Store Category List</MenuItem>
            <MenuItem href={`/stores/addCategory`}>Add Store Category</MenuItem>
          </SubMenu>
        </MenuSection>
        {/* program item */}
        <MenuSection>
          <SubMenu label={'Programs'} icon={<i className='tabler-shopping-cart' />}>
            <MenuItem href={`/programs/list`}>Program List</MenuItem>
            <MenuItem href={`/programs/add`}>Add new Program</MenuItem>
            <MenuItem href={`/programs/update`}>Program update</MenuItem>
            <MenuItem href={`/programs/delete`}>Program Delete</MenuItem>
          </SubMenu>
        </MenuSection>
        {/* Influencer menu */}
        <MenuSection>
          <SubMenu label={'Influencer'} icon={<i className='tabler-users' />}>
            <MenuItem href={`/influencer/list`}>Influencer List</MenuItem>
            <MenuItem href={`/influencer/add`}>add new influencer</MenuItem>
          </SubMenu>
        </MenuSection>
        {/* Subscription menu */}
        <MenuSection>
          <SubMenu label={'Subscription'} icon={<i className='tabler-crown' />}>
            <MenuItem href={`/subscription/list`}>Subscription List</MenuItem>
          </SubMenu>
        </MenuSection>
        {/* Account Setting menu */}
        <MenuSection>
          <SubMenu label={'Account Setting'} icon={<i className='tabler-user-cog' />}>
            <MenuItem href={`/accountSetting/list`}>Role List</MenuItem>
            <MenuItem href={`/accountSetting/list`}>Permission List</MenuItem>
          </SubMenu>
        </MenuSection>
      </Menu>
    </ScrollWrapper>
  )
}

export default VerticalMenu
