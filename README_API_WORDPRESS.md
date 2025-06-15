## Cài đặt plugin jwt-auth

https://wordpress.org/plugin/jwt-auth/

## Config

```Terminal
=== wp-config.php ===
https://api.wordpress.org/secret-key/1.1/salt/ (thay đổi key)
define('JWT_AUTH_SECRET_KEY', 'aVeryLongRandomString1234567890');
define('JWT_AUTH_CORS_ENABLE', true);
define('JWT_AUTH_COOKIE_DOMAIN', $\_SERVER['HTTP_HOST']);
```

```Terminal
=== function.php ===
add_filter(
    'jwt_auth_cors_allow_headers',
    function ( $headers ) {
        return $headers;
    }
);
```

```Terminal
// Cấu hình CORS cho phép credentials và origin động
add_action('init', function() {
    if (isset($_SERVER['HTTP_ORIGIN'])) {
        header("Access-Control-Allow-Origin: " . $_SERVER['HTTP_ORIGIN']);
    }
    header("Access-Control-Allow-Credentials: true");
    header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    header("Access-Control-Allow-Headers: Authorization, Content-Type, X-Requested-With");
    header("Access-Control-Expose-Headers: Set-Cookie");
    if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
        status_header(200);
        exit();
    }
});
```

```Terminal
// Ghi đè thuộc tính cookie refresh_token để test local (bỏ Secure)
add_filter('setcookie_args', function($args, $name) {
    if ($name === 'refresh_token') {
        $args['samesite'] = 'None';
        $args['secure'] = true; // Bỏ Secure = fasle để test local HTTP
    }
    return $args;
}, 10, 2);
```

```Terminal
//Config hết hạn token
add_filter('jwt_auth_expire', function($expire, $issued_at) {
    return $issued_at + 3600; // 10 giây
}, 10, 2);
```

## API jwt-auth

```Terminal
/wp-json/jwt-auth/v1/token
/wp-json/jwt-auth/v1/token/validate
/wp-json/jwt-auth/v1/token/refresh
```

Khi người dùng login (username + pass) => gọi api /wp-json/jwt-auth/v1/token
sẽ trả về data chứa token

```Terminal
{
    "success": true,
    "statusCode": 200,
    "code": "jwt_auth_valid_credential",
    "message": "Credential is valid",
    "data": {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvcG9pbnRzLmNvdXZlZS5jby5pZCIsImlhdCI6MTU4ODQ5OTE0OSwibmJmIjoxNTg4NDk5MTQ5LCJleHAiOjE1ODkxMDM5NDksImRhdGEiOnsidXNlciI6eyJpZCI6MX19fQ.w3pf5PslhviHohmiGF-JlPZV00XWE9c2MfvBK7Su9Fw",
        "id": 1,
        "email": "contactjavas@gmail.com",
        "nicename": "contactjavas",
        "firstName": "Bagus Javas",
        "lastName": "Heruyanto",
        "displayName": "contactjavas"
    }
}
```

```Terminal
export const loginUser = async (user: User) => {
    try {
      const response = await axiosInstance.post('jwt-auth/v1/token', user);
      console.log('Login response:', response.data);
      const { token } = response.data.data;
      // Số → tính theo ngày (ví dụ 1 = 1 ngày).
      // Lưu token vào cookie
      Cookies.set('token', token, {
        expires: 1,
        path: '/',
        sameSite: 'lax'
      });

      // Cập nhật header Authorization cho axios instance
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      toast.success('Đăng nhập thành công');
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.status === 401) {
        toast.error(error.response.data.message);
      }
      throw error;
    }
};
```

Đồng thời ở cooki header : sẽ có 1 refresh_token (httpOnly) gửi lên ở header tự động.
Ở frontend chỉ cần gọi api /wp-json/jwt-auth/v1/token/refresh (để xác thực token hiện tại)

```Terminal
{
    "success": true,
    "statusCode": 200,
    "code": "jwt_auth_valid_token",
    "message": "Token is valid"
}
```

Sau đó gọi tiếp api /wp-json/jwt-auth/v1/token ( Để lấy token mới rồi gắn vào)

