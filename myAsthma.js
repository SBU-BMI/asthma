console.log('loaded myAsthma.js :-)');

(function(){
    document.body.style.backgroundColor="silver"
    var h ='</div>'
    h += '<h3 style="color:maroon">Welcome to your action plan</h3>'
    h += '<div style="color:blue" id="msg"> Start by loading an Action Plan:</div>'
    h += '<div id="loadFileDiv"><input type="file" id="inputFile"></div>'
    h += '<div id="yourHistory">'
    h += 'history'
    h += '</div>'
    h += '<div id="howDoYouFeel">'
    h += 'how do you feel'
    h += '</div>'
    h += '<hr><div id="myAsthmaPicDiv" hidden><img id="myAsthmaPic" class="zoomTarget"></div>'
    h += '</div>'
    sbmApps.render(h)
    //document.body.innerHTML=h
    var reader = new FileReader()
    reader.onload=function(f){
        localStorage.setItem('myAsthmaPic',f.target.result)
        console.log('pic size '+f.total+' saved in localStorage')
        loadImg()
        4
    }
    var loadImg=function(){
        var imgSrc = localStorage.myAsthmaPic
        if(imgSrc){
            //myAsthmaPic.src=imgSrc
            msg.innerHTML='You have a <a href="#" id="gotoPlanOnFile">plan onfile</a>, you can also load a new action plan if you prefer <span id="addPlan" style="color:green">(+)</span>'
            addPlan.onclick=function(){
                if(loadFileDiv.hidden){
                    loadFileDiv.hidden=false
                    addPlan.textContent="(-)"
                }else{
                    loadFileDiv.hidden=true
                    addPlan.textContent="(+)"
                }
                
            }
            loadFileDiv.hidden=true
        }
    }
    inputFile.onchange=function(evt){
        var ff = evt.target.files
        reader.readAsDataURL(ff[0])
    }
    loadImg()

    gotoPlanOnFile.onclick=function(tg){
        if(myAsthmaPicDiv.hidden){
            console.log('show asthma action plan on file')
            myAsthmaPicDiv.hidden=false
            myAsthmaPic.style.width="100%"
            myAsthmaPic.src=localStorage.myAsthmaPic
        }else{
            console.log('hide asthma action plan')
            myAsthmaPic.src=""
            myAsthmaPicDiv.hidden=true
            myAsthmaPic.style.width="100%"
        }
    }

    4

    // dependencies

    /*
    $.getScript('jquery.zoomooz.min.js',function(){
        //ez = $('.easyzoom').easyZoom();
        //api = ez.data('easyZoom')
    });console.log('loaded zoomooz plugin')
    */




    /*
    $.getScript('easyzoom.js',function(){
        ez = $('.easyzoom').easyZoom();
        api = ez.data('easyZoom')
    });console.log('loaded easyzoom plugin')
    */


})()

