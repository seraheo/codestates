const calculator = document.querySelector('.calculator'); // calculator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const buttons = calculator.querySelector('.calculator__buttons'); // calculator__keys 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

const firstOperend = document.querySelector('.calculator__operend--left'); // calculator__operend--left 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const operator = document.querySelector('.calculator__operator'); // calculator__operator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const secondOperend = document.querySelector('.calculator__operend--right'); // calculator__operend--right 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const calculatedResult = document.querySelector('.calculator__result'); // calculator__result 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

function calculate(n1, operator, n2) {
  let result = 0;
  // TODO : n1과 n2를 operator에 따라 계산하는 함수를 만드세요.
  // ex) 입력값이 n1 : '1', operator : '+', n2 : '2' 인 경우, 3이 리턴됩니다.
  if(operator === '+') {
    return String(Number(n1) + Number(n2))
  }
  if(operator === '-') {
    return Number(n1) - Number(n2)
  }
  if(operator === '*') {
    return Number(n1) * Number(n2)
  }
  if(operator === '/') {
    return Number(n1) / Number(n2)
  }
  return String(result);
}

buttons.addEventListener('click', function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드(Line 19 - 21)는 수정하지 마세요.
  console.log(target);
  console.log(action);
  console.log(buttonContent);

  if (target.matches('button')) {
    // TODO : 계산기가 작동할 수 있도록 아래 코드를 수정하세요. 작성되어 있는 조건문과 console.log를 활용하시면 쉽게 문제를 풀 수 있습니다.
    // 클릭된 HTML 엘리먼트가 button이면
    if (action === 'number') {
      // 그리고 버튼의 클레스가 number이면
      // 아래 코드가 작동됩니다.
      if(firstOperend.textContent === '0') {
        firstOperend.textContent = buttonContent;
      } else if (firstOperend.textContent !== '0') {
        secondOperend.textContent = buttonContent;
      }
      console.log('숫자 ' + buttonContent + ' 버튼');
    }

    if (action === 'operator') {
      operator.textContent = buttonContent;

      console.log('연산자 ' + buttonContent + ' 버튼');
    }

    if (action === 'decimal') {
      console.log('소수점 버튼');
    }

    if (action === 'clear') {
      firstOperend.textContent = '0'
      operator.textContent = '+'
      secondOperend.textContent = '0'
      calculatedResult.textContent = '0'
      console.log('초기화 버튼');
    }

    if (action === 'calculate') {
      calculatedResult.textContent = calculate(firstOperend.textContent, operator.textContent, secondOperend.textContent)
      console.log('계산버튼');
    }
  }
});


// ! Advanced Challenge test와 Nightmare test를 위해서는 아래 주석을 해제하세요.
const display = document.querySelector('.calculator__display--for-advanced'); // calculator__display 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
let firstNum, operatorForAdvanced, previousKey, previousNum;