```Terminal
export const refreshToken = async () => {
    try {
      // Bước 1: Refresh refresh_token (cookie)
      await axiosInstance.post('jwt-auth/v1/token/refresh');
      // Bước 2: Lấy access token mới bằng refresh_token (cookie)
      const response = await axiosInstance.post('jwt-auth/v1/token');
      const { token } = response.data.data;
      // Lưu lại token mới vào cookie (nếu cần)
      // Số → tính theo ngày (ví dụ 1 = 1 ngày).
      Cookies.set('token', token, {
        expires: 1,
        path: '/',
        sameSite: 'lax'
      });
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      return token;
    } catch (error) {
      throw error;
    }
  };
```

Vì token_refresh được lưu dưới dạng httpOnly nên không thể xoá vì thế ở đăng kí 1 api để logout và xoá token trên server
Và ở frontend chỉ việc gọi tới jwt-auth/v1/logout
/wp-json/jwt-auth/v1/token/refresh

```Terminal
// Đăng ký custom endpoint
add_action('rest_api_init', function () {
    register_rest_route('jwt-auth/v1', '/logout', array(
        'methods' => 'POST',
        'callback' => 'handle_logout',
        'permission_callback' => function () {
            return is_user_logged_in();
        }
    ));
});

// Xử lý logout
function handle_logout() {
    // Xóa refresh token cookie
    if (isset($_COOKIE['refresh_token'])) {
        setcookie('refresh_token', '', time() - 3600, '/', $_SERVER['HTTP_HOST'], true, true);
    }

    // Xóa các cookie khác nếu cần
    if (isset($_COOKIE['token'])) {
        setcookie('token', '', time() - 3600, '/', $_SERVER['HTTP_HOST'], true, true);
    }

    return new WP_REST_Response(array(
        'success' => true,
        'message' => 'Logged out successfully'
    ), 200);
}
```

CONFIG SERVER NGHIX (Site next)
/etc/nginx/conf.d/dashboard.ngoan.site.conf
Chú ý dòng này: proxy_pass http://localhost:3000;

```Terminal
server {
    listen 80;
    include /etc/nginx/extra/https.conf;
    listen [::]:80;
    server_name dashboard.ngoan.site www.dashboard.ngoan.site;

    #access_log off;
    #access_log /home/dashboaSWUM/dashboard.ngoan.site/logs/access.log;
    #error_log off;
    #error_log /home/dashboaSWUM/dashboard.ngoan.site/logs/error.log;
    #root /home/dashboaSWUM/dashboard.ngoan.site/public_html;
    #index index.php index.html index.htm;
    location / {
        proxy_buffering off;
        proxy_pass http://localhost:3000;
        proxy_set_header X-Client-IP      $remote_addr;
        proxy_set_header Host             $host;
        proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_hide_header Upgrade;
    }
}

server {
    listen 443 ssl http2;
    ssl_certificate_key /etc/nginx/ssl/dashboard.ngoan.site/key.pem;
    ssl_certificate /etc/nginx/ssl/dashboard.ngoan.site/cert.pem;
    listen [::]:443 ssl http2;
    server_name dashboard.ngoan.site www.dashboard.ngoan.site;
    #access_log off;
    #access_log /home/dashboaSWUM/dashboard.ngoan.site/logs/access.log;
    #error_log off;
    error_log /home/dashboaSWUM/dashboard.ngoan.site/logs/error.log;
    #root /home/dashboaSWUM/dashboard.ngoan.site/public_html;
    #index index.php index.html index.htm;

    location / {
        proxy_buffering off;
        proxy_pass http://localhost:3000;
        proxy_set_header X-Client-IP      $remote_addr;
        proxy_set_header Host             $host;
        proxy_set_header X-Forwarded-For  $proxy_add_x_forwarded_for;
        proxy_hide_header Upgrade;
    }
}
```

CONFIG SERVER NGHIX (Site Api wp)
/etc/nginx/conf.d/api-dashboard.ngoan.site.conf
Comment dòng này lại include /etc/nginx/wordpress/disable_user_api.conf (để không bị lỗi cors khi call login user)

```Terminal
#include /etc/nginx/wordpress/disable_user_api.conf;
```
