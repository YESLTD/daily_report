
  (function () {
    var c_name = 'ict_daily_report';
    var index = 1;
    console.log('ready');
    var date = new Date();
    // var datestr = date.getFullYear() + '年' + (date.getMonth()+1) + '月' + date.getDate() + '日';
    $('#date').html('当前时间是 '+date.toLocaleString('zh-Hans-CN'));
    $('.keytab').keypress(keypress);
    //填充名字
    $('#name').blur(function () {
      // console.log('blur');
      var v = $(this).val();

        // console.log(v);
        console.log('name saved : ' + v);
        v = v.trim();
        document.cookie = c_name+ '=' + v;


    });
    if (document.cookie.length>0)
    {
      c_start=document.cookie.indexOf(c_name + "=");
      if (c_start!=-1)
      {
        c_start=c_start + c_name.length+1;
        c_end=document.cookie.indexOf(";",c_start);
        if (c_end==-1) c_end=document.cookie.length;
          $('#name').val(document.cookie.substring(c_start,c_end));
        }
    }


    $('#post').click(function (e) {
      // console.log($('.keytab'));
      //why the report init ['','']? because if only have one .keytab,
      //jquery make the report array as a string ,when it post to server
      //after get the array,it is not an array,so there is no filter or map function
      //but we make it as an array in server code,it will case a 500 internal error.
      // ,its demon actually.
      //so callful it!!!/////////////////////////******/
      var query = {name:$('#name').val(),report:['','']};
      $('.keytab').each(function (index) {
        // console.log($(this).val());
        query.report[index] = $(this).val();
      });
      console.log('query = '+JSON.stringify(query));
      $.post('/save',query,function () {
        console.log('info');
        $('.note').addClass('alert-info').css("display","block").text('正在提交......');
      }).done(function () {
        console.log('good');
        $('.note').addClass('alert-success').css("display","block").text('提交完成');
      }).fail(function () {
        $('.note').addClass('alert-danger').css("display","block").text('提交失败了....:(');
        console.log('fail');
      });
    });



    function keypress() {
      // event.preventDefault();
      if(event.keyCode === 13){
        // $('#group').append("span").addClass('input-group-addon basic-addon1').html(2);
        var add = $('<div class="input-group"><span class="input-group-addon" id="basic-addon1">'+(++index)+'</span><input type="text" class="form-control keytab"  aria-describedby="basic-addon1"></div>');
        $('#group').append(add);
        $('input:last-child').focus().keypress(keypress);
    }

    //post request


  }
  })();