buttons.addEventListener('click', function (event) {

  const target = event.target; 
  const action = target.classList[0];
  const buttonContent = target.textContent;
  const buttonContainerArray = buttons.children;

  if (target.matches('button')) {
    for (let i = 0; i < buttonContainerArray.length; i++) {
      const childrenArray = buttonContainerArray[i].children;
      for (let j = 0; j < childrenArray.length; j++) {
        childrenArray[j].classList.remove('isPressed');
      }
    }

    if (action === 'number') {
      if (display.textContent === '0' || previousKey === 'operator' || previousKey === 'calculate') { 
        display.textContent = buttonContent;//직전에 누른 버튼이 연산자 이거나 계산키, 그리고 아무것도 입력되지않은 0일 경우에 지금 누른 숫자의 버튼이 처음 디스플레이에 찍히도록 한다. 
      } else {
        display.textContent = display.textContent + buttonContent; //class가 number에 해당하는 버튼을 눌렀을 때 기존에 숫자가 있는 경우는 그 뒤에 붙여서 concatenation한다.
      }
      previousKey = 'number'; //방금 누른 키가 number이므로 previousKey로 셋팅한다. 
    }

    if (action === 'operator') {
      target.classList.add('isPressed');
      if (firstNum && operatorForAdvanced && previousKey !== 'operator' && previousKey !== 'calculate') {
        //첫번째 누른 숫자(operator 이전에 누른 숫자)와 연산자가 있으면 그리고 연산자를 연속으로 누른게아니라면 또한 결과 계산(enter) 후 연산자를 누른게 아니라면(그러니까 연산자 이후 number를 다시 눌렀다면)
        display.textContent = calculate(firstNum, operatorForAdvanced, display.textContent);
        //operator키를 누를 시 화면에 나타나는 값은 calculate함수에 의해 계산되는 문자열 타입의 리턴 값
      }
      firstNum = display.textContent; //처음 연산자를 누르면 firstNum은 연산자가 입려되기 전 화면에 있던 값이다.

      //operator 이후에 다시 숫자를 넣으면 이전에 계산한 값들이 날아가고 display.textContext가 다시 정의 되므로 그전에 firstNum에 operator버튼을 눌러 계산한 값을 넣어준다.
      //그리하여 다시 숫자 버튼이 눌러진 이후 연산자 버튼을 눌렀을 때 110번째 줄에 firstNum으로 들어가 현재화면의 있는 값과 다시 calculate함수에 들어가 값을 리턴하기를 반복할 것이다.

      operatorForAdvanced = buttonContent; //operatorForAdvanced는 operator버튼을 처음 눌렀을 때 button의 textContent.
      previousKey = 'operator';//방금 누른 키가 operator이므로 previousKey로 셋팅한다. 
    }

    if (action === 'decimal') {
      if (!display.textContent.includes('.') && previousKey !== 'operator') {
        //소숫점은 숫자스트링에 하나만 들어갈 수 있기 때문에 화면에 '.'가 없다면 그리고 number버튼 혹은 calculate(enter)버튼을 눌렀다면(operator를 누른 직후가 아니라면)
        display.textContent = display.textContent + '.';
        //기존의 있던 숫자(이 숫자에는 .이 포함되어있지 않다.)뒤에 '.'을 붙여준다. 
      } else if (previousKey === 'operator') {
        //연산자 버튼을 누른 후 '.'을 찍는다면 
        display.textContent = '0.'; 
        //화면에는 '0.'이 표시된다.
      }
      previousKey = 'decimal';//방금 누른 키가 decimal이므로 previousKey로 셋팅한다. 
    }

    if (action === 'clear') {
      firstNum = undefined; 
      operatorForAdvanced = undefined;
      previousNum = undefined;
      previousKey = 'clear';
      //어떠한 수나 연산자 기타 다른 버튼이 눌렸을 시 정의되어지는 값들을 초기화
      display.textContent = '0';//방금 누른 키가 AC이므로 초기의 상태로 만들어준다. 
    }

    if (action === 'calculate') {
      if (firstNum) { //calculate(enter)버튼을 누른다는 것은 firstNum과 operator를 누른 후 firstNum과 연산해야하는 다른 수가 있다는 것을 가정하기에 firstNum이 있다면을 가정했다.
        if (previousKey === 'calculate') { 
          //enter를 연속으로 누른 경우
          display.textContent = calculate(display.textContent, operatorForAdvanced, previousNum);
          //(n1 + operator + n2의 결과값) + operatorForAdvanced(직전에 계산한 연산자) + n2의 결과를 화면에 나타낸다.
        } else {
          //enter가 아닌 수를 이전에 누른 경우 n1 + operator + n2(숫자) + (enter할 차례)
          previousNum = display.textContent;
          //n2가 previousNum
          display.textContent = calculate(firstNum, operatorForAdvanced, display.textContent);
          //화면에 출력되는 값은 n1 + operator + n2의 결과값이다. 
        }
      }
      previousKey = 'calculate';//방금 누른 키가 calculate이므로 previousKey로 셋팅한다. 
    }
  }
});