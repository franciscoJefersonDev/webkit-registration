import { writable } from 'svelte/store';
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
	apiKey: 'AIzaSyAodc3EHPvnONlgkqF8PzUJ7qL2DunTlNQ',
	authDomain: 'web-kit.firebaseapp.com',
	projectId: 'web-kit',
	storageBucket: 'web-kit.appspot.com',
	messagingSenderId: '930768219517',
	appId: '1:930768219517:web:871a89a65c5a3cbf6df014',
	measurementId: 'G-XPYJ7RCBKN'
};

export const app = initializeApp(firebaseConfig);
// export const analytics = writable(getAnalytics(app));
export let auth = writable(getAuth());
