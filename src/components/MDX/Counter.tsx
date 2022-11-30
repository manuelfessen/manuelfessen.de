import { createSignal } from 'solid-js'

export default function Counter() {
  const [count, setCount] = createSignal(0)

  const add = () => setCount((i) => i + 1)

  return (
    <div class='flex gap-x-4'>
      <button
        type='button'
        class='touch-manipulation rounded py-2 px-3 transition-[background-color] hover:bg-gray-200 dark:hover:bg-gray-800'
        onClick={add}
      >
        the count is <span class='inline-block min-w-[2ch]'>{count()}</span>
      </button>
    </div>
  )
}
