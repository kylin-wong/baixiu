$.ajax({
    type:'GET',
    url:'/posts',
    success:function(data) {
        console.log(data)
        
    }
})


$.ajax({
    type:'GET',
    url:'/categories',
    success:function(data) {
        var html = template('tpl-category',{data:data})
        $('#category').html(html);
    }
})
