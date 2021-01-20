import { useState, useEffect } from 'react'

const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState(null)

  useEffect(() => {
    const getBreakpoint = () => {
      if (window.innerWidth < 600) {
        setBreakpoint('xs')
      } else if (window.innerWidth >= 600 && window.innerWidth < 960) {
        setBreakpoint('sm')
      } else if (window.innerWidth >= 960 && window.innerWidth < 1280) {
        setBreakpoint('md')
      } else if (window.innerWidth >= 1280 && window.innerWidth < 1920) {
        setBreakpoint('lg')
      } else if (window.innerWidth >= 1920) {
        setBreakpoint('xl')
      }
    }

    window.addEventListener('resize', getBreakpoint)

    getBreakpoint()

    return () => {
      window.removeEventListener('resize', getBreakpoint)
    }
  }, [breakpoint])

  return breakpoint
}

export default useBreakpoint
