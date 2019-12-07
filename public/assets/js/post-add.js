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