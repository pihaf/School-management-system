# Cách cài đặt và chạy ứng dụng localhost
Sau đây là các bước thực hiện để có thể chạy ứng dụng thành công ở localhost.


## Clone git
Vào folder muốn lưu project và chạy `git clone https://github.com/longvh-dev/UET-Support.git`

## Import dữ liệu trong folder database
Nhóm sử dụng MySQL để lưu trữ dữ liệu, vì vậy một trong các yêu cầu chạy là cài đặt sẵn MySQL server.

### Sử dụng terminal và MySQL server
File dump dùng để import được lưu trong folder database/terminal
`mysql -u [username] -p [database_name] < [dump_file.sql]`

### Sử dụng MySQL Workbench
Vào Server -> Data Import -> Chọn đúng đường dẫn đến folder database/workbench rồi chuyển sang tab Import Progress -> Nhấn Start Import

## Sửa file .env
Sửa file .env theo các config của MySQL server của máy và sửa biến SECRET_KEY dùng để tạo token xác thực người dùng 

## Install các thư viện cần thiết
Chạy câu lệnh `npm install` trong folder tổng để install các dependencies của server backend. Sau đó, chạy `cd frontend/sgfrontend` và `npm install` để install các dependencies của frontend.

## Chạy ứng dụng
Mở hai terminal để chạy hai server frontend và backend. 

### Backend: Từ project folder chạy lệnh
```
cd src
npm run dev
```

### Frontend: Từ project folder chạy lệnh
```
cd frontend/sgfrontend
npm run dev
```

Sau khi thực hiện các bước trên, ứng dụng sẽ chạy trên localhost.
Chú ý: Cần kiểm tra cổng chạy server để tránh bị trùng với ứng dụng khác, các cổng sử dụng trong ứng dụng
- Backend: 3000
- Frontend: 5173
