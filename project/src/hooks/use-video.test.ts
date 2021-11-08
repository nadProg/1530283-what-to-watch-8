import { act, renderHook } from '@testing-library/react-hooks';
import React from 'react';
import { useVideo } from './use-video';

describe('Hook: useVideo', () => {

  it('should return valid result', () => {
    const { result } = renderHook(() => useVideo());
    const { ref,
      isPlay,
      isReady,
      duration,
      percentage,
      elapsedTime,
      togglePlay,
      onPlay,
      onPause,
      onLoadedData,
      onTimeUpdate,
      requestFullScreen } = result.current;

    expect(ref.current).toBeNull();
    expect(isPlay).toBe(false);
    expect(isReady).toBe(false);
    expect(duration).toBe(0);
    expect(percentage).toBe(0);
    expect(elapsedTime).toBe(0);
    expect(togglePlay).toBeInstanceOf(Function);
    expect(onPlay).toBeInstanceOf(Function);
    expect(onPause).toBeInstanceOf(Function);
    expect(onLoadedData).toBeInstanceOf(Function);
    expect(onTimeUpdate).toBeInstanceOf(Function);
    expect(requestFullScreen).toBeInstanceOf(Function);
  });

  it('should handle togglePlay, onPlay, onPause', () => {
    const { result } = renderHook(() => useVideo());
    let isPlay = false;

    const { togglePlay } = result.current;

    act(() => togglePlay());
    isPlay = result.current.isPlay;
    expect(isPlay).toBe(true);

    act(() => togglePlay());
    isPlay = result.current.isPlay;
    expect(isPlay).toBe(false);
  });

  it('should handle onPlay, onPause', () => {
    const { result } = renderHook(() => useVideo());
    let isPlay = false;

    const { onPlay, onPause } = result.current;

    act(() => onPlay());
    isPlay = result.current.isPlay;
    expect(isPlay).toBe(true);

    act(() => onPause());
    isPlay = result.current.isPlay;
    expect(isPlay).toBe(false);
  });

  it('should handle onLoadedData', () => {
    const { result } = renderHook(() => useVideo());
    let isReady = false;

    const { onLoadedData } = result.current;

    act(() => onLoadedData());
    isReady = result.current.isReady;
    expect(isReady).toBe(true);
  });

  it('should handle effect on isPlay changing', () => {
    const mockPause = jest.fn();
    const mockPlay = jest.fn();

    jest.spyOn(React, 'useRef').mockReturnValue({
      current: {
        pause: mockPause,
        play: mockPlay,
      },
    });

    const { result} = renderHook(() => useVideo());
    const { onPlay } = result.current;

    expect(mockPause).toHaveBeenCalledTimes(1);
    act(() => onPlay());
    expect(mockPlay).toHaveBeenCalledTimes(1);
    const { isPlay } = result.current;
    expect(isPlay).toBe(true);
  });

  it('should handle error when play video is not possible', () => {
    const mockPause = jest.fn();
    const mockPlay = jest.fn(() => {
      throw new Error();
    });

    jest.spyOn(React, 'useRef').mockReturnValue({
      current: {
        pause: mockPause,
        play: mockPlay,
      },
    });

    const { result} = renderHook(() => useVideo());
    const { onPlay } = result.current;

    expect(mockPause).toHaveBeenCalledTimes(1);
    act(() => onPlay());
    expect(mockPlay).toHaveBeenCalledTimes(1);
    const { isPlay } = result.current;
    expect(isPlay).toBe(false);
  });

  it('should handle request full screen', () => {
    const mockRequestFullScreen = jest.fn();

    jest.spyOn(React, 'useRef').mockReturnValue({
      current: {
        requestFullscreen: mockRequestFullScreen,
        pause: jest.fn(),
      },
    });

    const { result } = renderHook(() => useVideo());
    const { requestFullScreen } = result.current;

    act(() => requestFullScreen());
    expect(mockRequestFullScreen).toHaveBeenCalledTimes(1);
  });

  it('should handle request full screen and onTimeUpdate when no ref exists without errors', () => {
    jest.spyOn(React, 'useRef').mockReturnValue({
      current: null,
    });

    const { result } = renderHook(() => useVideo());
    const { requestFullScreen, onTimeUpdate } = result.current;

    act(() => requestFullScreen());
    act(() => onTimeUpdate());
  });

  it('should handle effect on isReady changing', () => {
    const mockDuration = 60;

    jest.spyOn(React, 'useRef').mockReturnValue({
      current: {
        pause: jest.fn(),
        duration: mockDuration,
      },
    });

    const { result } = renderHook(() => useVideo());
    const { onLoadedData } = result.current;

    act(() => onLoadedData());
    const { duration, elapsedTime } = result.current;

    expect(duration).toBe(mockDuration);
    expect(elapsedTime).toBe(mockDuration);
  });

  it('should handle onTimeUpdate', () => {
    const mockDuration = 60;

    jest.spyOn(React, 'useRef').mockReturnValue({
      current: {
        pause: jest.fn(),
        duration: mockDuration,
      },
    });

    const { result } = renderHook(() => useVideo());
    const { onLoadedData, onTimeUpdate } = result.current;

    act(() => {
      onLoadedData();
      onTimeUpdate();
    });

    const { duration } = result.current;
    expect(duration).toBe(mockDuration);
  });
});
