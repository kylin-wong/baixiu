// 当发生提交行为的时候
$("#userform").on('submit', function () {
  var obj = $(this).serialize();

  $.ajax({
    url: '/users',
    type: 'POST',
    data: obj,
    success: function (response) {
      location.reload();
    },
    error: function (err) {
      alert('用户添加失败')
    }
  })
  return false;
})
// 头像上传的代码
$('#modifyBox').on('change', '#avatar', function () {
  // 用户选择到的文件
  //   this.files[0]
	var formData = new FormData();
	formData.append('avatar', this.files[0]);

	$.ajax({
		type: 'POST',
		url: '/upload',
		data: formData,
		// 告诉$.ajax方法不要解析请求参数
		processData: false,
		// 告诉$.ajax方法不要设置请求参数的类型
		contentType: false,
		success: function (response) {
			console.log(response)
			// 实现头像预览功能
			$('#preview').attr('src', response[0].avatar);
			$('#hiddenAvatar').val(response[0].avatar)
		}
	})
})

// 向服务器端发送请求 索要用户列表数据
$.ajax({
  type: 'get',
  url: '/users',
  success: function (response) {
    // console.log(response);
    // 使用模板引擎将数据和HTML字符串进行拼接
    var html = template('userTpl', { data: response });
    // 将拼接好的字符串显示在页面中
    $('#userBox').html(html);
  }
})

//修改功能
// 通过事件委托的方式为编辑按钮添加点击事件 
$("#userBox").on('click', '.edit', function () {
  // 获取被点击用户的id值
  var id = $(this).attr('data-id');
  // 根据id获取用户的详细信息
  $.ajax({
    url: '/users/' + id,
    type: 'get',
    success: function (response) {
      // console.log(response);
      var html = template('modifyTpl', response)
      $('#modifyBox').html(html);
    }
  })
});

$('#modifyBox').on('submit', '#modifyForm', function (e) {
  e.preventDefault();
  // 获取用户在表单中输入的值
  var formData = $(this).serialize();
  // console.log(formData);
  // 给表单设置data-id={{_id}} 通过获取自定义属性来 获取id
  var id = $(this).attr('data-id');
  // 发送请求 修改用户信息
  $.ajax({
    type: 'put',
    url: '/users/' + id,
    data: formData,
    success: function (response) {
      // 请求成功 刷新页面
      location.reload();
    }
  })

})

$('#userBox').on('click', '.delete', function () {
  if (confirm('您真的要删除用户吗?')) {
    var id = $(this).attr('data-id');
    $.ajax({
      type: 'delete',
      url: '/users/' + id,
      success: function (response) {
        location.reload();
      }
    })
  }
})

// 全选反选
var selectAll = $("#selectAll");

var deleteMany = $("#deleteMany");
// 全选按钮状态发生改变时
selectAll.on('change', function () {
  var status = $(this).prop('checked');

  if (status) {
    // true
    deleteMany.show();
  } else {
    // false
    deleteMany.hide();
  }
  // 获取所有的用户 并将他们的状态和全选按钮保持一致
  $('#userBox').find('input').prop('checked', status);

})

// 用户面前的复选框发生改变时
$('#userBox').on('change', '.userStatus', function () {
  // 获取所有用户 在所有用户中过滤出选中用户
  // 判断选中用户的数量和所有用户的数量是否一致
  var inputs = $('#userBox').find('input')
  if (inputs.length == inputs.filter(':checked').length) {
    // alert('所有用户都是选中的')
    selectAll.prop('checked', true);
  } else {
    // alert('不是所有用户都是选中的')
    selectAll.prop('checked', false);
  }

  // 如果选中的复选框数量大于0 那就说明有复选框选中
  if (inputs.filter(':checked').length > 0) {
    deleteMany.show();
  } else {
    deleteMany.hide();
  }
})

// 批量删除
deleteMany.on('click', function () {
  var ids = [];
  var checkedUser = $('#userBox').find('input').filter(':checked');
  // 循环复选框 从复选框元素的身上获取data-id属性的值
  checkedUser.each(function (index, element) {
    ids.push($(element).attr('data-id'))
  })
  
  if (confirm('您真的要进行批量删除吗')) {
    $.ajax({
      type:'delete',
      url:'/users/' + ids.join('-'),
      success:function() {
        location.reload();
      }
    })
  }
})