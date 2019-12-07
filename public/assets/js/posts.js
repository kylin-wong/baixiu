$.ajax({
    type: 'get',
    url: '/posts',
    success: function (data) {
        console.log(data)
        var html = template('postTpl', data);
        $('#postsBox').html(html);
        var page = template('pageTpl', data);
        $('#page').html(page);
    }
})

// 分页
function changePage(page) {
    $.ajax({
        type: 'get',
        url: '/posts',
        data: {
            page: page
        },
        success: function (data) {
            console.log(data)
            var html = template('postTpl', data);
            $('#postsBox').html(html);
            var page = template('pageTpl', data);
            $('#page').html(page);
        }
    })
}

$.ajax({
    type: 'GET',
    url: '/categories',
    success: function (data) {
        var html = template('tpl-category', { data: data })
        $('#category').html(html);
    }
})

$('#filterForm').on('submit', function () {
    var formDate = $(this).serialize();
    $.ajax({
        type: 'get',
        url: '/posts',
        data: formDate,
        success: function (data) {
            console.log(data)
            var html = template('postTpl', data);
            $('#postsBox').html(html);
            var page = template('pageTpl', data);
            $('#page').html(page);
        }
    })
    return false
})

$('#postsBox').on('click', '.delete', function () {
    if (confirm('你真的要进行删除吗?')) {
        var id = $(this).attr('data-id');
        $.ajax({
            type: 'delete',
            url: '/posts/' + id,
            success: function () {
                location.reload();
            }
        })
    }
})

