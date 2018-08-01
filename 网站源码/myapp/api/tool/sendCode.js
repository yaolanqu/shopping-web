/**
 * 云通信基础能力业务短信发送、查询详情以及消费消息示例，供参考。
 * Created on 2017-07-31
 */
const SMSClient = require('@alicloud/sms-sdk')
// ACCESS_KEY_ID/ACCESS_KEY_SECRET 根据实际申请的账号信息进行替换
const accessKeyId = 'LTAIZQoVVoPuBjU9'
const secretAccessKey = 'GfJuI2dLsCQh7Q56TmFxPTniXjkVnB'
//初始化sms_client
let smsClient = new SMSClient({accessKeyId, secretAccessKey})
//发送短信

module.exports = {
    send(config){
        let { PhoneNumbers, code, success, fail } = config
        smsClient.sendSMS({
            PhoneNumbers,
            SignName: '吴勋勋',
            TemplateCode: 'SMS_111785721',
            TemplateParam: '{"code":'+code+'}'
        }).then(function (res) {
            let {Code}=res
            if (Code === 'OK') {
                //处理返回参数
                console.log(res)
                success(1)
            }
        }, function (err) {
            console.log(err)
            fail(err)
        })
    }
}
