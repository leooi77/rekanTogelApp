

$(document).ready(function () {
   
    //callApi('ts',checkDomainSuccess,{state:''})
    
    
});
var domainId=0
var domain=[]
var appId="iUgW6fW6"
function checkLocalStorage(){
    if (window.localStorage.getItem("globalMath") === null) {
        noDomianFound()
        return        
    }else{
        log("get localstorage:")
        log(domain)
        domain=JSON.parse( window.localStorage.getItem( appId));
        domainId=0
        log(domain)
        callNextDomain()
        
        //window.localStorage.setItem( 'globalMath', JSON.stringify(LocalData.allData));
    }
}
function getTimeStampSuccess(data){
    var ts=(data.ts); 
    var id=appId
    if(ts==undefined || ts==null || ts==""){
        checkLocalStorage()
        return
    }
    
    var cs=$.sha256(id+"+"+ts+"=7kNm386P7QvCpDNv")
    callApi('dt',checkDomainSuccess,{id:id,ts:ts,cs:cs})
}
function checkDomainSuccess(data){
    log("checkDomainSuccess")
    domain=data.data
    domainId=0
    window.localStorage.setItem( appId, JSON.stringify(domain));
    callNextDomain()
}
function callNextDomain(){
    log("callNextDomain:"+domainId)
    domainId++
    if(domainId>domain.length){
        noDomianFound()
        return
    }
    callDomainApi(domain[domainId-1],callDomainSuccess,{state:''})
}
function callDomainSuccess(data){
    var ts=(data.status); 
   
    if(ts.toLowerCase()!="success"){
        callNextDomain()
        return
    }
    log("success")
    $("#loginWrapper").hide()
    $(".refreshBtn").show()
    window.open("http://"+domain[domainId-1], '_system');
   // window.location.href="http://"+domain[domainId-1]

}
function noDomianFound(){
    log("noDomianFound")
    $("#loginWrapper").hide()
    $(".refreshBtn").show()
}
function retry(){
    $("#loginWrapper").show()
    $(".refreshBtn").hide()
    callApi('ts',getTimeStampSuccess,{})
    app.checkForUpdate()
}
/*
if (window.localStorage.getItem("globalMath") === null) {
    //alert(null)
    return        
}else{
    LocalData.allData=JSON.parse( window.localStorage.getItem( 'globalMath' ));
    window.localStorage.setItem( 'globalMath', JSON.stringify(LocalData.allData));
}*/
function showAppError(html){
    //$(".udpateMsg").append("<br>"+html)
    //showNotification('danger',html)
}