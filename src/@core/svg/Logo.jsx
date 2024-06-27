import Image from 'next/image'

import image from '../../assets/logo/icon-black.png'

const Logo = props => {
  return <Image src={image} alt='' width={70} height={40} />
}

export default Logo
