/*******************************************************************
// 설명 : 전역 변수
********************************************************************/
let passwordState = false; //일반 비밀번호 유효성
let passwordCheck = false; //일반 비밀번호 일치 확인

/*******************************************************************
// 설명 : 공통정의 함수
********************************************************************/

/**
 * 비밀번호 유효성 오류 텍스트
 * @param {DomClass} targetClass
 * @param {String} message 에러 메시지
 */

const errorText = (targetClass, message) =>
  (document.querySelector(`.${targetClass}`).innerHTML = message);


/**
 * 성별 선택 유효성
 * @param {name} rName radio name
 * @returns radio에 체크벨류값
 */

const radioCheck = (rName) => {
  radioArr = document.getElementsByName(rName);

  for (i = 0; i < radioArr.length; i++) {
    if (radioArr[i].checked) {
      radioValue = radioArr[i].value;

      return radioValue;
    }
  }
};

/**
 * 벨류 초기화 공통 함수
 * @param {String} targetName 초기화될 해당 에러 문구 이름
 */

const valueReset = (targetName) => {
  inputs = document.getElementById(targetName);

  if (inputs.type == "text")
    inputs.setAttribute("onkeyup", "keyEvents('" + targetName + "')");
    
  else if (inputs.type == "radio") {
    let radioArrs = document.querySelectorAll(".gender-check__radio");

    for (i = 0; i < radioArrs.length; i++) {
        radioArrs[i].addEventListener("click", () => {
        if (event.target.value == "on") {
          document.querySelector(`.${targetName}`).innerHTML = "";
        }
      });
    }
  }
};


/**
 * 인풋 벨류 초기화 함수
 * @param {String} errorTextDomName valueReset로 부터 전달받은 메개변수
 */

function keyEvents(errorTextDomName) {
  if (event.target.value.length > 0) {
    document.querySelector(`.${errorTextDomName}`).innerHTML = "";
  }
}


/**
 * 종합 문자열 유효성 체크
 * @param {String} str input에 value
 * @param {String} type 해당 문자의 타입
 * @returns {Boolean}
 */

function strCheck(str, type) {
  let REGEX = {
    EMAIL: /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
    ID_RULE: /^[a-z0-9_-]{5,15}$/,
    PWD_RULE: /^(?=.*[a-zA-Z])((?=.*\d)(?=.*\W)).{8,16}$/,
    NAME_RULE: /^[가-힣a-zA-Z]+$/,
  };
  
  if (type === "email") return REGEX.EMAIL.test(str);
  else if (type === "id") return REGEX.ID_RULE.test(str);
  else if (type === "pwd") return REGEX.PWD_RULE.test(str);
  else if (type === "name") return REGEX.NAME_RULE.test(str);
  else return false;
}


// 폼 submit 함수
function form_submit() {
  let form = document.join_form;
  let flag = true; // submit 기능 활성화 or 비활성화 상태 설정

  event.preventDefault();

  // 아이디
  if (!form.member_id.value) {
    alert("아이디를 입력해주세요.");
    errorText("member_id", "아이디를 입력해주세요.");
    form.member_id.focus();
    valueReset("member_id");

    return false;
  }
  
  // 비밀번호
  if (!form.password.value) {
    alert("비밀번호를 입력해주세요.");
    errorText("password", "비밀번호를 입력해주세요.");
    form.password.focus();

    return false;
  }

  // 비밀번호 확인
  if (!form.password_check.value) {
    alert("비밀번호 확인을 입력해주세요.");
    errorText("password_check", "비밀번호 확인을 입력해주세요.");
    form.password_check.focus();

    return false;
  }

  // 성별
  if (radioCheck("gender_check") == undefined) {
    alert("성별을 선택 해주세요.");
    errorText("gender_check", "성별을 선택 해주세요.");
    valueReset("gender_check");

    return false;
  }

  // 이름
  if (!form.user_name.value) {
    alert("이름을 입력해주세요.");
    errorText("user_name", "이름을 입력해주세요.");
    form.user_name.focus();
    valueReset("user_name");

    return false;
  }
  
  // 전화번호
  if (!form.insert_tel.value) {
    alert("전화번호를 입력해주세요.");
    errorText("insert_tel", "전화번호를 입력해주세요.");
    form.insert_tel.focus();
    valueReset("insert_tel");

    return false;
  }

  // 사업자등록증
  if (!form.co_insert_file.value) {
    alert("사업자등록증을 첨부해주세요.");
    form.co_insert_file.focus();
    errorText("co_insert_file", "사업자등록증을 첨부해주세요.");

    return false;
  }

  // 우편번호
  if (!form.zipcode.value) {
    alert("우편번호를 입력 해주세요.");
    errorText("zipcode", "우편번호를 입력 해주세요.");
    form.zipcode.focus();
    valueReset("zipcode");

    return false;
  }

  // 주소
  if (!form.address1.value) {
    alert("주소를 입력 해주세요.");
    errorText("address1", "주소를 입력 해주세요.");
    form.address1.focus();
    valueReset("address1");

    return false;
  }

  // 상세주소
  if (!form.address2.value) {
    alert("상세주소를 입력 해주세요.");
    errorText("address2", "상세주소를 입력 해주세요.");
    form.address2.focus();
    valueReset("address2");

    return false;
  }

  // 이메일
  if (!form.email1.value) {
    alert("이메일을 입력해주세요.");
    form.email1.focus();
    errorText("email1", "이메일을 입력 해주세요.");

    return false;
  }

  // 이메일 상세
  if (!form.email2.value) {
    alert("이메일 상세를 입력해주세요.");
    form.email2.focus();
    errorText("email2", "이메일 상세를 입력 해주세요.");

    return false;
  }

  if (flag == true) {
    alert(
    '회원가입이 완료되었습니다.\n' +
    `아이디: ${form.member_id.value}\n
    비밀번호: ${form.password.value}\n
    비밀번호확인: ${form.password_check.value}\n
    성별: ${form.gender_check.value}\n
    이름: ${form.user_name.value}\n
    전화번호: ${form.insert_tel.value}\n
    사업자등록증: ${form.co_insert_file.value}\n
    우편번호: ${form.zipcode.value}\n
    주소: ${form.address1.value}\n
    상세주소: ${form.address2.value}\n
    이메일: ${form.email1.value}\n
    이메일 상세: ${form.email2.value}\n
    `
    );

    form.submit();

    return true;
  }
}


