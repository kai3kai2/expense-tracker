# 老爸的私房錢

### 介紹

- 可以填寫資料或使用 facebook 做註冊用來登入。
- 填寫註冊或登入資料錯誤時會告知相應錯誤訊息。
- 沒有登入無法使用內部功能
- 建立完種子資料可以使用 user1.example.com 及 12345678 做帳號密碼登入。
- 可以用頁面得篩選功能篩選出獨自類別。
- 可以新增、修改、刪除新的一筆項目。
- 使用完可以點擊登出按鈕。

## 使用本專案

1. 先確認有安裝 Node.js 與 npm

---

2. 使用 clone 將資料載入本地

---

3. 安裝 npm 套件，使用 Terminal 輸入指令

```
npm install
```

---

4. 新增.env 檔案並設置資料庫連線字串，

```
MONGODB_URL=mongodb+srv://<account>:<password>@cluster0.<xxxxx>.mongodb.net/<table>?retryWrites=true&w=majority
```

---

5. 啟用前先使用 Terminal 輸入以下指令建立種子資料，看見 done 代表建立成功。

```
npm run seed
```

啟用專案: 在 Terminal 請輸入以下指令

```
npm run dev
```

---

6. 若成功運行會出現以下文字，右邊網址可以前往

```
App is listening on https://localhost:3000
```

---

7. 欲暫停此專案在 Terminal 使用 :

```
ctrl + c (windows)
command + c (mac)
```

## 開發工具

- Node.js 4.16.0
- Express 4.16.4
- Express-Handlebars 3.0.0
- Bootstrap 5.2.2
- Font-awesome 6.2.0
- MongoDB
- Mongoose 6.7.2
- 其他詳見 package.json
