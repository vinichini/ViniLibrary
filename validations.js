
//
// Validations.setup
//
Validations.setup = function () {



    Common.getObjectElement(".textInput").on("keypress keyup blur", function (event) {
        Validations.LimitToText(this);
    });
    Common.getObjectElement(".numberInput").on("keypress keyup blur", function (event) {
        Validations.LimitToNumber(this);
    });
    Common.getObjectElement("#input_docEmDateTit1").on("blur", function (event) {
        Validations.CheckDateDocEmiss();
    });
    Common.getObjectElement("input").on("click", function (event) {
        if (FormProp.tryToSubmit == false) {
            Validations.RemoveErrorInfo(this);
        }
    });
    Common.getObjectElement("#input_DocNumberTit1").on("blur", function (event) {
        debugger
        Validations.CheckDocErrorOnDocNumber();
    });
    Common.getObjectElement('.required').on('blur', function (event) {
            Validations.CheckRequired(this);
    });
  


};


//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//CALL VALIDATION FUNCTION
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Validations.FieldToValidate = function (element, funcvalidate) {
    debugger
    var bolvalid = eval(funcvalidate.indexOf("(") > 0 ? funcvalidate + ',element.value)' : funcvalidate + '(element.value)');

  
        $("#descInfo").html(getTString(element.getAttribute('data-errorinfo')));

        if (bolvalid) {
            Validations.ValidField(element);
            Validations.HideInfo(); //info personalizada do erro (menu) 
            menuErrors();
        }
        else {
            Validations.InvalidField(element);
            Validations.DisplayInfo();
            menuErrors();
        }
   

}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//CHECK REQUIREDFOR ALL FIELDS (NOT EMPTY)
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Validations.CheckRequiredAll = function () {
    debugger
    $(".required").each(function (index) {
        if ($(this).val() == "" && $(this).attr("placeholder") != "0.00 €" || $(this).val() == -1) {
            $(this).addClass("emptyField").removeClass("notEmpty");
            if (FormProp.tryToSubmit == true) {
                Validations.InvalidFieldStyle(this);
                menuErrors();
            }
        }
        else {
            $(this).removeClass("emptyField").addClass("notEmpty");
            if (!$(this).hasClass("invalid")) {
                Validations.ValidFieldStyle(this);
                $("#menuInfo").removeClass('error').addClass('noError');
                $("#descInfo").html('');
                Validations.HideInfo();
                menuErrors();
            }
        }

    });
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//CHECK REQUIRED FIELD SELECTED (NOT EMPTY)
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Validations.CheckRequired = function (element) {
 

    if ($(element).val() == "" && $(element).attr("placeholder") != "0.00 €" || $(element).val() == -1) {
        $(element).addClass("emptyField").removeClass("notEmpty");
        if (FormProp.tryToSubmit == true) {
            Validations.InvalidFieldStyle(element);
            menuErrors();
        }
    }
    else {
        $(element).removeClass("emptyField").addClass("notEmpty");
        if (!$(element).hasClass("invalid")) {
            Validations.ValidFieldStyle(element);
            $("#menuInfo").removeClass('error').addClass('noError');
            $("#descInfo").html('');
            Validations.HideInfo();
            menuErrors();
        }
    }

}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//VALIDATION STATUS
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Validations.ValidField = function (element) {

    var inputElemId = $(element).attr('id');
    var labelElem = $(element).siblings().attr('id');
    $("#" + inputElemId).removeClass('invalid').addClass('valid');
    $("#" + labelElem).removeClass('invalid').addClass('valid');
    Validations.ValidFieldStyle(element);
    menuErrors();
    $("#menuInfo").removeClass('error').addClass('noError');
     $("#descInfo").html('');


}
Validations.InvalidField = function (element) {
    debugger
    var inputElemId = $(element).attr('id');
    var labelElem = $(element).siblings().attr('id');
    $("#" + inputElemId).addClass('invalid').removeClass('valid');
    $("#" + labelElem).addClass('invalid').removeClass('valid');
    Validations.InvalidFieldStyle(element);
    $("#menuInfo").addClass('error').removeClass('noError');
    menuErrors();


}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//VALIDATION STYLE
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Validations.ValidFieldStyle = function (element) {
    debugger
    var inputElemId = $(element).attr('id');
    var labelElem = $(element).siblings().attr('id');
    var parentLabel = $(element).parent().siblings("label").attr('id');
    $("#" + inputElemId).removeClass('error').addClass('noError');
    if ($(element).hasClass("zipCodeInput")){
        $("#" + parentLabel).removeClass('error').addClass('noError');
    } else {
        $("#" + labelElem).removeClass('error').addClass('noError');
    }
    if (FormProp.tryToSubmit == false) {
        $("#menuInfo").removeClass('error').addClass('noError');
        $("#descInfo").html('');
    }

}
Validations.InvalidFieldStyle = function (element) {
    debugger
    var inputElemId = $(element).attr('id');
    var labelElem = $(element).siblings().attr('id');
    var parentLabel = $(element).parent().siblings("label").attr('id');
    $("#" + inputElemId).addClass('error').removeClass('noError');
    if ($(element).hasClass("zipCodeInput")) {
        $("#" + parentLabel).addClass('error').removeClass('noError');
    } else {
        $("#" + labelElem).addClass('error').removeClass('noError');
    }
    if (FormProp.tryToSubmit == false) {
        $("#menuInfo").addClass('error').removeClass('noError');
    }

}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//DISPLAY ERRORS/INFO
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Validations.DisplayInfo = function () {

    $('#menuInfo').attr("style", "display: inline-block");

    //id aqui é a class da form para quando se tenta submeter
    //if (id == "notSubmitted") {

    //    $("#descInfo").append("Tem de preencher os campos obrigatórios! Formulário não submetido.");
    //}
    //if (id == "submitted") {
    //    $("#descInfo").append("Formulário submetido com sucesso!");
    //    $('#menuInfo').attr("style", "border: 2px solid #009943");
    //}
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//HIDE ERRORS/INFO
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Validations.HideInfo = function () {
    $("#menuInfo").attr("style", "display: none");

}
//Validations.CheckDateDocEmiss = function () {
//    $("input").on("change", function () {
//        this.setAttribute(
//            "data-date",
//            moment(this.value, "YYYY-MM-DD")
//                .format(this.getAttribute("data-date-format"))
//        )
//    }).trigger("change")
//}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//REMOVE ERRORS ON CLICK INPUT ANOTHER INPUT
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Validations.RemoveErrorInfo = function (_this) {
    Validations.HideInfo();
    //if (!$(_this).hasClass("invalid")) {
    //    Validations.HideInfo();
    //} else {
    //    $("#menuInfo").addClass('error').removeClass('noError');
    //    Validations.DisplayInfo();
    //}
};
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//CHECK IF DOC NUMBER HAS ERROR WITH DIGITS ON DOC NUMBER CHANGE 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Validations.CheckDocErrorOnDocNumber = function () {

    if ((element.value == "" && $(element).attr("placeholder") != "0.00 €") || element.value == -1) {
        $(element).addClass("emptyField").removeClass("notEmpty");
        if (FormProp.tryToSubmit == true) {
            Validations.InvalidFieldStyle(element);
            menuErrors();
        }
    }
    else {
        $(element).removeClass("emptyField").addClass("notEmpty");
        if (!$(element).hasClass("invalid")) {
            Validations.ValidFieldStyle(element);
            $("#menuInfo").removeClass('error').addClass('noError');
            $("#descInfo").html('');
            Validations.HideInfo();
            menuErrors();
        }
    }

}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//CHECK IF DOC NUMBER HAS ERROR WITH DIGITS ON DOC NUMBER CHANGE 
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Validations.CheckDocErrorOnDocNumber = function () {

    var digitValue = $("#input_checkDigDocTit1").val();
    var element = $("#input_checkDigDocTit1");
    $("#descInfo").html(getTString(element.get(0).getAttribute('data-errorinfo')));
    if (Validations.CheckDigitCC(digitValue)) {
        Validations.ValidField(element);
        Validations.HideInfo();
        menuErrors();
    }
    else {
        Validations.InvalidField(element);
        Validations.DisplayInfo();
        menuErrors();
    }
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//FIELDS VALIDATION
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//NIF VALIDATION
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Validations.CheckNIF = function (in_Tipo, strNIF) {

    var intTotal = 0;
    var intCheckDigit;
    var bEmpresa = false;
    var bParticular = false;

    if (in_Tipo == 1)
        bEmpresa = true;

    if (in_Tipo == 2)
        bParticular = true;

    if (strNIF.length > 9) return false;

    //if (strNIF.substring(0,1)=='9' || strNIF.substring(0,1)=='8') return false;
    if (strNIF.substring(0, 1) == '8') return false;

    if (strNIF != '') {
        if (strNIF.substring(0, 2) != '99') {
            if (parseFloat(strNIF) > 100000000) {
                for (i = 8; i >= 1; i--)
                    intTotal = intTotal + parseInt(strNIF.substring(8 - i, 9 - i)) * (i + 1);

                intCheckDigit = intTotal % 11;
                if (11 - intCheckDigit > 9)
                    intCheckDigit = 0;
                else
                    intCheckDigit = 11 - intCheckDigit;


                if (intCheckDigit != parseInt(strNIF.substring(8, 9)))
                    return false;
                if (bEmpresa) {
                    if (strNIF.substring(0, 1) == '9') {
                        /*
                        if (parseFloat(strNIF)<500000000)
                        {
                            return false;
                        }
                        */
                    }
                    else {
                        //if (parseFloat(strNIF)<500000000 || parseFloat(strNIF)>700000000)
                        if (parseFloat(strNIF) < 500000000 || parseFloat(strNIF) > 799999999) {
                            return false;
                        }
                    }
                }
                //if (bEmpresa && (parseFloat(strNIF)<500000000 || parseFloat(strNIF)>700000000))
                //	return false;
                if (bParticular && (parseFloat(strNIF) >= 500000000 && parseFloat(strNIF) <= 700000000))
                    return false;
            }
            else
                return false;
        }
    }
    return true;
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//NIB VALIDATION
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Validations.CheckIban = function (sNIB) {
    var iX, iMult, sCheckDigit;
    var sResult;

    iMult = 0;

    sCheckDigit = sNIB.substr(19, 2);

    for (iX = 0; iX < 19; iX++) {
        iMult = ((iMult + parseInt(sNIB.substr(iX, 1))) * 10) % 97;
    }

    iMult = 98 - ((iMult * 10) % 97);

    sResult = iMult.toString();

    if (iMult < 10)
        sResult = "0" + sResult;
    if (!(sResult == sCheckDigit) && sNIB != '') {
        return false;
    }
    else {
        return true;
    }
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//EMAIL VALIDATION
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

Validations.CheckEmail = function (sEmail) {

    var re = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var is_email = re.test(sEmail);
    if (is_email || sEmail == '') { return true }
    else { return false; }
};
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//PHONE VALIDATION
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Validations.CheckPhone = function (sPhone) {

    if (((sPhone.substring(0, 1) == '9' || sPhone.substring(0, 1) == '2') && (sPhone.length == 9)) || sPhone == '')

        return true;
    else {
        return false;
    }
};
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//YEAR VALIDATION
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Validations.CheckYear = function () {

    var year_length = $("#inputAnoMatricula").val().length;
    if (year_length == 4 || year_length == '') {
        return true;
    }
    else {
        return false;
    }
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//DOC EMISS VALIDATION
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Validations.CheckDateDocEmiss = function () {
    debugger
    var dateSelected = new Date($('#input_docEmDateTit1').val())
    var yearSelected = dateSelected.getFullYear();
    var yearToday = (new Date()).getFullYear();
    var dateToday = (new Date());
    if (((yearSelected) > 1900 && (dateSelected) < dateToday) || $('#input_docEmDateTit1').val() == "") {

        return true;
    }
    else {
        return false;
    }
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//DOC VALID VALIDATION
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Validations.CheckDateDocVal = function () {
    debugger
    var dateSelected = new Date($('#input_docValDateTit1').val())
    var dateToday = (new Date());
    if (dateSelected <= dateToday && dateSelected != "") {

        return false;
    }
    else {
        return true
    }
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//BIRTHDAY VALIDATION
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Validations.CheckDateBirth = function () {

    var aYearFromNow = new Date();
    aYearFromNow.setFullYear(aYearFromNow.getFullYear() -18);
    var dateSelected = new Date($('#input_dataNascimentoTit1').val())
    if (dateSelected < aYearFromNow && dateSelected > 1920 || $('#input_dataNascimentoTit1').val() == "") {

        return true;
    }
    else {
        return false;
    }
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//TERM LOAN VALIDATION
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Validations.CheckTerm = function () {

    var termLoan = $('#inputPrazo').val();
    if (termLoan < 0 || termLoan > 120) {

        return false;
    }
    else {
        return true
    }
}
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//ALLOW ONLY TEXT
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Validations.LimitToText = function (_this) {

    var inputValue = event.which;
    // allow letters and whitespaces only.
    if (!(inputValue >= 65 && inputValue <= 120) && (inputValue != 32 && inputValue != 0)) {
        event.preventDefault();
    }
};
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//ALLOW ONLY NUMBERS
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
Validations.LimitToNumber = function (_this) {

    $(_this).val($(_this).val().replace(/[^\d].+/, ""));
    if ((event.which < 48 || event.which > 57)) {
        event.preventDefault();
    }
};
//verificar dropdowns
/*
checkDropdowns = function(_this){
    var checkValidate = false;
    var valueSelected = $(_this).val();
    if (valueSelected == "") {
        checkValidate = false;
        $(_this).removeClass("errorDraw").addClass("errorDraw_show");
        $(_this).removeClass("errorText").addClass("errorText_show");
    }
    else {
        checkValidate = true;
        $(_this).removeClass("errorDraw_show").addClass("errorDraw");
        $(_this).removeClass("errorText_show").addClass("errorText");
    }
    if (checkValidate) { $(_this).removeClass("invalid").addClass("valid"); }
    else { $(_this).removeClass("valid").addClass("invalid"); }
};*/

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
//Testa se o valor é um numero de BI valido
//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
function CheckDigitBIFun(in_txtField) {
    var strBI = in_txtField.value;
    return validateBIFun(strBI);
}

function validateBIFun(strBI) {
    //********************** ATENÇÂO **********************************
    //Foi colocado esta validacao para portugal porque a validacao do BI 
    //sem o checkdigit não funciona corretamente(Se o checkdigit for 0 retorna false).Apenas valida se é inteiro

    //return (IsIntegerFun(strBI) && strBI.length < 10);
    var intTotal = 0;
    var intCheckDigit;
    var intLength = strBI.length;

    //CS 20090521
    //TR 1962	  
    if (IsIntegerFun(strBI) && strBI.length < 10) {
        if (strBI != '') {
            for (i = intLength; i >= 1; i--) {
                intTotal = intTotal + parseInt(strBI.substring(intLength - i, intLength + 1 - i)) * (i + 1);
            }

            intCheckDigit = (11 - (intTotal % 11));
            //alert('total:[' + intTotal + '] checkdigit: ' + intCheckDigit);

            if (intCheckDigit >= 10)
                return (-1);
            else
                return (intCheckDigit);

            /*
            if (11-intCheckDigit>9)
            return (intCheckDigit=0)
            else
            return (intCheckDigit=11-intCheckDigit)
            */
        }
        return (-1);
    }
    else if (strBI.length <= 15 && !IsIntegerFun(strBI)) {
        return (-1);
    }
    else {
        return false;
    }
}

Validations.CheckDigitCC = function (valDigits) {
    debugger
    var docNumberWithoutVal = $("#input_DocNumberTit1").val();
    var docTypeVal = $('#input_tDocumentoTit1').val();
    if (docNumberWithoutVal == "" || docTypeVal != 104) {
        return true
    }
    else {
        var docNumber = docNumberWithoutVal + valDigits;
        var array =
        {
            "0": 0
            , "1": 1
            , "2": 2
            , "3": 3
            , "4": 4
            , "5": 5
            , "6": 6
            , "7": 7
            , "8": 8
            , "9": 9
            , "A": 10
            , "B": 11
            , "C": 12
            , "D": 13
            , "E": 14
            , "F": 15
            , "G": 16
            , "H": 17
            , "I": 18
            , "J": 19
            , "K": 20
            , "L": 21
            , "M": 22
            , "N": 23
            , "O": 24
            , "P": 25
            , "Q": 26
            , "R": 27
            , "S": 28
            , "T": 29
            , "U": 30
            , "V": 31
            , "W": 32
            , "X": 33
            , "Y": 34
            , "Z": 35
        };

        var sum = 0;
        var secondDigit = false;

        if (docNumber.length != 12) { return false; }

        for (var i = docNumber.length - 1; i >= 0; --i) {

            var valor = array[docNumber[i].toUpperCase()];

            if (secondDigit) {
                valor = 2 * valor;
                if (valor > 9)
                    valor = valor - 9;
            }

            sum = valor + sum;
            secondDigit = !secondDigit;
        }

        return (sum % 10) == 0;

    }
}