/**
 * 파일 인풋 유효성
 * @param {DOM} data // 이벤트 타겟
 */ 

function filesed(data) {
  let fileSize = 8 * 1024 * 1024; // 크기 설정

  if (data.files[0] != undefined) {
    if (fileSize * 1 < data.files[0].size * 1) {
      alert("파일크기는 8M 이하만 가능합니다.");

      return;
    }

    let ext = data.files[0].name;

        ext = ext.slice(ext.lastIndexOf(".") + 1).toLowerCase();

    // 불가능한 파일 확장자 설정
    if (!inArray(ext, ["png", "jpg", "jpeg"])) {
      alert("JPG,PNG,jpeg 만 가능");

      return;
      
    } else {
      document.querySelector(".input-error__message.co_insert_file").innerHTML = "";
    }
  }

  const fileName = document.getElementById("co_insert_file");
        fileName.value = data.files[0].name;
}


/**
 * @param {String} val 파일의 확장자명이 문자열로 담김
 * @param {Object} arrValue 업로드 불가능한 파일 확장자 설정 배열
 * @returns {Boolean} 파일 확장자 유효성 체크의 판별값
 */

function inArray(val, arrValue) {
  if (arrValue.includes(val) == true) return true;
  else return false;
}


// 비밀번호 유효성
function passWordCheck(values) {
  let targetClosest = event.target.closest(".total-box__input");
  let passWordCheckText = targetClosest.querySelector("span");
  let passVal = values;

  if (values.length > 0) document.querySelector(".input_text_error.password").innerHTML = "";

  if (!passVal) {
    passWordCheckText.innerHTML = "*특수문자, 숫자, 영문자 포함 8자리 이상";
    passWordCheckText.style.color = "gray";

    return (passwordState = false);

  } else {
    if (!strCheck(passVal, "pwd")) {
      passWordCheckText.innerHTML = "*특수문자, 숫자, 영문자 포함 8자리 이상";
      passWordCheckText.style.color = "red";

      return (passwordState = false);

    } else {
      passWordCheckText.innerHTML = "사용가능한 비밀번호입니다.";
      passWordCheckText.style.color = "blue";

      return (passwordState = true);

    }
  }
}


// 비밀번호 확인
function passWordRecheck(values, targetId, idx) {
  const mainPassWord = document.getElementById(`${targetId}`).value;
  const targetClosest = event.target.closest(".total-box__input").querySelector(".validation__message");

  if (values.length > 0) {
    document.querySelector(".input-error__message.password_check").innerHTML = "";
  }

  if (!values) targetClosest.innerHTML = "";
  else if (values == mainPassWord) {
    targetClosest.classList.remove("error");
    targetClosest.innerHTML = "비밀번호가 일치합니다.";
    targetClosest.style.color = "blue";

    return (passwordCheck = true);
  } else {
    targetClosest.classList.add("error");
    targetClosest.innerHTML = "비밀번호가 일치하지 않습니다.";
    targetClosest.style.color = "red";

    return (passwordCheck = false);
  }
}


// 이메일 입력선택
function emailTypeSelect() {
  let form = document.join_form;

  if (form.user_email3.value == "w") {
    form.email2.readOnly = false;
    form.email2.value = "";
    form.email2.focus();

  } else if (form.user_email3.value == "b") {
    form.email2.readOnly = true;
    form.email2.value = "";

  } else {
    form.email2.readOnly = true;
    form.email2.value = form.user_email3.value;
  }
}


// 주소검색
window.onload = function () {
  document.getElementById("search_add").addEventListener("click", function () {
    event.preventDefault();
    //주소 찾기 버튼을 클릭하면 주소 api 모달창 open
    new daum.Postcode({
      oncomplete: function (data) {
        //선택시 입력값 세팅
        document.getElementById("zipcode").value = data.zonecode;
        document.getElementById("address1").value = data.address;
        document.querySelector("input[id=address2]").focus();
      },
    }).open();
  });
};