<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import axios from 'axios';
	import { goto } from '$app/navigation';
	import {
		getAuth,
		onAuthStateChanged,
		createUserWithEmailAndPassword,
		sendSignInLinkToEmail
	} from 'firebase/auth';
	import { initializeApp } from 'firebase/app';
	import { getAnalytics } from 'firebase/analytics';
	import { auth } from '../stores';
	import { AddManualBtnsAnim } from '../webkit-components/buttonsAnimated';
	import { AddManualRipples } from '../webkit-components/ripples';
	import Alert from '../lib/Alert.svelte';
	import Load from '../lib/Load.svelte';

	const cdnImport = [
		'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.esm.js',
		'https://unpkg.com/ionicons@5.5.2/dist/ionicons/ionicons.js'
	];
	let isLoading = true;
	let isLoaded = false;
	let msgLoading = 'Loading...';
	let files: any;
	let image: any = '';
	let firstName: any;
	let lastName: any;
	let langs = [
		{ id: 1, text: `en-US` },
		{ id: 2, text: `pt-BR` }
	];
	let selected: any;
	let answer: any;
	let email: any;
	let password: any;
	let msgAlert: string = '';
	let openAlert: boolean = false;
	let setTime: any = '';
	const timeAlert: number = 2000;
	$: if (files) {
		const reader = new FileReader();
		reader.onload = () => {
			image = reader.result;
		};

		for (const file of files) {
			reader.readAsDataURL(file);
		}
	}
	const addAnimations = () => {
		const btnsAnimated: any = document.querySelectorAll<HTMLButtonElement>('.btn-anim')!;
		const btnsRipple: any = document.querySelectorAll<HTMLButtonElement>('.ripples')!;
		AddManualBtnsAnim(btnsAnimated);
		AddManualRipples(btnsRipple);
	};
	onMount(async () => {
		(await import(cdnImport[0])).default;
		(await import(cdnImport[1])).default;
		isLoading = false;
		isLoaded = true;
		auth.subscribe((value) => {
			console.log(value)
		})
	});
	const openExplorerFiles = () => {
		const inputFiles = document.querySelector<HTMLInputElement>('#image')!;
		inputFiles.click();
	};
	const validate = () => {
		isLoading = true;
		msgLoading = 'validating...';
		axios
			.post('https://8000-franciscoje-webkitregis-bwyjoknr8c0.ws-us62.gitpod.io/validate', {
				firstNameUser: firstName,
				lastNameUser: lastName,
				langUser: 'en-US',
				emailUser: email,
				passwordUser: password
			})
			.then(function (response) {
				msgLoading = 'sign-up webkit...';
				auth.subscribe((value) => {
					createUserWithEmailAndPassword(value, email, password)
						.then((userCredential) => {
							// Signed in
							const user = userCredential.user;
							console.log(user);
							const actionCodeSettings = {
								// URL you want to redirect back to. The domain (www.example.com) for this
								// URL must be in the authorized domains list in the Firebase Console.
								url: 'https://5173-franciscoje-webkitregis-bwyjoknr8c0.ws-us62.gitpod.io/' + user.email,
								// url: 'https://5173-franciscoje-webkitregis-bwyjoknr8c0.ws-us62.gitpod.io/',
								// This must be true.
								handleCodeInApp: true,
							};
							sendSignInLinkToEmail(value, email, actionCodeSettings)
						.then(() => {
							// The link was successfully sent. Inform the user.
							// Save the email locally so you don't need to ask the user for it again
							// if they open the link on the same device.
							window.localStorage.setItem('emailForSignIn', email);
							console.log(email);
							// ...
						})
						.catch((error) => {
							const errorCode = error.code;
							const errorMessage = error.message;
							console.log(errorMessage);
							// ...
						});
							// ...
						})
						.catch((error) => {
							const errorCode = error.code;
							const errorMessage = error.message;
							console.log(errorMessage);
							// ..
						});
						
				})
			})
			.catch(function (error) {
				isLoading = false;
				if (error.response.status === 0) {
					openAlert = true;
					msgAlert = 'Unexpected error, please try again!';
					clearTimeout(setTime);
					setTime = setTimeout(() => {
						openAlert = false;
						msgAlert = '';
					}, timeAlert);
				}
				if (error.response.status === 400) {
					openAlert = true;
					msgAlert = error.response.data.error;
					clearTimeout(setTime);
					setTime = setTimeout(() => {
						openAlert = false;
						msgAlert = '';
					}, timeAlert);
				}
			});
	};
	const selectLang = () => {
		const selectLangElement = document.querySelector<HTMLSelectElement>('#select-lang')!;
		selectLangElement.click();
	};
</script>

