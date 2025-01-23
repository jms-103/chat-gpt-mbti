const questions = [
    // E vs I
    { id: 1, text: "다양한 사람들과 교류하는 것이 즐겁습니까?", yes: "E", no: "I" },
    { id: 2, text: "혼자 시간을 보내는 것이 편안하다고 느끼십니까?", yes: "I", no: "E" },
    { id: 3, text: "파티나 모임에서 에너지를 얻는 편인가요?", yes: "E", no: "I" },

    // S vs N
    { id: 4, text: "현실적인 정보를 다루는 것이 더 편하십니까?", yes: "S", no: "N" },
    { id: 5, text: "미래의 가능성을 상상하는 것을 좋아하십니까?", yes: "N", no: "S" },
    { id: 6, text: "세부 사항에 집중하기보다는 큰 그림을 보는 것을 선호합니까?", yes: "N", no: "S" },

    // T vs F
    { id: 7, text: "결정을 내릴 때 논리와 사실에 의존하는 편입니까?", yes: "T", no: "F" },
    { id: 8, text: "다른 사람의 감정에 민감하게 반응하십니까?", yes: "F", no: "T" },
    { id: 9, text: "객관적인 판단이 감정적인 판단보다 중요하다고 생각하십니까?", yes: "T", no: "F" },

    // J vs P
    { id: 10, text: "계획을 세우고 그것을 따르는 것을 좋아하십니까?", yes: "J", no: "P" },
    { id: 11, text: "마감 기한이 임박했을 때 더 효율적으로 일하십니까?", yes: "P", no: "J" },
    { id: 12, text: "예측 가능한 환경에서 일하는 것을 선호하십니까?", yes: "J", no: "P" }
];
let currentQuestionIndex = 0; // 현재 질문의 인덱스
let answers = []; // 사용자의 답변을 저장할 배열

// 첫 번째 질문을 화면에 표시
document.getElementById("question").textContent = questions[currentQuestionIndex].text;
document.getElementById("question-number").textContent = `질문 ${currentQuestionIndex + 1}`;

// 예 버튼 클릭 이벤트
document.getElementById("yes-button").addEventListener("click", () => {
    handleAnswer("yes");
});

// 아니오 버튼 클릭 이벤트
document.getElementById("no-button").addEventListener("click", () => {
    handleAnswer("no");
});

// 사용자가 버튼을 클릭했을 때의 처리 함수
function handleAnswer(answer) {
    const currentQuestion = questions[currentQuestionIndex];

    // 답변을 알파벳으로 저장 (예: "E" 또는 "I")
    if (answer === "yes") {
        answers.push(currentQuestion.yes); // 예 답변에 해당하는 알파벳 저장
    } else {
        answers.push(currentQuestion.no); // 아니오 답변에 해당하는 알파벳 저장
    }

    // 다음 질문으로 넘어가기 전에 체크
    currentQuestionIndex++;

    // 마지막 질문이라면 결과 계산 및 페이지 이동
    if (currentQuestionIndex < questions.length) {
        // 다음 질문으로 넘어가고 번호 업데이트
        document.getElementById("question").textContent = questions[currentQuestionIndex].text;
        document.getElementById("question-number").textContent = `질문 ${currentQuestionIndex + 1}`;
    } else {
        // 마지막 질문을 넘겼다면 결과 계산
        const result = calculateMBTI(answers);
        
        // 결과를 로컬스토리지에 저장
        localStorage.setItem("mbti_result", result);

        // 결과 페이지로 이동
        window.location.href = "result.html"; // 결과 페이지로 이동
    }
}

// MBTI 계산 함수
function calculateMBTI(answers) {
    // E, N, T, J 지표에 대한 카운트
    let E = 0, I = 0, N = 0, S = 0, T = 0, F = 0, J = 0, P = 0;

    // 각 알파벳이 몇 번 등장했는지 세기
    answers.forEach(answer => {
        switch (answer) {
            case "E":
                E++;
                break;
            case "I":
                I++;
                break;
            case "N":
                N++;
                break;
            case "S":
                S++;
                break;
            case "T":
                T++;
                break;
            case "F":
                F++;
                break;
            case "J":
                J++;
                break;
            case "P":
                P++;
                break;
        }
    });

    // 각 지표에서 더 많이 나온 알파벳을 선택
    const EI = E > I ? "E" : "I";
    const NS = N > S ? "N" : "S";
    const TF = F > T ? "F" : "T";
    const JP = P > J ? "P" : "J";

    // 결과는 네 글자 형식으로 반환
    return EI + NS + TF + JP;
}
