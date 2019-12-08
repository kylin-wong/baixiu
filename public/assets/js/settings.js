$('#logo').on('change',function(e) {
    var formdata = new FormData;
    formdata.append('images',this.files[0]);
    // 发送图片上传请求
    $.ajax({
        type:'post',
        url:'/upload',
        data:formdata,
        contentType:false,
        processData: false,
        success:function(response) {
            console.log(response)
            $('#hiddenLogo').val(response[0].images)
            $("#preview").attr('src',response[0].images)
        }
    })
})

$('#settingForm').on('submit',function(e) {
    e.preventDefault();
    var obj = $(this).serialize();

    if (!obj.comment) {
        obj.comment = false;
    }
    if (!obj.review) {
        obj.review = false;
    }
    
    $.ajax({
        type:'post',
        url:'/settings',
        data:obj,
        timeout:5000, // 请求的超时时间
        success:function(data) {
            location.reload();
        }
    })
})

// 网站设置数据
$.ajax({
    type:'get',
    url:'/settings',
    success:function(data) {
        console.log(data);
        if (data) {
            $('#hiddenLogo').val(data.logo);
            $("#preview").prop('src',data.logo);
            $('input[name="title"]').val(data.title);
            $('textarea[name="description"]').val(data.description);
            $('input[name="keywords"]').val(data.keywords);
            $('input[name="comment"]').prop('checked',data.comment);
            $('input[name="review"]').prop('checked',data.review);
        }
    }
})