import { useEffect, useRef, useState } from 'react'

export const useDebouncedValue = <T>(value: T, delay: number) => {
	const timerRef = useRef<Timer | null>(null)
	const [debounced, setDebounced] = useState(value)

	useEffect(() => {
		if (timerRef.current) {
			clearTimeout(timerRef.current)
		}

		timerRef.current = setTimeout(() => {
			setDebounced(value)
		}, delay)

		return () => {
			if (timerRef.current) {
				clearTimeout(timerRef.current)
			}
		}
	}, [value, delay])

	return debounced
}
