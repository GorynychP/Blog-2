import { useEffect } from 'react';
import { useStore } from 'react-redux';

export const useResetForm = (reset) => {
	const store = useStore();
	useEffect(() => {
		let currentWasLogouyt = store.getState().app.wasLogout;
		return store.subscribe(() => {
			let previousWasLogout = currentWasLogouyt;
			currentWasLogouyt = store.getState().app.wasLogout;
			if (currentWasLogouyt !== previousWasLogout) {
				reset();
			}
		});
	}, [store, reset]);
};
