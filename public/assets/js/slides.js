$("#file").on('change', function () {
    var file = this.files[0];
    var formDate = new FormData();
    formDate.append('image', file);

    $.ajax({
        type: 'post',
        url: '/upload',
        data: formDate,
        processData: false,
        contentType: false,
        success: function (response) {
            console.log(response[0].image)
            $('#image').val(response[0].image)
        }
    })
})

$("#slidesForm").on('submit',function(e) {
    e.preventDefault();
    var formDate = $(this).serialize();

    $.ajax({
        type:'post',
        url:'/slides',
        data:formDate,
        success:function() {
            location.reload();
        }
    })
})

$.ajax({
    tpe:'GET',
    url:'/slides',
    success:function(response) {
        // console.log(response)
        var html = template('slidesTpl',{data:response})
        console.log(html);
        $("#slidesBox").html(html)
    }
})