import React, { useState } from 'react';
import question_data from './api/questions';
import answer_data from './api/answer';

export default function App() {
	const questions = question_data

	const [currentQuestion, setCurrentQuestion] = useState(0);
	const [showResult, setShowResult] = useState(false);
	const [points, setPoints] = useState({"A": 0, "B": 0, "C": 0, "D": 0, "A2": 0, "B2": 0, "C2": 0, "D2": 0});
	const [result, setResult] = useState("");

	const handleAnswerOptionClick = (answer_type) => {
		setPoints(prevPoints => {
			let res = {...prevPoints};
			res[answer_type] = prevPoints[answer_type] + 1;
			setResult(() => {
				let totalPoints = {}
				totalPoints["Red"] = points.A + points.D2;
				totalPoints["Blue"] = points.B + points.C2;
				totalPoints["Yellow"] = points.C + points.B2;
				totalPoints["Green"] = points.D + points.A2;
				let maxPointColor = "";
				let maxPoint = -1
				Object.entries(totalPoints).map(([key, value]) => {
					if (maxPoint < value) {
						maxPoint = value;
						maxPointColor = key;
					}
					return maxPointColor;
				})
				let summary = "Tổng điểm: Màu đỏ: " + totalPoints.Red + " - Màu xanh dương: " + totalPoints.Blue + " - Màu vàng: " + totalPoints.Yellow + " - Màu xanh lá: " + totalPoints.Green + "\nMàu chủ đạo của bạn là: ";
				switch(maxPointColor) {
					case "Red":
						return summary + answer_data["Red"];
					case "Blue":
						return summary + answer_data["Blue"];
					case "Yellow":
						return summary + answer_data["Yellow"];
					case "Green":
						return summary + answer_data["Green"];
					default:
						return "Khong load duoc";
				}
			})
			return res;
		});
		const nextQuestion = currentQuestion + 1;
		if (nextQuestion < questions.length) {
			setCurrentQuestion(nextQuestion);
		} else {
			setShowResult(true);
			
		}
	};
	return (
		<div className='app'>
			<h1 className='header'>TRẮC NGHIỆM TÂM LÝ: ĐÂU LÀ MÀU SẮC CHỦ ĐẠO TRONG TÍNH CÁCH CỦA BẠN?</h1>
			<div className='legend'>Nguồn: Weibo Việt Name - Zhihu</div>
			{showResult ? (
				<div className='score-section'>
					<span className='display-linebreak'>
						Kết quả của bạn là: {result}
					</span>
				</div>
			) : (
				<>
					<div className='question-section'>
						<div className='question-count'>
							<span>Câu {currentQuestion + 1}</span>/{questions.length}
						</div>
						<div className='question-text'>{questions[currentQuestion].questionText}</div>
					</div>
					<div className='answer-section'>
						{questions[currentQuestion].answerOptions.map((answerOption) => (
							<button onClick={() => handleAnswerOptionClick(answerOption.answer_type)}>{answerOption.answerText}</button>
						))}
					</div>
				</>
			)}
		</div>
	);
}
