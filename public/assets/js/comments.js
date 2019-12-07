$.ajax({
    type:'GET',
    url:'/comments',
    success:function(data) {
        // console.log(data);
        var html = template('commentsTpl',data);
        $('#commentsBox').html(html);
        var pageHTML = template('pageTpl',data);
        console.log(pageHTML)
        $('#pageBox').html(pageHTML);
    }
})

function changePage(page) {
    $.ajax({
        type:'GET',
        url:'/comments',
        data:{
            page:page
        },
        success:function(data) {
            // console.log(data);
            var html = template('commentsTpl',data);
            $('#commentsBox').html(html);
            var pageHTML = template('pageTpl',data);
            console.log(pageHTML)
            $('#pageBox').html(pageHTML);
        }
    })
}

$('#commentsBox').on('click','.status',function() {
    // 获取当前评论状态
    var status = $(this).attr('data-status');
    var id = $(this).attr('data-id')
    $.ajax({
        type:'put',
        url:'/comments/' + id,
        data:{
            state:status == 0 ? 1 : 0
        },
        success:function(data) {
            location.reload();
        }
    })
})

$('#commentsBox').on('click','.delete',function() {
    if (confirm('您真的要删除吗'))
    var id = $(this).attr('data-id')
    $.ajax({
        type:'delete',
        url:'/comments/' + id,
        success:function(data) {
            location.reload();
        }
    })
})