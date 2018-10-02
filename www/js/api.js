
var serverPath = './';
var apiPath =''
var extension = '.aspx';
var server = 'server';
var currentTime = 0;
var userInfo = {};
var debug=true
if(window.location.href.indexOf('localhost')>=0){
    //server='local'
    debug=true
}
//debug=true
if(server==="local"){
    apiPath = "./api_local";
    extension =".php";
}
if(server==="server"){
    apiPath = "https://ads.salescvsejalan.com";
}

function gup(name){
    name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");  
    var regexS = "[\\?&]"+name+"=([^&#]*)";  
    var regex = new RegExp( regexS );  
    var results = regex.exec( window.location.href ); 
    if( results == null )    return "";  
    else    return results[1];
} 

function showNotification(type,msg){
    var icon=''
    if(type=='success'){
        icon='glyphicon glyphicon-ok-sign'
    }
    if(type=='info'){
        icon='glyphicon glyphicon-info-sign'
    }
    if(type=='danger'){
        icon='glyphicon glyphicon-warning-sign'
    }
    if(type=='warning'){
        icon='glyphicon glyphicon-warning-sign'
    }
    $.notify({
        // options
        icon: icon,
        title: '',
        message: msg
    },{
        type: type,
        delay: 5000,
        showProgressbar: true,
        placement: {
            from: "top",
            align: "left"
        },
        z_index: 2000,
        animate: {
            enter: 'animated fadeInLeft',
            exit: 'animated fadeOutLeft'
        },
        template: '<div data-notify="container" class="col-xs-11 col-sm-5 alert alert-{0}" role="alert" style="max-width:350px;">' +
        '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
        '<span data-notify="icon"></span> ' +
        '<span data-notify="title">{1}</span> ' +
        '<span data-notify="message">{2}</span>' +
        '<div class="progress" data-notify="progressbar" style="height:5px; margin-bottom:5px">' +
            '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
        '</div>' +
        '<a href="{3}" target="{4}" data-notify="url"></a>' +
    '</div>' 
    })
    /*
    $.notify({
        // options
        icon: 'glyphicon glyphicon-warning-sign',
        title: 'Bootstrap notify',
        message: 'Turning standard Bootstrap alerts into "notify" like notifications',
        url: 'https://github.com/mouse0270/bootstrap-notify',
        target: '_blank'
    },{
        // settings
        element: 'body',
        position: null,
        type: "danger",
        allow_dismiss: true,
        newest_on_top: false,
        showProgressbar: true,
        placement: {
            from: "top",
            align: "right"
        },
        offset: 20,
        spacing: 10,
        z_index: 1031,
        delay: 5000,
        timer: 1000,
        url_target: '_blank',
        mouse_over: null,
        animate: {
            enter: 'animated fadeInDown',
            exit: 'animated fadeOutUp'
        },
        onShow: null,
        onShown: null,
        onClose: null,
        onClosed: null,
        icon_type: 'class',
        template: '<div data-notify="container" class="col-xs-11 col-sm-3 alert alert-{0}" role="alert">' +
            '<button type="button" aria-hidden="true" class="close" data-notify="dismiss">×</button>' +
            '<span data-notify="icon"></span> ' +
            '<span data-notify="title">{1}</span> ' +
            '<span data-notify="message">{2}</span>' +
            '<div class="progress" data-notify="progressbar">' +
                '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
            '</div>' +
            '<a href="{3}" target="{4}" data-notify="url"></a>' +
        '</div>' 
    });*/
}

function log(txt){
    if(debug){
        console.log(txt)
    }
    
}

function callApi(api,callback,data,showLoader){ 
    //autoRefreshCaptcha()
    
    if(showLoader==false){
        
    }else{
        showLoading(true)
    }
    
    var fd = new FormData();   
    var queryStr=[]
    for(i in data){
        fd.append( i, data[i] );
        queryStr.push(i+"="+data[i])

    } 
    queryStr=queryStr.join("&")
    var url=apiPath+"/"+api+extension+"?"+queryStr
    //fd.append( 'file', input.files[0] );
   // fd.append( 'file', '' );
    
    $.ajax({
      url: url,
      data: fd,
      crossDomain: true,
      processData: false,
      contentType: false,//'multipart/form-data',
      //contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      timeout:30000,
      success: function(data){
        if(showLoader==false){
            
        }else{
            showLoading(false)
        }
        callback(data)
      },
      error: function(httpRequest,textStatus, error){
       // showNotification('danger','Masalah koneksi, silahkan coba lagi')
        checkLocalStorage()
        if(showLoader==false){
            
        }else{
            showLoading(false)
        }
      },
      async:true
    });
}
function callDomainApi(domain,callback,data,showLoader){ 
    
    if(showLoader==false){
        
    }else{
        showLoading(true)
    }
    
    var fd = new FormData();   
    for(i in data){
        fd.append( i, data[i] );
    } 
    $.ajax({
      url: "http://"+domain+"/status.json",
      data: fd,
      crossDomain: true,
      processData: false,
      contentType: false,//'multipart/form-data',
      //contentType: 'application/json',
      dataType: 'json',
      type: 'POST',
      timeout:30000,
      success: function(data){
        if(showLoader==false){
            
        }else{
            showLoading(false)
        }
        log("success"+domain)
        callback(data)
      },
      error: function(httpRequest,textStatus, error){
        callNextDomain()
        
        if(showLoader==false){
            
        }else{
            showLoading(false)
        }
      },
      async:true
    });
}
function apiError(api,data){
    //return
    var status=data.status
    var msg=data.message
    switch (status) {
        case 'invalid_request':
            loadErrorPage('Missing or invalid request parameter')
            break;
        case 'maintenance':
            //alert(msg)
            window.location.href = "maintenance.html"
            break;
        case 'logged_in':
            //log("referrer:"+userInfo.referrer)
            if(userInfo.referrer!=null && userInfo.referrer!=undefined && userInfo.referrer!=""){
                //return
            }
           
            window.location.href = "game.html"
            break;
        case 'not_logged_in':
            alert(msg)
            logout()
            break;
        case 'account_suspended':
            errorPop('warning',msg)
            accountSuspended(true)
            break;
        case 'closed':
            errorPop('warning',msg)
            break;
        case 'pending':
            errorPop('warning',msg)
            break;
        case 'error':
            errorPop('warning',msg)

            //if(api=='Login'){
                //refreshCaptcha(data.captcha_url)     
            //}
            break;
        case 'captcha_expired':
            refreshCaptcha(data.captcha_url)
            break;
        case 'server_error':
            errorPop('warning',msg);            
            loadErrorPage(msg);
            break;
        default:
            loadErrorPage(msg);
    }

}
function showLoading(flag) {
    if (flag) {
        $(".loadingDiv").show()
    } else {
        $(".loadingDiv").hide()
    }
}
