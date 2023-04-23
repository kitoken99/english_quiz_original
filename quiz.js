
//ローカルストーレッジ
const selectedKindValues = JSON.parse(localStorage.getItem('selectedKindValues'));
const check = JSON.parse(localStorage.getItem('check'))
const flagWeak = JSON.parse(localStorage.getItem('flagWeak'))
const flagRandom = localStorage.getItem('flagRandom');
const selectedValue = localStorage.getItem('selectedValue');
const startPoint = localStorage.getItem('startPoint');
const endPoint = localStorage.getItem('endPoint');

//phpとのconnection
//test
// const url = "http://localhost:8888/english_quiz/quiz.php?selectedKindValues=" + JSON.stringify(selectedKindValues);
//actural connection
const url = "https://kitoken.sakura.ne.jp/quiz/quiz.php?selectedKindValues=" + JSON.stringify(selectedKindValues);

// XMLHttpRequestオブジェクトを作成
const xhr = new XMLHttpRequest();
// リクエストを開始
xhr.open("GET", url, true);
xhr.send();
// レスポンスが返ってきた時の処理
xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
    const json = xhr.responseText;
    let data = JSON.parse(json);
    chooseQuestion(data);
    }
};

function chooseQuestion(data){
    if(flagWeak==1){
        for(let i=0; i<data.length; i++){
            if(check[data[i].id-1]===0){
                data.splice(i,1);
                i--;
            }
        }
    }
    if(data.length===0){
        alert("苦手単語がこのセクションには存在しません");
        window.location.href = 'menu.html';
    }
    if(endPoint<data.length){
        data.splice(endPoint,data.length-endPoint);
    }
    if(startPoint>0){
        data.splice(0, startPoint-1);
    }
    if(data.length==0){
        alert("指定された範囲内に問題がありません。");
        window.location.href = 'menu.html';
    }else{
        processData(data);
    }

}

function processData(data) {
    //基礎変数定義
    class quizProducer{
        constructor(i=0,j, question="", answer=""){
        this.id = j,
        this.index = i,
        this.question = question;
        this.answer = answer;
        this.userAnswer = "";
        }
    };
    let index = 0;
    const min = 0;
    let max = data.length;
    const quizzes = [];
    const correctMusic = new Audio('mp3/Quiz-Correct_Answer02-1.mp3');
    const incorrectMusic = new Audio('mp3/Quiz-Wrong_Buzzer02-1.mp3');
    let amount;
    if(selectedValue==="all" || selectedValue>data.length){
        amount=data.length;
    }else{
        amount=selectedValue
    }
    if(flagRandom==1){
        shuffleArray();
    }
    // 画面表示
    init();
    setupQuestion();
    function shuffleArray(){
        let cloneArray = [...data]
        for (let i = cloneArray.length - 1; i >= 0; i--) {
          let rand = Math.floor(Math.random() * (i + 1))
            let tmpStorage = cloneArray[i]
            cloneArray[i] = cloneArray[rand]
            cloneArray[rand] = tmpStorage
        }
        data = cloneArray
    }
    function init(){
        document.getElementById("answer").value="";
        document.getElementById('correctAnswer').style.visibility = "hidden";
        document.getElementById("correct").style.opacity = "0";
        document.getElementById("incorrect").style.opacity = "0";
    }
    function setupQuestion(){
        quiz = new quizProducer( index+1, data[index].id, data[index].definition, data[index].word);
        quizzes.push(quiz);
        document.getElementById('order').textContent=`${index+1}/${amount}`;
        document.getElementById('question').textContent=quizzes[index].question;
        document.getElementById('correctAnswer').textContent=quizzes[index].answer;
        console.log(quizzes[index].id-1);
        if(check[quizzes[index].id-1]===1){
            document.querySelector('#check').checked = true;
        }else{
            document.querySelector('#check').checked = false;
        }
    }


document.getElementById("check").addEventListener('change', function() {
    let i = quizzes[index].id-1;
    console.log(i);
    if(document.querySelector('#check').checked == true){
        check[i]=1;
    }else{
        check[i]=0;
    }
    localStorage.setItem('check', JSON.stringify(check));
    console.log(check);
});



    

    

    
    function getAnswer(){
        document.getElementById('correctAnswer').style.visibility = "visible";
        quizzes[index].userAnswer = document.getElementById("answer").value;
            if(document.getElementById("answer").value===quizzes[index].answer){
                correctMusic.currentTime = 0; //連続クリックに対応
                correctMusic.play();
                document.getElementById("correct").style.opacity = "0.6";
            }else{
                incorrectMusic.currentTime = 0; //連続クリックに対応
                incorrectMusic.play();
                document.getElementById("incorrect").style.opacity = "0.4";
            }
            document.getElementById("btn").textContent="次へ";
    }

    function nextQuestion(){
        index++;
        if(index<amount){
            init();
            setupQuestion();
            document.getElementById("btn").textContent="回答";
        }else{
            localStorage.setItem("quizzes", JSON.stringify(quizzes));
            location.href = "result.html" ;
        }
    }

    document.getElementById("btn").addEventListener("click",()=>{
        if(document.getElementById("btn").textContent==="回答"){
            getAnswer();
        }else{
            nextQuestion();
        }
    })
    document.addEventListener("keyup", function(event) {
        if (event.key === 'Enter') {
            if(document.getElementById("btn").textContent==="回答"){
                getAnswer();
            }else{
                nextQuestion();
            }
        }
    });
}
document.addEventListener('gesturestart', function (e) {
    e.preventDefault();
});

