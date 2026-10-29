import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { LazyMotion, domAnimation, MotionConfig } from 'framer-motion'
import { ContentProvider } from './context/ContentContext'
import App from './App'
import './index.css'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <LazyMotion features={domAnimation} strict>
      <MotionConfig reducedMotion="user">
        <ContentProvider><App /></ContentProvider>
      </MotionConfig>
    </LazyMotion>
  </BrowserRouter>
)