<main class="registration">
	<Load {isLoading} {msgLoading} />
	{#if isLoaded}
		<div
			class="registration__card"
			transition:fade={{ duration: 200 }}
			on:introend={() => addAnimations()}
		>
			<h1 class="text-h1">WEBKIT REGISTRATION</h1>
			<div class="image-select">
				<label for="image">Your image:</label>
				<div>
					<button class="wk-btn ripples" on:click={openExplorerFiles}>
						<ion-icon name="cloud-upload-outline" />
						Upload image
					</button>
					<input accept="image/png, image/jpeg" bind:files id="image" type="file" hidden />
					{#if image !== ''}
						<img src={image} alt="" />
					{/if}
				</div>
			</div>
			<div class="container-form">
				<label for="first-name">Your first name: </label>
				<input
					type="text"
					id="first-name"
					bind:value={firstName}
					placeholder="your first name..."
					class="wk-input-text text-left"
				/>
			</div>
			<div class="container-form">
				<label for="last-name">Your last name: </label>
				<input
					type="text"
					id="last-name"
					bind:value={lastName}
					placeholder="your last name..."
					class="wk-input-text text-left"
				/>
			</div>
			<div class="container-form">
				<label for="select-lang">Your language:</label>
				<select
					class="wk-btn ripples"
					id="select-lang"
					bind:value={selected}
					on:change={() => (answer = '')}
				>
					{#each langs as lang}
						<option value={lang}>
							{lang.text}
						</option>
					{/each}
					<ion-icon name="chevron-down-outline" />
				</select>
			</div>
			<div class="container-form">
				<label for="email">Your email:</label>
				<input
					type="email"
					id="email"
					bind:value={email}
					placeholder="your email..."
					class="wk-input-text text-left"
				/>
			</div>
			<div class="container-form">
				<label for="password">Your password:</label>
				<input
					type="password"
					id="password"
					bind:value={password}
					placeholder="......"
					class="wk-input-text text-left"
				/>
			</div>
			<button class="wk-btn btn-anim ripples" on:click={validate}>
				<ion-icon name="log-in-outline" />
				Registre
			</button>
		</div>
		<Alert msg={msgAlert} {openAlert} />
	{/if}
</main>

<style lang="scss">
	img {
		width: 50px;
		height: 50px;
		border-radius: 1em;
	}
	.registration {
		width: 100%;
		height: 100%;
		background-color: rgb(var(--bg-color));
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 0.5em;
		&__card {
			& h1 {
				margin-left: auto;
				margin-right: auto;
				color: rgb(var(--text-color));
			}
			& label {
				font-size: var(--fs);
				color: rgb(var(--text-color));
			}
			width: 95%;
			margin: auto;
			max-width: 500px;
			height: min-content;
			padding: 0.7em;
			border-radius: 1em;
			border: 0.1em solid rgba(var(--text-color), 0.2);
			display: flex;
			align-items: flex-start;
			justify-content: center;
			flex-direction: column;
			row-gap: 0.5em;
			& .image-select {
				width: 100%;
				& div {
					& button {
						width: max-content;
						padding: 0.3em 1em;
						column-gap: 0.3em;
					}
					width: 100%;
					display: flex;
					align-items: center;
					justify-content: flex-start;
					column-gap: 0.5em;
				}
			}
			& .container-form {
				width: 100%;
			}
			& input {
				background-color: transparent;
				color: rgb(var(--text-color));
				font-size: var(--fs);
				padding: 0.5em;
				width: 100%;
				--brd-radius: 1em;
				--brd-color: rgba(var(--text-color), 0.2);
				--brd-size: 0.1em;
				--ph-color: rgb(var(--primary));
				--select-color: rgb(var(--primary));
				--select-color-text: rgb(255, 255, 255);
			}
			& select {
				background-color: rgb(var(--primary));
				color: rgb(255, 255, 255);
				padding: 0.3em 2em 0.3em 1em;
				column-gap: 0.3em;
				-webkit-appearance: none;
				-moz-appearance: none;
				appearance: none;
				background-image: url("data:image/svg+xml,%3Csvg width='30px' height='30px' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='none' stroke='rgb(255, 255, 255)' stroke-linecap='round' stroke-linejoin='round' stroke-width='40' d='M112 184l144 144 144-144'/%3E%3C/svg%3E%0A");
				background-repeat: no-repeat;
				background-position: right center;
				--rp-color: rgba(255, 255, 255, 0.2);
				--rp-transition: 200;
				--brd-radius: 1em;
				&::-ms-expand {
					display: none;
				}
			}
			& button {
				background-color: rgb(var(--primary));
				color: rgb(255, 255, 255);
				width: 100%;
				padding: 0.5em;
				column-gap: 0.3em;
				transition: border-radius linear 200ms, box-shadow linear 200ms;
				--bsw-default: 0px 0px 0px 0px rgba(0, 0, 0, 0);
				--bsw-after: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
				--brd-default: var(--brd-radius);
				--brd-after: 0.2em;
				--rp-color: rgba(255, 255, 255, 0.2);
				--rp-transition: 200;
				--brd-radius: 1em;
			}
		}
	}
</style>
