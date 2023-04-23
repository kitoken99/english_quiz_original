//基礎変数
const questionLength = 1024;

//問題数の処理
let selectedValue = localStorage.getItem('selectedValue');
if(selectedValue===null){
  selectedValue="all";
  localStorage.setItem("selectedValue", selectedValue);
}
const selectBox = document.getElementById("selectedValue");
if (selectedValue) {
  for(let i = 0; i<selectBox.options.length; i++){
    if(selectBox.options[i].value == selectedValue){
      selectBox.options[i].selected=true;
      break;
    }
  }
}
selectBox.addEventListener("change", function() {
  const selectedValue = this.value;
  localStorage.setItem("selectedValue", selectedValue);
});

//苦手問題の処理
let check;
if (!JSON.parse(localStorage.getItem('check'))) {
  check = new Array;
}else{
  check = JSON.parse(localStorage.getItem('check'));
}
while(check.length<questionLength){
    check.push(0);
}
localStorage.setItem('check', JSON.stringify(check));
let $weakAmount=0;
for(let i = 0; i<questionLength; i++){
  if(check[i]==1)$weakAmount++;
}
document.getElementById('weak').textContent = `苦手単語のみ ( ${$weakAmount} 単語)`
let flagWeak = localStorage.getItem('flagWeak');
if(flagWeak===null){
  flagWeak=0;
  localStorage.setItem("flagWeak", flagWeak);
}
localStorage.setItem("flagWeak", flagWeak);
if(flagWeak==1){
  document.querySelector('#weakPoint').checked = true;
}
document.getElementById("weakPoint").addEventListener('change', function() {
  if(document.querySelector('#weakPoint').checked == true){
    flagWeak=1;
  }else{
    flagWeak=0;
  }
  localStorage.setItem("flagWeak", flagWeak);
});

// ランダム化チェックボックスの処理
let flagRandom = localStorage.getItem('flagRandom');
if(flagRandom===null){
  flagRandom=0;
  localStorage.setItem("flagRandom", flagRandom);
}
localStorage.setItem("flagRandom", flagRandom);
if(flagRandom==1){
  console.log("flagRandom");
  document.querySelector('#flexSwitchCheckDefault').checked = true;
}
document.getElementById("flexSwitchCheckDefault").addEventListener('change', function() {
  if(document.querySelector('#flexSwitchCheckDefault').checked == true){
    flagRandom=1;
  }else{
    flagRandom=0;
  }
  localStorage.setItem("flagRandom", flagRandom);
});

//問題範囲の処理
let startPoint = localStorage.getItem('startPoint');
if(startPoint===null){
  startPoint=0;
  document.getElementById("startPoint").setAttribute("max", questionLength);
  localStorage.setItem("startPoint", startPoint);
}else{
  document.getElementById("startPoint").value=startPoint;
  document.getElementById("endPoint").setAttribute("min", startPoint);
}
document.getElementById("startPoint").addEventListener("change", function() {
  const startPoint = this.value;
  document.getElementById("endPoint").setAttribute("min", this.value);
  localStorage.setItem("startPoint", startPoint);
  if(this.value>document.getElementById("endPoint").value){
    document.getElementById("endPoint").value=this.value;
  }
});
let endPoint = localStorage.getItem('endPoint');
if(endPoint===null){
  endPoint=questionLength;
  document.getElementById("endPoint").setAttribute("max", questionLength);
  localStorage.setItem("endPoint", endPoint);
}else{
  document.getElementById("endPoint").value=endPoint;
}
document.getElementById("endPoint").addEventListener("change", function() {
  const endPoint = this.value;
  localStorage.setItem("endPoint", endPoint);
});

//チャックボックスの処理
const selectedKindValues = JSON.parse(localStorage.getItem('selectedKindValues'));
const checkboxes = document.querySelectorAll('input[name="kind[]"]');
const allCheckbox = document.querySelector('#flexCheckChecked');
if (selectedKindValues) {
  checkboxes.forEach((checkbox) => {
    if (selectedKindValues.includes(checkbox.value)) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });
} else {
  console.log("ローカルストレージに値が保存されていません");
}

allCheckbox.addEventListener('change', function() {
  if(this.checked) {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = true;
    });
  } else {
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  }
});
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener('change', function() {
    if(!this.checked && allCheckbox.checked) {
      allCheckbox.checked = false;
    }
  });
});

//内容が適切かの確認
function validateForm() {
  const form = document.getElementById("myForm");
  let checked = false;
  const options = form.elements["kind[]"];

  for (let i = 0; i < options.length; i++) {
    if (options[i].checked) {
      checked = true;
      break;
    }
  }

  if (!checked) {
    alert("Please select at least one option.");
    return false;
  }

  // フォームを送信する
  return true;
}
// フォームを送信したときに実行される関数
function handleSubmit(event) {
  if(validateForm()){
    event.preventDefault(); // デフォルトのフォーム送信をキャンセル
    // フォームの値を取得してローカルストレージに保存する
    const kindInputs = document.querySelectorAll('input[name="kind[]"]:checked');
    const kindValues = Array.from(kindInputs).map(input => input.value);
    localStorage.setItem('selectedKindValues', JSON.stringify(kindValues));

    // 次のページに移動する
    window.location.href = 'quiz.html';
  }
}

// フォームを送信するイベントリスナーを追加する
const form = document.getElementById('myForm');
form.addEventListener('submit', handleSubmit);


