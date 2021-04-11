import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'

interface ErrorProps {
  message: string;
}

const Message = styled(motion.div)`
  padding: 2px 5px;
  color: red;
  font-size: 0.7rem;
`

const ErrorFormMessage: React.FC<ErrorProps> = ({ message }) => {
  return (
    <Message>
      {message}
    </Message>
  )
}

export default ErrorFormMessage
