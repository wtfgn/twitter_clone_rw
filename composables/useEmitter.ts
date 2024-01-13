import mitt from 'mitt';

const emitter = mitt();

export function useEmitter() {
  return {
    $on: emitter.on,
    $emit: emitter.emit,
  };
}
