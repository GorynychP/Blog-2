import { useEffect, useState } from 'react';
import { styled } from 'styled-components';
const Discription = styled.div`
	font-style: italic;
	font-weight: 500;
`;

const FooterContainer = ({ className }) => {
	const [city, setСity] = useState('...');
	const [temperature, setTemperature] = useState('...');
	const [weather, setWeather] = useState('...');

	useEffect(() => {
		const asyncFetch = async () => {
			try {
				const response = await fetch(
					`https://api.openweathermap.org/data/2.5/weather?q=Istanbul&units=metric&lang=ru&appid=2d1568dbebc8c9afd52c2e59304c9d99`,
				);
				if (response.ok) {
					const data = await response.json();
					const { name, main, weather } = data;
					setСity(name);
					setTemperature(Math.round(main.temp));
					setWeather(weather[0].description);
				} else {
					console.error('API request failed:', response.statusText);
				}
			} catch (error) {
				console.error('An error occurred:', error);
			}
		};

		asyncFetch();
	}, []);

	return (
		<footer className={className}>
			<Discription>
				<div>Блог веб-разработчика</div>
				<div>web@developer.ru</div>
			</Discription>
			<div>
				<Discription>
					{city},{' '}
					{new Date().toLocaleString('ru', {
						day: 'numeric',
						month: 'long',
					})}
				</Discription>
				{}
				<Discription>
					{temperature} градусов, {weather}
				</Discription>
			</div>
		</footer>
	);
};
export const Footer = styled(FooterContainer)`
	display: flex;
	justify-content: space-between;
	width: 1000px;
	background-color: #fff;
	padding: 20px 40px;
	box-shadow: 0px -2px 17px #000;
	height: 140px;
	align-items: center;
	font-size: 18px;
`;
