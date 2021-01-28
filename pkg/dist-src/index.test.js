import { renderHook, act } from '@testing-library/react-hooks';
import useNavigate from "./index.js";
const config = {
  push: jest.fn(),
  replace: jest.fn(),
  back: jest.fn()
};
beforeAll(() => {
  global.window = Object.create(window);
  Object.defineProperty(window, 'location', {
    value: {
      pathname: '/hello/world'
    }
  });
});
test('navigate if "when" is true and no paths are specified', () => {
  const {
    result
  } = renderHook(() => useNavigate(config));
  act(() => {
    result.current.push({
      to: '/home',
      when: true
    });
  });
  expect(config.push).toHaveBeenCalledTimes(1);
});
test('never navigate if "when" is false', () => {
  const {
    result
  } = renderHook(() => useNavigate(config));
  act(() => {
    result.current.push({
      to: '/home',
      when: false,
      onPaths: ['/hello/world'],
      notOnPaths: ['/unrelated']
    });
  });
  expect(config.push).toHaveBeenCalledTimes(0);
});
test('dont navigate if no exact path match in onPaths', () => {
  const {
    result
  } = renderHook(() => useNavigate(config));
  act(() => {
    result.current.push({
      to: '/home',
      when: true,
      onPaths: ['/unrelated']
    });
  });
  expect(config.push).toHaveBeenCalledTimes(0);
});
test('navigate if pathname matches glob in "onPaths"', () => {
  const {
    result
  } = renderHook(() => useNavigate(config));
  act(() => {
    result.current.push({
      to: '/home',
      when: true,
      onPaths: ['/unrelated', '/hello/**']
    });
  });
  expect(config.push).toHaveBeenCalledTimes(1);
});
test('dont navigate if user is on a path specified in "notOnPaths"', () => {
  const {
    result
  } = renderHook(() => useNavigate(config));
  act(() => {
    result.current.push({
      to: '/home',
      when: true,
      notOnPaths: ['/hello/world']
    });
  });
  expect(config.push).toHaveBeenCalledTimes(0);
});
test('navigate if user is not on a path specified in "notOnPaths"', () => {
  const {
    result
  } = renderHook(() => useNavigate(config));
  act(() => {
    result.current.push({
      to: '/home',
      when: true,
      notOnPaths: ['/unrelated']
    });
  });
  expect(config.push).toHaveBeenCalledTimes(1);
});