const quizzes = JSON.parse(localStorage.getItem('quizzes'));
const check = JSON.parse(localStorage.getItem('check'));
// if (quizzes) {
//     quizzes.forEach((quiz) => {
//         console.log(`Question ${quiz.index}: ${quiz.question}`);
//         console.log(`Answer: ${quiz.answer}`);
//         console.log(`User answer: ${quiz.userAnswer}`);
//     });
// } else {
//     console.log("なにもないよ");
// }
let count = 0;
let total = 0;
const tbody = document.getElementById("result").getElementsByTagName("tbody")[0];
quizzes.forEach((quiz) => {
    // 行を作成
    const row = document.createElement("tr");
    total++;
    console.log(total);
    // インデックスのセルを作成して行に追加
    const indexCell = document.createElement("td");
    indexCell.textContent = quiz.index;
    row.appendChild(indexCell);
    //苦手ボックスのセルを作成して行に追加
    const checkCell = document.createElement("td");
    if(check[quizzes[total-1].id-1]===1){
        checkCell.innerHTML = "<input type='checkbox'class='check' checked>";
    }else{
        checkCell.innerHTML = "<input type='checkbox'class='check'>";
    }
    row.appendChild(checkCell);
    //正誤判定のセルを作成して行に追加
    const errataCell = document.createElement("td");
    if(quiz.answer==quiz.userAnswer){
        errataCell.textContent = "〇";
        errataCell.style.color = "red";
        count++;
    }
    else{
        errataCell.textContent = "✕";
        errataCell.style.color = "blue";
    }
    errataCell.style.fontWeight = "bold";
    row.appendChild(errataCell);
    // 問題のセルを作成して行に追加
    const questionCell = document.createElement("td");
    questionCell.textContent = quiz.question;
    row.appendChild(questionCell);
    // 答えのセルを作成して行に追加
    const answerCell = document.createElement("td");
    answerCell.textContent = quiz.answer;
    row.appendChild(answerCell);
    // ユーザーの回答のセルを作成して行に追加
    const userAnswerCell = document.createElement("td");
    userAnswerCell.textContent = quiz.userAnswer;
    row.appendChild(userAnswerCell);
    // 行をtbodyに追加
    tbody.appendChild(row);
});


document.getElementById("successRate").textContent = `${total}問中 ${count}問 正解!!`;
const checkboxes = document.querySelectorAll('.check');
checkboxes.forEach((checkbox, index)=>{
    checkbox.addEventListener('change', ()=>{
        const id = quizzes[index].id;
        check[id - 1] = checkbox.checked ? 1 : 0;
        localStorage.setItem('check', JSON.stringify(check));
    });
});