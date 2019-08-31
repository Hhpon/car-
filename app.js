const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const nodemailer = require('nodemailer');

const app = express()
const corsOptions = {
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200
}

app.use(bodyParser.json())
app.use(cors(corsOptions))

app.get('/', (req, res) => {
    console.log('object');
    res.send('ok')
})

app.post('/sendinfo', (req, res) => {
    console.log(req.body);
    const userInfo = req.body
    let transporter = nodemailer.createTransport({
        // host: 'smtp.ethereal.email',
        service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
        port: 465, // SMTP 端口
        secureConnection: true, // 使用了 SSL
        auth: {
            user: '3231308323@qq.com',
            // 这里密码不是qq密码，是你设置的smtp授权码
            pass: 'oeztywmkvoqgdbad',
        }
    });

    let mailOptions = {
        from: '"华宇官网" <3231308323@qq.com>', // sender address
        to: 'xdsbzxy@163.com', // list of receivers
        // to: '624791164@qq.com',
        subject: 'Hello', // Subject line
        // 发送text或者html格式
        text: `姓名：${userInfo.name}\n电话：${userInfo.tel}\n性别：${userInfo.sex}\n民族：${userInfo.min}`// plain text body
        // html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Message sent: <04ec7731-cc68-1ef6-303c-61b0f796b78f@qq.com>
    });
    res.send('ok')
})

app.listen(3013, () => {
    console.log('server is listening on port 3000');
})