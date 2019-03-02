var inputPass = false;
var inputEmail = false;
function createNewPassword(event) {
    if ( !event.validity.patternMismatch && inputPass === false && event.value !== '') {
        inputPass=true;
        var newPassword = document.createElement("input");
            newPassword.setAttribute("type", "password");
            newPassword.setAttribute("placeholder","Nhập lại mật khẩu");
            newPassword.setAttribute("id", "newPass");
            document.getElementById("formList").insertBefore(newPassword, document.getElementById("formList").childNodes[8]);
            newPassword.classList.add("newPassword");
            newPassword.setAttribute("required", "true");
            newPassword.oninput = getValidity;
            newPassword.oninvalid = getValidity;       
        }
    else if ( event.value === '' || event.value === null ){
            document.getElementById('newPass').remove();
            inputPass = false;
        }
}
for (var i = 2; i <= 31;i++) {
    var addDays = document.createElement("option");
    addDays.setAttribute("value",i);
    var t = document.createTextNode(i);
    addDays.appendChild(t);
    document.getElementById("dayList").appendChild(addDays);
}
for (var i =2;i<=12;i++) {
    var addMonths = document.createElement("option");
    addMonths.setAttribute("value", i);
    var t= document.createTextNode("Tháng " +i);
    addMonths.appendChild(t);
    document.getElementById("monthList").appendChild(addMonths);
}
for (var i =2017;i>=1905;i--) {
    var addYears = document.createElement("option");
    addYears.setAttribute("value", i);
    var t= document.createTextNode(i);
    addYears.appendChild(t);
    document.getElementById("yearList").appendChild(addYears);
}    

function ktraHo(event) {
        event.setCustomValidity("Bạn chưa nhập họ");
        return true;
}
function ktraTen(event) {
       event.setCustomValidity("Bạn chưa nhập tên");
        return true;
}

function ktraEmailDt(event) {
     var Email = document.getElementById('email').value;
     var mailFormat = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})|([0-9]{10})+$/;
     if (Email==='' || Email === null) {
         event.setCustomValidity('Bạn chưa nhập email hoặc số điện thoai');
     }
     else if (!mailFormat.test(Email) ) {
         event.setCustomValidity('Email hoặc số điện thoại chưa phù hợp');
     }
     else {
        event.setCustomValidity('');
     }
     return true;
}
function ktraGT(event) {
    event.setCustomValidity('Bạn chưa chọn giới tính');
}
function clearValidity(event) {
    event.setCustomValidity('');
    return true;
}
function ktraNgay(event) {
    event.setCustomValidity('Bạn chưa chọn ngày');
}
function ktraThang(event) {
    event.setCustomValidity('Bạn chưa chọn tháng');
}
function ktraNam(event) {
    event.setCustomValidity('Bạn chưa chọn năm');
}
function clearValidityG(){
    document.getElementById('firstGender').setCustomValidity('');
}
function ktraPass(event) {
    if (event.value ==="" || event.value===null) {
        event.setCustomValidity('Bạn chưa nhập password');
    }
    else {
        event.setCustomValidity(event.validity.patternMismatch ? event.title : '');
    }
}
function getValidity() {
    var ktra = document.getElementById('pass').value;
    var newPassValue = document.getElementById('newPass').value;
    if (newPassValue === '' || newPassValue === null) {
    document.getElementById('newPass').setCustomValidity("Bạn chưa nhập lại mật khẩu");
    }
    else if(ktra !== newPassValue){
        document.getElementById('newPass').setCustomValidity('Mật khẩu chưa khớp');
    }
    else {
         document.getElementById('newPass').setCustomValidity('');
    }
}

function saveinfo() {
    var emailNguoiDung =document.getElementById('email').value;
     var MKNguoiDung = document.getElementById('pass').value;
    var info = {
        emailPhone: emailNguoiDung,
        matKhau: MKNguoiDung
    };
    
    // localstorage Ttest //
    if (localStorage.getItem('user information')===null) {
        var userInformation = [];
        // add to array//
       userInformation.push(info);
        localStorage.setItem('user information', JSON.stringify(userInformation));
        }
    else {
       var  userInformation = JSON.parse(localStorage.getItem('user information'));
       
       userInformation.push(info);
       localStorage.setItem('user information', JSON.stringify(userInformation));
    }
    
}
document.getElementById('formList').addEventListener('submit',saveinfo);
document.getElementById('formLogin').addEventListener('submit',checkinfo);
function checkinfo() {
    var inputEmail = document.getElementById('loginUserName').value;
    var inputPassword = document.getElementById('loginPassword').value;
    var inputInformation = {
        emailPhone: inputEmail,
        matKhau : inputPassword
    }; 
    console.log(inputInformation);
    
    var userInformation = JSON.parse(localStorage.getItem('user information'));
    for (let i = 0; i < userInformation.length ; i++) {
        if (JSON.stringify(inputInformation) === JSON.stringify(userInformation[i]) ) {
            alert('Đăng nhập thành công');
        }
        else if ( i === userInformation.length -1 ) {
            alert('Email hoặc mật khẩu sai. Đăng nhập không thành công!');
        }
    }
  
}