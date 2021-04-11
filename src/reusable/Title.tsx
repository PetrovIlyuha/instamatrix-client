import React from 'react'
import { Helmet } from 'react-helmet-async'

interface TitleProps {
  title: string
}

const Title: React.FC<TitleProps> = ({ title }) => {
  return (
    <Helmet>
      <title>{title} | InstaMatrix</title>
    </Helmet>
  )
}

export default Title
