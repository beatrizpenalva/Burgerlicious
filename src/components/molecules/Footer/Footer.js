import React from 'react'
import Anchor from '../../atoms/Anchor'
import './Footer.styles.css'

const Footer = () => (
  <>
    <footer>
      © developed by
      <Anchor
        link='https://github.com/beatrizpenalva/burgerlicious'
        label='foodie! systems'
        isLink={false}
      />
    </footer>
  </>
)

export default Footer
