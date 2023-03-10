//* ==================== Variables ====================
const keyInput = document.querySelector("#key");
const plaintext = document.querySelector("#plaintext");
const output = document.querySelector(".result");
const submit = document.querySelector("input[type='submit']");
const selectDecode = document.querySelector("#decode");
const selectEncode = document.querySelector("#encode");

//* ==================== Functions ===================
const choose = () => {
	selectDecode.checked
		? (submit.value = "DECRYPT")
		: (submit.value = "ENCRYPT");
};

//* Only enable click event if all input field are filled!!
submit.addEventListener("click", () => {
	if (!selectDecode.checked && !selectEncode.checked && keyInput.value == "") {
		return;
	} else if (selectDecode.checked && !keyInput.value == "") {
		decode(plaintext.value);
	} else if (selectEncode.checked && !keyInput.value == "") {
		encode(plaintext.value);
	}
});

const firstCharCode = 65;
const lastCharCode = 90;
const nonAlphabet = [32, 33, 46, 63]; // space, !, . ?

function encode(word) {
	let key = +keyInput.value;
	let encodedWord = "";

	for (let letter = 0; letter < word.length; letter++) {
		let shiftedLetter = "";
		//* (1) Word to uppercase for easier transformation & get charCode
		let charCode = word.toUpperCase().charCodeAt(letter);
		//* (2) Shift the alphabet by key to the right (add key) or keep if nonAlphabetical
		if (nonAlphabet.includes(charCode)) {
			shiftedLetter = charCode;
		} else if (charCode + key > lastCharCode) {
			shiftedLetter = charCode + key - lastCharCode + (firstCharCode - 1);
		} else {
			shiftedLetter = charCode + key;
		}
		//* (3) Get the letter from the new CharCode
		let encodedLetter = String.fromCharCode(shiftedLetter);

		//* (4) Add the letter to the encoded word
		encodedWord += encodedLetter;
	}
	output.innerHTML = encodedWord;
}

function decode(word) {
	let decodedWord = "";
	let key = +keyInput.value;
	for (let letter = 0; letter < word.length; letter++) {
		let unshiftedLetter = "";

		//* (1) Word to uppercase for easier transformation & get charCode
		let charCode = word.toUpperCase().charCodeAt(letter);
		//* (2) Shift the alphabet by key to the left (subtract key) or keep if nonAlphabetical
		if (nonAlphabet.includes(charCode)) {
			unshiftedLetter = charCode;
		} else if (charCode - key < firstCharCode) {
			unshiftedLetter = lastCharCode + 1 - (firstCharCode - (charCode - key));
		} else {
			unshiftedLetter = charCode - key;
		}
		//* (3) Get the Letter from the new CharCode
		let encodedLetter = String.fromCharCode(unshiftedLetter);

		//* (4) Add the letter to the decoded word
		decodedWord += encodedLetter;
	}
	output.innerHTML = decodedWord;
}

/* 
! Used string 

const alphabet = "abcdefghijklmnopqrstuvwxyz";

function encode(word) {
	let key = +keyInput.value;
	let encodedWord = "";

	for (let letter = 0; letter < word.length; letter++) {
		let shiftedLetter = "";
		let index = word.toLowerCase()[letter];
		for (let position = 0; position < alphabet.length; position++) {
			if (alphabet[position] == index) {
				if (position + key < alphabet.length) {
					shiftedLetter = alphabet[position + key];
				} else {
					shiftedLetter = alphabet[position + key - alphabet.length];
				}
			}
		}
		encodedWord += shiftedLetter;
	}
    output.innerHTML = encodedWord.toUpperCase();
}

function decode(word) {
	let key = +keyInput.value;
	let decodedWord = "";

	for (let letter = 0; letter < word.length; letter++) {
		let unshiftedLetter = "";
		let index = word.toLowerCase()[letter];
		for (let position = 0; position < alphabet.length; position++) {
			if (alphabet[position] == index) {
				if (position - key > 0) {
					unshiftedLetter = alphabet[position - key];
					console.log(unshiftedLetter);
				} else {
					unshiftedLetter = alphabet[alphabet.length + (position - key)];
				}
			}
		}
		decodedWord += unshiftedLetter;
	}
    output.innerHTML = decodedWord.toUpperCase();

} */
