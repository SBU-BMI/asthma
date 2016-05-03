console.log('loaded myAsthma.js :-)');

(function(){
    //document.body.style.backgroundColor="silver"
    var h ='</div>'
    //h += '<h2 style="color:maroon">Asthma tracker</h2>'
    h += '<h3 style="color:navy" id="msg"> Start by loading an Action Plan:</h3>'
    h += '<h3 id="loadFileDiv"><input type="file" id="inputFile" class="btn btn-primary btn-md"></h3>'
    h += '<hr>'
    h += '<div id="myAsthmaHistoryDiv" style="height:140px">'
    h += 'history'
    h += '</div>'
    h += '<div id="howDoYouFeelDiv">'
        //h += 'How do you feel'
        h += '<table id="howDoYouFeelTable"><tr>'
            h += '<td id="howDoYouFeelIcons" style="font-size:50px;border:solid;border-color:white;border-width:10px">'
                h += '<div id="feelFine" style="color:green"><i class="fa fa-smile-o"></i></div>'
                h += '<div id="feelNotso" style="color:orange"><i class="fa fa-meh-o"></i></div>'
                h += '<div id="feelBad" style="color:red"><i class="fa fa-frown-o"></i></div>'
            h += '</td>'
            h += '<td id="howDoYouFeelTxt" style="font-size:16px">'
            h += '<i><p><b>How do you feel today?</b></p><p><i class="fa fa-arrow-left"></i> choose between <b style="color:green">Fine</b> (no coughing or problems breathing), <b style="color:orange">Not good</b> (wheezing, tight chest, waking up at nigh because of asthma), and <b style="color:red">Bad</b> (very short of breath, medication not helping).</p></i>'
            h += '</td>'

        h += '</tr></table>'
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
    }
    var loadImg=function(){
        var imgSrc = localStorage.myAsthmaPic
        if(imgSrc){
            myAsthmaPic.src=imgSrc
            msg.innerHTML='You have a <button class="btn btn-primary btn-lg" id="gotoPlanOnFile">plan on file</button>,<br> you can also load a new plan: <button id="addPlan" class="btn btn-primary btn-md">+</button>'
            addPlan.onclick=function(){
                if(loadFileDiv.hidden){
                    loadFileDiv.hidden=false
                    addPlan.textContent="-"
                }else{
                    loadFileDiv.hidden=true
                    addPlan.textContent="+"
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
            //myAsthmaPic.src=localStorage.myAsthmaPic
        }else{
            console.log('hide asthma action plan')
            //myAsthmaPic.src=""
            myAsthmaPicDiv.hidden=true
            myAsthmaPic.style.width="100%"
        }
    }

    // load history
    var loadAsthmaHistory=function(){
        if(localStorage.asthmaHistory){
            console.log('load asthma history')
            $.getScript('https://www.gstatic.com/charts/loader.js')
             .then(function(){
                 var asthmaHistory=JSON.parse(localStorage.asthmaHistory)
                 /*
                 google.charts.load('current', {'packages':['corechart']})
                 var drawChart=function() {
                    var data = google.visualization.arrayToDataTable([
                      ['Age', 'Weight'],
                      [ new Date(2000000000000*Math.random()),      12],
                      [ new Date(2000000000000*Math.random()),      5.5],
                      [ new Date(2000000000000*Math.random()),     14],
                      [ new Date(2000000000000*Math.random()),      5],
                      [ new Date(2000000000000*Math.random()),      3.5],
                      [ new Date(2000000000000*Math.random()),    7]
                    ])

                    var options = {
                          title: 'Age vs. Weight comparison',
                          hAxis: {title: 'Age', minValue: 0, maxValue: 15},
                          vAxis: {title: 'Weight', minValue: 0, maxValue: 15},
                          legend: 'none'
                     };
                     myAsthmaHistoryDiv.style.height="20%"
                     var chart = new google.visualization.ScatterChart(document.getElementById('myAsthmaHistoryDiv'))
                     chart.draw(data, options)

                 }
                 google.charts.setOnLoadCallback(drawChart)
                 */
                google.charts.load('current', {'packages':['timeline']});
                google.charts.setOnLoadCallback(drawChart);

                function drawChart() {
                  var data = new google.visualization.DataTable();
                  data.addColumn('string', 'Team');
                  data.addColumn('date', 'Start Date');
                  data.addColumn('date', 'End Date');

                  data.addRows([
                    ['Fine',     new Date(2000, 8, 5), new Date(2001, 1, 5)],
                    ['Not good', new Date(2001, 8, 5), new Date(2002, 1, 5)],
                    ['Bad', new Date(2002, 8, 5), new Date(2003, 1, 5)],
                    ['Fine', new Date(2003, 8, 5), new Date(2004, 1, 5)],
                    ['Bad', new Date(2004, 8, 5), new Date(2005, 1, 5)],
                    ['Not good',  new Date(2005, 8, 5), new Date(2006, 1, 5)],
                    ['Fine',   new Date(2006, 8, 5), new Date(2007, 1, 5)],
                    ['Fine',      new Date(2007, 8, 5), new Date(2008, 1, 5)],
                    ['Not good',  new Date(2008, 8, 5), new Date(2009, 1, 5)],
                    ['Fine',   new Date(2009, 8, 5), new Date(2010, 1, 5)],
                    ['Bad',    new Date(2010, 8, 5), new Date(2011, 1, 5)],
                    ['Fine',      new Date(2011, 8, 5), new Date(2012, 1, 5)],
                    ['Not good',     new Date(2012, 8, 5), new Date(2013, 1, 5)],
                    ['Bad',     new Date(2013, 8, 5), new Date(2014, 1, 5)],
                  ]);

                  var options = {
                    height: 450,
                    timeline: {
                      groupByRowLabel: true
                    }
                  }
                  var chart = new google.visualization.Timeline(myAsthmaHistoryDiv);

                  chart.draw(data, options);
                }


                     


                 4
             })
            
            4
        }else{
            localStorage.asthmaHistory='[["time","felling"]]'
        }
    }
    loadAsthmaHistory()

        




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

