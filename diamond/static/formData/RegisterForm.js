var btn=document.getElementById('btn');
btn.onclick=function (){
  var form=document.getElementById('info_wrap');
  var formdata=new FormData(form)
  var xhr=new XMLHttpRequest();
  xhr.open("post","http://182.92.239.145");
  xhr.send(formdata);
  xhr.onload=function(){
    if(xhr.status==200){
      console.log(xhr.responseText);
    }else{
      console.log(xhr.status);
    }
  }
}
