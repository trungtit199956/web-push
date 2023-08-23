
import { createPicker } from 'https://unpkg.com/picmo@latest/dist/index.js';

var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js";

script.onreadystatechange = handler;
script.onload = handler;
head.appendChild(script);

function handler(){   
    $('.att-img').click(function(){
        $('.img-del').removeClass("disabled");
        $('.img-preview').attr("src","https://random.imagecdn.app/501/155");
        $('#imgLink').text("https://random.imagecdn.app/501/155");
    });

    $('.img-del').click(function(){
        $('.img-del').addClass("disabled",true);
        $('.img-preview').attr("src","");
        $('#imgLink').text('');
    });

    $('input[name="reservSend"]').click( function(){
        $('input[name="immediateSend"]').prop('checked', false);
        $('.setSendTime').removeClass('hidden');
        $('.setSendTime').addClass('d-inline');
    });

    
    $('#appPush').click(function(){
        $('#webPush').prop('checked', false);
    });

    $('#webPush').click(function(){
        $('#appPush').prop('checked', false);
    });

    $('input[name="immediateSend"]').click( function(){
        $('input[name="reservSend"]').prop('checked', false);
        $('.setSendTime').addClass('hidden');
        $('.setSendTime').removeClass('d-inline');
    });

    let arrChk1 = "allChk1";
    $('#sendChannelForm1 input[type="radio"]').click(function(){
        if(arrChk1 !== ''){
            $('input[name="'+ arrChk1 +'"]').prop('checked', false);
        };
        arrChk1 = $(this).attr('name');
        if($('input[name="timeChk"]').is(':checked')){
            $('#sendChannelForm1 input[type="date"]').prop('disabled', false);
            $('#sendChannelForm1 button').prop('disabled', false);
            $('#sendChannelForm1 button').addClass("btn-blue");
            $('#sendChannelForm1 button').removeClass("text-muted");
        }else{
            $('#sendChannelForm1 input[type="date"]').attr('disabled', true);
            $('#sendChannelForm1 button').attr('disabled', true);
            $('#sendChannelForm1 button').removeClass("btn-blue");
            $('#sendChannelForm1 button').addClass("text-muted");
        }
    });

    let arrChk2 = "allChk2";
    $('#sendChannelForm2 input[type="radio"]').click(function(){
        if(arrChk2 !== ''){
            $('input[name="'+ arrChk2 +'"]').prop('checked', false);
        };
        arrChk2 = $(this).attr('name');
    });
    
    // 수신 동의 자수 불러오기
    $.ajax({
        url: "/json/dummy.json",
        dataType: "json",
        success: function(res){
            let resData = res.address;
            let desCnt = 0;
            let mobiCnt = 0;
            $.each(resData,function(idx, item){
                if(item.platform === 'D' && item.isRegistrant === 'Y'){
                    desCnt +=1;
                }else if(item.platform === 'M' && item.isRegistrant === 'Y'){
                    mobiCnt +=1;
                }
            });
            $('#allCnt').text(desCnt + mobiCnt);
            $('#desCnt').text(desCnt);
            $('#mobiCnt').text(mobiCnt);
        },
        error: function(){
            alert('fetch data error!');
        }
    });


    let chkCnt = 0;
    $('.att-emoj').click(function(){
        chkCnt += 1;
        if(chkCnt < 2){
            pickEmoj();
        }else{
            $('#emoj-area').html('');
            chkCnt = 0;
        }
    });

    $('#msg-area').keypress(function(){
        $('#emoj-area').html('');
    });


    const pickEmoj = () =>{
        const rootElement = document.querySelector('#emoj-area');
        const picker = createPicker({rootElement,});
        picker.addEventListener('emoji:select', event => {
            typeInTextarea($('#msg-area'), event.emoji);
                return false;
            });
    }

    const typeInTextarea = (el, newText) => {
        var start = el.prop("selectionStart");
        var end = el.prop("selectionEnd");
        var text = el.val();
        var before = text.substring(0, start);
        var after  = text.substring(end, text.length);
        el.val(before + newText + after);
        el[0].selectionStart = el[0].selectionEnd = start + newText.length;
        el.focus();
    }


    /// setting web push

    $('#iconDel').click(function(){
        $('#thumbImg').attr('src', '');
    });


    $('input[name="colorPk"]').change(function(){
        $(this).next().html($(this).val());
    });

    let cnt = 0;
    $('#flexSwitchCheck').click(function(){
        cnt +=1;
        if(cnt%2 == 0){
            $(this).css('background-color', 'gray');  
            $(this).next().addClass('hidden');  
        }else{
            $(this).css('background-color', 'green');
            $(this).next().removeClass('hidden');  
        }
    });

    $('.bi-clipboard').click(function(){
        copyToClipboard('#jsCodeTxt');
        $(this).removeClass('bi-clipboard');
        $(this).addClass('bi-clipboard-check');
    });

    const copyToClipboard= (el) =>{
        let $temp = $("<input>");
        $("body").append($temp);
        $temp.val($(el).text()).select();
        document.execCommand("copy");
        $temp.remove();
    }

    
    window.onpopstate = function(event) {
        if (event.state && event.state.redirect) {
            window.location.href = event.state.redirect;
        }
    };

}
