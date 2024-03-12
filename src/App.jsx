import { useState } from 'react';
import styles from './css-modules/app.module.css';

import { NUMS } from './data/numbers';

export function App() {
	let [operand1, setOperand1] = useState('');
	let [operator, setOperator] = useState('');
	let [operand2, setOperand2] = useState('');

	let [isCalculating, setIsCalculating] = useState(true);
	let result = null;

	const handleClickOnNmbBtn = event => {
		isCalculating = setIsCalculating(true);
		if (!operator) {
			operand1 =
				operand1 === undefined
					? setOperand1(Number('' + event.target.textContent))
					: setOperand1(Number(operand1 + event.target.textContent));
		}

		if (operator) {
			operand2 = setOperand2(Number(operand2 + event.target.textContent));
		}
	};

	const handleClickOnOperator = event => {
		if (event.target.textContent === '+' || event.target.textContent === '-') {
			operator = setOperator(event.target.textContent);
			isCalculating = setIsCalculating(true);
		} else if (event.target.textContent === '=') {
			isCalculating = setIsCalculating(false);
			result =
				operator === '+'
					? Number(operand1) + Number(operand2)
					: Number(operand1) - Number(operand2);
			operand1 = setOperand1(result);
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
	};

	let isResult = !result ? (
		<>
			{operand1}
			{operator}
			{operand2}
		</>
	) : (
		<>{result}</>
	);

	return (
		<div className={styles.container}>
			<p
				className={`${styles.display}  ${isCalculating ? styles.white : styles.green} ${operand1 || operand1 === 0 ? '' : styles.inactive}`}
			>
				{isResult}
			</p>
			<div className={styles.buttons}>
				<ul className={styles.numbers}>
					{NUMS.filter(item => Number(item) || Number(item) === 0)
						.reverse()
						.map(item => {
							return (
								<li key={item} className={styles.item}>
									<button
										className={`${styles.btnNum} ${styles.btn}`}
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
							<li key={item} className={styles.itemOper}>
								{item === '=' ? (
									<button
										className={`${styles.btnFunc} ${styles.btnEqual} ${styles.btn}`}
										onClick={handleClickOnOperator}
										disabled={
											operand2 || operand2 === 0 ? false : true
										}
									>
										{item}
									</button>
								) : (
									<button
										className={`${styles.btnFunc} ${styles.btn}`}
										onClick={handleClickOnOperator}
										disabled={
											operand1 || operand1 === 0 ? false : true
										}
									>
										{item}
									</button>
								)}
							</li>
						);
					})}
				</ul>
			</div>
			{NUMS.filter(item => item === 'C').map(item => {
				return (
					<button
						key={item}
						className={`${styles.reset} ${styles.btn}`}
						onClick={handleReset}
					>
						{item}
					</button>
				);
			})}
		</div>
	);
}
