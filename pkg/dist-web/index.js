import minimatch from 'minimatch';
import { useCallback, useMemo } from 'react';

const useNavigate = methods => {
  const navigator = useCallback( // eslint-disable-next-line @typescript-eslint/ban-types
  method => ({
    to,
    when = true,
    onPaths,
    notOnPaths
  }) => {
    const pathname = location.pathname;

    if (when) {
      if (onPaths !== undefined) {
        const match = onPaths.find(pattern => minimatch(pathname, pattern));
        if (match) method(to);
        return;
      }

      if (notOnPaths !== undefined) {
        const match = notOnPaths.find(pattern => minimatch(pathname, pattern));
        if (!match) method(to);
        return;
      }

      method(to);
    }
  }, []);
  const push = useMemo(() => navigator(methods.push), [methods]);
  const back = useMemo(() => navigator(methods.back), [methods]);
  const replace = useMemo(() => navigator(methods.replace), [methods]);
  return {
    push,
    back,
    replace
  };
};

export default useNavigate;
//# sourceMappingURL=index.js.map
