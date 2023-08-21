
import { createPicker } from 'https://unpkg.com/picmo@latest/dist/index.js';

var head = document.getElementsByTagName('head')[0];
var script = document.createElement('script');
script.type = 'text/javascript';
script.src = "https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.0/jquery.min.js";

script.onreadystatechange = handler;
script.onload = handler;
head.appendChild(script);

function handler(){
// $(document).ready(function(){
// message writing page handler    
    $('.att-img').click(function(){
        $('.img-del').removeClass("disabled");
        $('.img-preview').attr("src","https://random.imagecdn.app/501/155");
    });

    $('.img-del').click(function(){
        $('.img-del').addClass("disabled",true);
        $('.img-preview').attr("src","");
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
            // $('#msg-area').text(event.emoji);
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

    /// address management
    $('#regPhoneChk').click(function(){
        $(this).css('color', 'black');
        $(this).removeClass('bi-check-circle');
        $(this).addClass('bi-check-circle-fill');
    });

    /// setting web push

    $('#iconDel').click(function(){
        $('#thumbImg').attr('src', '');
    });


    $('#uploadBtn').click(function(){
        $('#iconUpload').click();
        $('#iconUpload').on('change', async function(e){
            const imgUrl = e.target.files[0];
            const base64 = await convertBase64(imgUrl);
            // console.log(base64);
            $('#iconDel').removeClass('hidden');
            $('#thumbImg').attr('src', base64);
        }); 
    });

    const convertBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
    
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
    
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

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

}    
// });
