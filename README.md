# Api-Movie-Nodejs14
-Công Nghệ : NODEJS , express, mongoose, mongoDB
- Giới thiệu : API để đặt vé xim phim , quản lý users, quản lý phim, quản lý các xuất chiếu, đăng nhập, đăng ký mới . Phân quyền người dùng là ADMin hay là khách bình thường, trả về token đăng nhập.
*****DEMO 1 vài api trong dự án :
-API LOGIN : https://api-movie-bc03.herokuapp.com/api/v1/users/login POST tài khoản email :admin123@gmail.com ,password: luan123
- API danh sách movie : https://api-movie-bc03.herokuapp.com/api/v1/movie GET
- API danh sách người dùng : https://api-movie-bc03.herokuapp.com/api/v1/users/listUser/all GET phải login để có Token admin ,Headers : x-auth-token
- và còn nhiều api khác 
