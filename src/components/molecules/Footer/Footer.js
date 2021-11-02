import React from 'react'
import Anchor from '../../atoms/Anchor'
import './Footer.styles.css'

const Footer = () => (
  <>
    <footer>
      <i className='fab fa-github-alt footer-icon' /> Developed by
      <Anchor
        link='https://github.com/beatrizpenalva/'
        label='Beatriz Penalva'
        isLink={false}
      />
      &
      <Anchor
        link='https://github.com/cbalieiro'
        label='Camila Oliveira'
        isLink={false}
      />
    </footer>
  </>
)

export default Footer
