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
            $('#site_logo').val(response[0].images)
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
            console.log(data);
        }
    })
})