
setTimeout(function () {
  $('.board').fadeIn(500);
}, 200);

var files = [];

function change(){
  $.getJSON("layers/config.json", function(data) {
    var today = new Date();;
    var h = today.getHours();
    var m = today.getMinutes();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd
    }
    if(mm<10){
        mm='0'+mm
    }
    var today_time = dd+'/'+mm+'/'+yyyy;
    i = 0;
    for (var prop in data.layers) {
      time = data.layers[i][2].split("/");
      time_1 = time[0];
      time_2 = time[1];
      date_time = data.layers[i][1].split(":");
      date_time_1 = date_time[0];
      date_time_2 = date_time[1];
      if(date_time_1 <= today_time)
        if(date_time_2 >= today_time)
          if (time_1 <= ""+h+":"+""+m+"")
              if (time_2 >= ""+h+":"+""+m+""){
                $('#'+i).remove();
                $( ".board" ).append("<div class='board_target' id='"+i+"'></div>");
                $('#'+i).css('background','url("layers/'+data.layers[i][0]+'.png"');

              }
              else
                $('#'+i).remove();
          else
            $('#'+i).remove();
        else
          $('#'+i).remove();
      else
        $('#'+i).remove();
      i++;
    }
    setTimeout(function () {
      change()
    }, 1000);
  });
}

change();
