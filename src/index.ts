import minimatch from 'minimatch'
import { useCallback, useMemo } from 'react'

type UseNavigateProps = {
  when?: boolean
  to?: string
  onPaths?: string[] // array of globs
  notOnPaths?: string[]
}

type UseNavigateConfig = {
  push: (path: string) => void
  back: () => void
  replace: (path: string) => void
}

const useNavigate = (methods: UseNavigateConfig) => {
  const navigator = useCallback(
    // eslint-disable-next-line @typescript-eslint/ban-types
    (method: Function) => ({ to, when = true, onPaths, notOnPaths }: UseNavigateProps) => {
      const pathname = location.pathname
      if (when) {
        if (onPaths !== undefined) {
          const match = onPaths.find((pattern) => minimatch(pathname, pattern))
          if (match) method(to)
          return
        }
        if (notOnPaths !== undefined) {
          const match = notOnPaths.find((pattern) => minimatch(pathname, pattern))
          if (!match) method(to)
          return
        }
        method(to)
      }
    },
    []
  )

  const push = useMemo(() => navigator(methods.push), [methods])
  const back = useMemo(() => navigator(methods.back), [methods])
  const replace = useMemo(() => navigator(methods.replace), [methods])

  return {
    push,
    back,
    replace,
  }
}

export default useNavigate
