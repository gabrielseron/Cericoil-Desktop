const axios = require('axios')

exports.renderLoginPage = (req, res) =>
{
    if(req.cookies['token'])
    {
        res.render("analyze",
        {
            nameUser: req.cookies['nameUser'],
            mailUser: req.cookies['mailUser']
        })
    }else
    {
        res.render("login")
    }
}

exports.login = (req, res) =>
{
    axios.post(process.env.API_URL + "auth/login", 
    {
        mailUser : req.body.mailUser,
        passUser : req.body.passUser
    }).then(async(response) =>
    {
        if (!response.data.error)
        {
            createCookies = (name, value) =>
            {
                var expires = (new Date(Date.now()+ 2678400000)).toUTCString();
                res.cookie(name, value, {expire: expires})
            }
            await createCookies("token", response.data.token)
            await createCookies("nameUser", response.data.nameUser)
            await createCookies("mailUser", req.body.mailUser)
            res.render("analyze",
            {
                nameUser: req.cookies['nameUser'],
                mailUser: req.cookies['mailUser']
            })
        } else
        {
            res.render("login",
            {
                message: response.data.message
            })
        }
    }).catch((error)=>
    {
        res.render("login",
        {
            message: error
        })
    })
}

exports.renderRegisterPage = (req, res) =>
{
    if (req.cookies['token'])
    {
        res.render("analyze",
        {
            nameUser: req.cookies['nameUser'],
            mailUser: req.cookies['mailUser']
        })
    } else
        res.render("register")
}

exports.register = (req, res) =>
{
    axios.post(process.env.API_URL + "auth/register", 
    {
        mailUser : req.body.mailUser,
        passUser : req.body.passUser,
        nameUser : req.body.nameUser
    }).then(async(response) => 
    {
        if (!response.data.error)
        {
            res.render("login")
        } else
        {
            res.render("register",
            {
                message: response.data.message
            })
        }
    }).catch((error)=>
    {
        res.render("register",
        {
            message: error
        })
    })
}

exports.renderAnalyzePage = (req, res) =>
{
    if (req.cookies['token'])
    {
        res.render("analyze",
        {
            nameUser: req.cookies['nameUser'],
            mailUser: req.cookies['mailUser']
        })
    } else
        res.render("login")
}

exports.analyze = (req, res) =>
{
    if (req.cookies['token'] || req.cookies['nameUser'])
    {
        axios.post(process.env.API_URL + "verif/", 
        {
            nameUser : req.cookies['nameUser'],
            fraudVerificationMail : req.body.fraudVerificationMail
        }).then(async(response) => 
        {
            if (!response.data.error)
            {
                var seon = response.data.seon
                var iqs = response.data.iqs
                delete seon.table
                delete iqs.table
                delete seon.seonMail
                delete iqs.iqsMail

                for (let [key, value] of Object.entries(iqs))
                {
                    if (key != "iqsFraudScore" && key != "iqsSmtpScore" && key != "iqsOverallScore" && key != "iqsAddedBy")
                    {
                        if (value == 0)
                            iqs[key] = false
                        else
                            iqs[key] = true
                    }
                };

                for (let [key, value] of Object.entries(seon))
                {
                    if (key != "seonScore" && key != "seonAddedBy")
                    {
                        if (value == 0)
                            seon[key] = false
                        else
                            seon[key] = true
                    }
                };
                let orderIqs = {"iqsFraudScore" : null, "iqsOverallScore": null, "iqsSmtpScore": null}
                iqs = Object.assign(orderIqs, iqs);
                res.render("analyze", 
                {
                    result: true,
                    mail: req.body.fraudVerificationMail,
                    seon: seon,
                    iqs: iqs
                })
            } else
            {
                res.render("analyze",
                {
                    message: response.data.message
                })
            }
        }).catch((error)=>
        {
            res.render("analyze",
            {
                message: error
            })
        })
    } else
    {
        res.render("login")
    }
}


exports.RenderChangeMailPage = (req, res) =>
{
    if (req.cookies['token'])
    {
        res.render("changeData",
        {
            nameUser: req.cookies['nameUser'],
            mailUser: req.cookies['mailUser'],
            changeMail: true
        })
    } else
        res.render("login")
}

exports.changeMail = (req, res) =>
{
    
    axios.post(process.env.API_URL + "auth/changeMail", 
    {
        mailUser : req.cookies['mailUser'],
        newMailUser : req.body.newMailUser,
        passUser : req.body.passUser
    }).then(async(response) => 
    {
        if (!response.data.error)
        {
            var expires = (new Date(Date.now()+ 2678400000)).toUTCString();
            await res.cookie("mailUser", req.body.newMailUser, {expire: expires})
            res.render("analyze",
            {
                nameUser: req.cookies['nameUser'],
                mailUser: req.cookies['mailUser']
            })
        } else
        {
            res.render("changeData",
            {
                changeMail: true,
                message: response.data.message
            })
        }
    }).catch((error)=>
    {
        res.render("changeData",
        {
            changeMail: true,
            message: error
        })
    })
}

exports.RenderChangePassPage = (req, res) =>
{
    if (req.cookies['token'])
    {
        res.render("changeData",
        {
            nameUser: req.cookies['nameUser'],
            mailUser: req.cookies['mailUser'],
            changePass: true
        })
    } else
        res.render("login")
}

exports.changePass = (req, res) =>
{

    axios.post(process.env.API_URL + "auth/changePass", 
    {
        mailUser : req.cookies['mailUser'],
        passUser : req.body.passUser,
        newPassUser : req.body.newPassUser,
    }).then((response) => 
    {
        if (!response.data.error)
        {
            res.render("analyze",
        {
            nameUser: req.cookies['nameUser'],
            mailUser: req.cookies['mailUser']
        })
        } else
        {
            res.render("changeData",
            {
                changePass: true,
                message: response.data.message
            })
        }
    }).catch((error)=>
    {
        res.render("changeData",
        {
            changePass: true,
            message: error
        })
    })
}

exports.signout = async (req, res) =>
{
    await res.clearCookie("token")
    await res.clearCookie("nameUser")
    await res.clearCookie("mailUser")
    req.session = null;
    res.render("login")
}