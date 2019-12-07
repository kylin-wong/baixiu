// 当添加分类表单发生提交行为的时候
$('#addCategory').on('submit', function (e) {
    e.preventDefault();
    // 获取表单中输入的内容
    var obj = $(this).serialize();
    // console.log(obj);

    $.ajax({
        type: 'post',
        url: '/categories',
        data: obj,
        success: function (response) {
            // console.log(response)
            location.reload();
        }
    })
});
// 发送ajax请求 向服务器端所有分类列表数据
$.ajax({
    type: 'GET',
    url: '/categories/',
    success: function (response) {
        var html = template('tpl-categories', { data: response })
        $('#categoriesBox').html(html);
    }
})

// 为编辑按钮添加点击事件
$('#categoriesBox').on('click', '.edit', function () {
    var id = $(this).attr('data-id');

    $.ajax({
        type: 'GET',
        url: '/categories/' + id,
        success: function (data) {
            console.log(data);
            var html = template('modifyCaterageTpl', data);
            $("#formClass").html(html);
        }
    })
})

$("#formClass").on('submit', '#modifyCategory', function (e) {
    e.preventDefault();
    var formdata = $(this).serialize();
    var id = $(this).attr('data-id');
    $.ajax({
        type: 'put',
        url: '/categories/' + id,
        data: formdata,
        success: function (data) {
            location.reload();
        }
    })
})
// 删除按钮被点击时
$('#categoriesBox').on('click', '.delete', function () {
    if (confirm('你确认要删除吗?')) {
        var id = $(this).attr('data-id');
        $.ajax({
            url: '/categories/' + id,
            type: 'DELETE',
            success: function (data) {
                location.reload();
            }
        })

    }
})