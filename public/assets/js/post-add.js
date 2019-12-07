$.ajax({
    type: 'GET',
    url: '/categories',
    success: function (response) {
        console.log(response);
        var html = template('categoryTpl', { data: response })
        $('#category').html(html);
    }
})

$('#feature').on('change', function () {
    var file = this.files[0]
    // 创建formdata 对象 实现二进制上传
    var formData = new FormData;
    formData.append('cover', file);
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 不要处理data属性对应的参数
        // 传递的formdata不需要转换成 参数名=参数值的 形式
        processData: false,
        // 不要设置参数类型 因为参数类型在formdata里面已经设置好了 在这里不需要jquery设置了
        contentType: false,
        success: function (data) {
            console.log(data);
            // 将上传的图片地址保存在隐藏域中
            // 因为在文章添加功能时 需要传递
            $('#thumbnail').val(data[0].cover);
        }
    })
})

$('#addForm').on('submit', function () {
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/posts',
        data: formData,
        success: function () {
            location.href = '/admin/posts.html'
        },
        error: function (err) {
            console.log(err)
        }
    })
    return false;
})

// 获取浏览器地址栏中的id参数
var id = getUrlParams('id')
// 当前管理与你是在做修改文章的操作啦
// 因为id不等于-1 所以找得id属性呀! 所以就是操作呀
if (id != -1) {
    $.ajax({
        type: 'get',
        url: '/posts/' + id,
        success: function (response) {
            $.ajax({
                type: 'GET',
                url: '/categories',
                success: function (data) {
                    response.data = data;
                    console.log(response)
                    var html = template('modifyTpl', response);
                    $("#parentBox").html(html);
                }
            })
        }
    })
}

// 从浏览器地址栏中获取参数
function getUrlParams(name) {
    var paramsAry = location.search.substr(1).split('&');
    for (var i = 0; i < paramsAry.length; i++) {
        var tmp = paramsAry[i].split('=')
        if (tmp[0] == name) {
            return tmp[1];
        }
        // -1 在这里哦!
        return -1;
    }
}
// 当修改文章信息表单发生提交行为的时候触发
$('#parentBox').on('submit','#modifyForm',function(e) {
    e.preventDefault();
    var formData = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type:'put',
        url:'/posts/' + id,
        data:formData,
        success:function(data) {
            location.href = '/admin/posts.html' 
        }
    })
})