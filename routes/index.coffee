exports.index = (request, response) ->
  console.log(request.user)
  response.render 'index',
    title: 'Moody Friends'
