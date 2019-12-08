$('#logout').on('click',function() {
    var isConfirm = confirm('你真的要退出吗?');

    if (isConfirm) {
      $.ajax({
        url:'/logout',
        type:'POST',
        success:function(data) {
          location.href = '/admin/login.html';
        },
        error:function(data) {
          alert('退出失败');
        }
      });
    };
  });
// 处理日期时间格式
function formateDate(date) {
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}