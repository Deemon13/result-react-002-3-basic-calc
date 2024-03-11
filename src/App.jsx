import { useState } from 'react';
import styles from './css-modules/app.module.css';

import { NUMS } from './data/numbers';

export function App() {
	let [operand1, setOperand1] = useState('');
	let [operator, setOperator] = useState('');
	let [operand2, setOperand2] = useState('');

	// let [result, setResult] = useState(null);

	let result = null;

	const handleClickOnNmbBtn = event => {
		if (!operator) {
			operand1 = setOperand1(Number(operand1 + event.target.textContent));
			// console.dir('operand1', event.target.textContent);
		}

		if (operator) {
			operand2 = setOperand2(Number(operand2 + event.target.textContent));
			// console.dir('operand2', event.target.textContent);
		}
	};

	const handleClickOnOperator = event => {
		if (event.target.textContent === '+' || event.target.textContent === '-') {
			operator = setOperator(event.target.textContent);
			// console.dir(event.target.textContent);
		} else if (event.target.textContent === '=') {
			result =
				operator === '+'
					? Number(operand1) + Number(operand2)
					: Number(operand1) - Number(operand2);

			// console.log('result:', result);
			setOperand1(result);
			operator = setOperator('');
			operand2 = setOperand2('');
		} else {
			return;
		}
	};

	const handleReset = () => {
		operand1 = setOperand1('');
		operator = setOperator('');
		operand2 = setOperand2('');
		// result = setResult(null);
	};

	let isResult = !result ? (
		<span className={styles.display}>
			{operand1}
			{operator}
			{operand2}
		</span>
	) : (
		<span className={styles.display}>{result}</span>
	);

	return (
		<div className={styles.container}>
			{' '}
			{isResult}
			{/* <span className={styles.display}>
				{operand1}
				{operator}
				{operand2}
			</span> */}
			<div className={styles.buttons}>
				<ul className={styles.numbers}>
					{NUMS.filter(item => Number(item) || Number(item) === 0).map(item => {
						return (
							<li key={item} className={styles.item}>
								<button
									className={styles.btnNum}
									onClick={handleClickOnNmbBtn}
								>
									{item}
								</button>
							</li>
						);
					})}
				</ul>
				<ul className={styles.operators}>
					{NUMS.filter(
						item => item === '-' || item === '=' || item === '+',
					).map(item => {
						return (
							<li key={item} className={styles.item}>
								<button
									className={styles.btnNum}
									onClick={handleClickOnOperator}
								>
									{item}
								</button>
							</li>
						);
					})}
				</ul>
			</div>
			<button className={styles.reset} onClick={handleReset}>
				C
			</button>
		</div>
	);
}
