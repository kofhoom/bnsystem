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
 *
 * @param {String} targetName 초기화될 해당 에러 문구 이름
 */

const valueReset = (targetName) => {
  inputs = document.getElementById(targetName);
  if (inputs.type == "text")
    inputs.setAttribute("onkeyup", "keyEvents('" + targetName + "')");
  else if (inputs.type == "radio") {
    let radioArrs = document.querySelectorAll(".radio_gender_check");
    console.log(radioArrs);
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
 *
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
 * @returns
 */
function strCheck(str, type) {
  var REGEX = {
    EMAIL:
      /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i,
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
  let flag = false;

  event.preventDefault();

  if (!form.member_id.value) {
    alert("아이디를 입력해주세요.");
    errorText("member_id", "아이디를 입력해주세요.");
    form.member_id.focus();
    valueReset("member_id");
    return false;
  }
  if (!form.password.value) {
    alert("비밀번호를 입력해주세요.");
    errorText("password", "비밀번호를 입력해주세요.");
    form.password.focus();
    return false;
  }
  if (!form.password_check.value) {
    alert("비밀번호 확인을 입력해주세요.");
    errorText("password_check", "비밀번호 확인을 입력해주세요.");
    form.password_check.focus();
    return false;
  }

  if (radioCheck("gender_check") == undefined) {
    alert("성별을 선택 해주세요.");
    errorText("gender_check", "성별을 선택 해주세요.");
    valueReset("gender_check");

    return false;
  }

  if (!form.user_name.value) {
    alert("이름을 입력해주세요.");
    errorText("user_name", "이름을 입력해주세요.");
    form.user_name.focus();
    valueReset("user_name");

    return false;
  }
  if (!form.insert_tel.value) {
    alert("전화번호를 입력해주세요.");
    errorText("insert_tel", "전화번호를 입력해주세요.");
    form.insert_tel.focus();
    valueReset("insert_tel");

    return false;
  }

  if (!form.co_insert_file.value) {
    alert("사업자등록증을 첨부해주세요.");
    form.co_insert_file.focus();
    errorText("co_insert_file", "사업자등록증을 첨부해주세요.");
    return false;
  }
  if (!form.zipcode.value) {
    alert("우편번호를 입력 해주세요.");
    errorText("zipcode", "우편번호를 입력 해주세요.");
    form.zipcode.focus();
    return false;
  }
  if (!form.address1.value) {
    alert("주소를 입력 해주세요.");
    errorText("address1", "주소를 입력 해주세요.");
    form.address1.focus();

    return false;
  }

  if (!form.address2.value) {
    alert("상세 주소를 입력 해주세요.");
    errorText("address2", "주소를 입력 해주세요.");
    form.address2.focus();
    return false;
  }

  if (form.email1.value == "") {
    alert("이메일을 입력해주세요.");
    form.email1.focus();
    errorText("email", "이메일을 입력 해주세요.");

    return false;
  }
  if (form.email2.value == "") {
    alert("이메일을 입력해주세요.");
    form.email2.focus();
    errorText("email", "이메일 상세를 입력 해주세요.");

    return false;
  }

  if (flag == true) {
    form.submit();
    return true;
  }
}

// 파일 인풋 유효성
function filesed(data) {
  var fileSize = 8 * 1024 * 1024; // 크기 설정

  if (data.files[0] != undefined) {
    if (fileSize * 1 < data.files[0].size * 1) {
      alert("파일크기는 8M 이하만 가능합니다.");

      return;
    }

    var ext = data.files[0].name;
    ext = ext.slice(ext.lastIndexOf(".") + 1).toLowerCase();

    // 불가능한 파일 확장자 설정
    if (!inArray(ext, ["png", "jpg", "jpeg"])) {
      alert("JPG,PNG,jpeg 만 가능");

      return;
    } else {
      document.querySelector(".input_text_error.co_insert_file").innerHTML = "";
    }
  }

  const fileName = document.getElementById("co_insert_file");
  fileName.value = data.files[0].name;
}

/**
 *
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
  let passVal = values;
  let passWordCheckInput = event.target.closest(".total_input_box");

  if (values.length > 0) {
    document.querySelector(".input_text_error.password").innerHTML = "";
  }

  if (!passVal) {
    passWordCheckInput.querySelector("span").innerHTML =
      "*특수문자, 숫자, 영문자 포함 8자리 이상";

    passWordCheckInput.querySelector("span").style.color = "gray";

    return (passwordState = false);
  } else {
    if (!strCheck(passVal, "pwd")) {
      passWordCheckInput.querySelector("span").innerHTML =
        "*특수문자, 숫자, 영문자 포함 8자리 이상";

      event.target
        .closest(".total_input_box")
        .querySelector("span").style.color = "red";

      return (passwordState = false);
    } else {
      passWordCheckInput.querySelector("span").innerHTML =
        "사용가능한 비밀번호입니다.";

      event.target
        .closest(".total_input_box")
        .querySelector("span").style.color = "blue";

      return (passwordState = true);
    }
  }
}

// 비밀번호 확인
function passWordRecheck(values, targetId, idx) {
  const mainPassWord = document.getElementById(`${targetId}`).value;
  if (values.length > 0) {
    document.querySelector(".input_text_error.password_check").innerHTML = "";
  }
  if (!values)
    event.target
      .closest(".total_input_box")
      .querySelector(".validation-message").innerHTML = "";
  else if (values == mainPassWord) {
    event.target
      .closest(".total_input_box")
      .querySelector(".validation-message")
      .classList.remove("error");

    event.target
      .closest(".total_input_box")
      .querySelector(".validation-message").innerHTML =
      "비밀번호가 일치합니다.";

    event.target
      .closest(".total_input_box")
      .querySelector(".validation-message").style.color = "blue";

    return (passwordCheck = true);
  } else {
    event.target
      .closest(".total_input_box")
      .querySelector(".validation-message")
      .classList.add("error");

    event.target
      .closest(".total_input_box")
      .querySelector(".validation-message").innerHTML =
      "비밀번호가 일치하지 않습니다.";

    event.target
      .closest(".total_input_box")
      .querySelector(".validation-message").style.color = "red";

    return (passwordCheck = false);
  }
}

// 이메일 입력선택
function emailTypeSelect() {
  let form = document.join_form;

  if (form.user_email3.value == "a") {
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
