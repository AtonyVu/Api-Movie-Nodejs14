- Tên : Võ Thành Luân
- Email:Luancauthu@gmail.com
- SDT: 0933260891
- **Link GitHub:  https://github.com/luancauthu2907/Api-Movie-Nodejs14
- **Link Heroku : https://api-movie-bc03.herokuapp.com

                DATA MẪU 
- Thêm key  x-auth-token:nội dung là token  vào header để sử dụng được chức năng của admin
- Thời gian sử dụng Token là 2 tiếng 
- Tài khoản ADMIN: 
 {"email":"admin12345@gmail.com","password":"admin12345" }
- Thêm Phim {"title": "Luan1","description": "phim hay lắm","creator": "6121ea4be4173b08b897d393","biDanh": "PhimViet","trailer": "youtube","maNhom": "VL01","ngayKhoiChieu": "29/07/2021","danhGia": 10}
- Dang kí :  {"taiKhoan": "admin123123","password": "admin123456789","email": "admin1233232@gmail.com","hoTen": "Võ Thành Luân" ,"phone": "09332333233",}
- Dặt ve : {"maGhe": "D07","giaVe": "90000","creator": "6121e504b388392c6ca3062a","maLichChieu": "6124b0004cd029465c5dc213"}
- Thêm người dùng :{"taiKhoan": "luan3","password": "luan1234567","email": "luan222@gmail.com","phone": "012345689","maNhom": "USER","type": "USER","hoTen": "luan", "creator": "6121ea4be4173b08b897d393"}
- Tạo Lịch Chiếu : {"maRap":"LT1","giaVe": "3000","maPhim": "6121f0306a3274581c492308","ngayGioKhoiChieu": "2014-12-13 12:34","creator": "6121ea4be4173b08b897d393"}


                QUẢN LÍ PHIM
 - Lấy danh sách phim                                           https://api-movie-bc03.herokuapp.com/api/v1/movie/                       GET
 - Lấy danh sách phim phân trang                                https://api-movie-bc03.herokuapp.com/api/v1/movie/page/:page             GET             
 - Thêm phim                                                    https://api-movie-bc03.herokuapp.com/api/v1/movie/                       POST           
 - Cập nhật phim                                                https://api-movie-bc03.herokuapp.com/api/v1/movie/:id                    PATCH           
 - Xoá phim                                                     https://api-movie-bc03.herokuapp.com/api/v1/movie/:id                    DELETE    
 - Lấy thông tin phim                                           https://api-movie-bc03.herokuapp.com/api/v1/movie/:id                    GET         



                    QUẢN LÍ ĐẶT VÉ 
- Đặt vé                                                      https://api-movie-bc03.herokuapp.com/api/v1/lichchieu/datve                      POST            
- Lấy danh sách phòng vé                                      https://api-movie-bc03.herokuapp.com/api/v1/lichchieu/GetLichChieu/:id           GET            
- Tạo lịch chiếu                                              https://api-movie-bc03.herokuapp.com/api/v1/lichchieu//TaoLichChieu              POST                 


                    QUẢN LÍ USER 
 - Đăng nhập                                                   https://api-movie-bc03.herokuapp.com/api/v1/users/login                                  POST       
 - Đăng kí                                                     https://api-movie-bc03.herokuapp.com/api/v1/users/signIn                                 POST  
 - Thông tin tài khoản                                         https://api-movie-bc03.herokuapp.com/api/v1/users/:id                                    GET   
 - Lấy danh sách người dùng                                    https://api-movie-bc03.herokuapp.com/api/v1/users/listUser/all                           GET
 - Lấy danh sách người dùng phân trang                         https://api-movie-bc03.herokuapp.com/api/v1/users/listUser/page/:page                    GET 
 - Lấy danh sách loại người dùng                               https://api-movie-bc03.herokuapp.com/api/v1/users/listUser/:type                         GET         
 - Tìm kiếm người dùng                                         https://api-movie-bc03.herokuapp.com/api/v1/users/listUser/search/:tuKhoa                GET    
 - Tìm kiếm người dùng phân trang                              https://api-movie-bc03.herokuapp.com/api/v1/users/listUser/search/:tuKhoa/:page          GET  
 - Thêm người dùng                                             https://api-movie-bc03.herokuapp.com/api/v1/users/                                       POST
 - Cập nhật thông tin người dùng                               https://api-movie-bc03.herokuapp.com/api/v1/users/:id                                    PATCH
 - Xoá người dùng                                              https://api-movie-bc03.herokuapp.com/api/v1/users/:id                                    DELETE


                   QUẢN LÍ RẠP 
- Lấy thông tin hệ thống rạp                                 https://api-movie-bc03.herokuapp.com/api/v1/quanLyRap/thongtinrap                         GET
- Lấy thông tin lịch chiêú (Theo phim)                       https://api-movie-bc03.herokuapp.com/api/v1/quanLyRap/thongTinLichChieuRap/:id            GET
- Lấy thông tin lịch chiếu phim (Theo rạp)                   https://api-movie-bc03.herokuapp.com/api/v1/quanLyRap/thongTinLichChieuPhim/:id           GET  

