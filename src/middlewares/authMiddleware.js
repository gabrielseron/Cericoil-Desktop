exports.register = (req, res, next) =>
{
    let data = req.body;

    const champsRequire = [`nameUser`, `mailUser`, `passUser`, `rePass`]

    try
    {
        let error = true;
        let textError = '';
        let errorList = []
        for (const require in champsRequire)
        {
            error = true;
            for (const champs in data)
            {
                if (champs === champsRequire[require])
                    error = false;
            }
            if (error)
                textError += `${champsRequire[require]}, `
        }

        if (textError.length > 0)
        {
            textError = textError.slice(0, -2); // Delete ', '
            errorList.push({message : `${textError} is missing`})
        }

        if (data.nameUser.length < 6)
            errorList.push({message : `Username is too short`});

        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!reg.test(data.mailUser.toLowerCase().trim()))
            errorList.push({message : `Mail is incorrect`})

        if (data.passUser.length < 6)
            errorList.push({message : `Password is too short`});

        if (data.passUser != data.rePass)
            errorList.push({message : `Passwords don't corresponds`});

        if (errorList.length > 0)
        {
            res.render("register", 
            {
                errorList: errorList
            })
        } else
        {
            next()
        }
    } catch (error)
    {
        console.log(error);
        res.render("register",
        {
            errorList: error.message
        })
    }
}

exports.login = (req, res, next) =>
{
    let data = req.body;

    const champsRequire = [`mailUser`, `passUser`]

    try
    {
        let error = true;
        let textError = '';
        let errorList = []
        for (const require in champsRequire)
        {
            error = true;
            for (const champs in data)
            {
                if (champs === champsRequire[require])
                    error = false;
            }
            if (error)
                textError += `${champsRequire[require]}, `
        }

        if (textError.length > 0)
        {
            textError = textError.slice(0, -2); // Delete ', '
            errorList.push({message : `${textError} is missing`})
        }

        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!reg.test(data.mailUser.toLowerCase().trim()))
            errorList.push({message : `Mail is incorrect`})

        if (data.passUser.length < 6)
            errorList.push({message : `Password is too short`});

        if (errorList.length > 0)
        {
            res.render("login", 
            {
                errorList: errorList
            })
        } else
        {
            next()
        }
        
    } catch (error)
    {
        console.log(error);
        res.render("login",
        {
            errorList: error.message
        })
    }
}

exports.changeMail = (req, res, next) =>
{
    let data = req.body;

    const champsRequire = [`newMailUser`, `passUser`]
    try
    {
        let error = true;
        let textError = '';
        let errorList = []
        for (const require in champsRequire)
        {
            error = true;
            for (const champs in data)
            {
                if (champs === champsRequire[require])
                    error = false;
            }
            if (error)
                textError += `${champsRequire[require]}, `
        }

        if (textError.length > 0)
        {
            textError = textError.slice(0, -2); // Delete ', '
            errorList.push({message : `${textError} is missing`})
        }

        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        if (!reg.test(data.newMailUser.toLowerCase().trim()))
            errorList.push({message : `Mail is incorrect`})

        if (errorList.length > 0)
        {
            res.render("account",
            {
                errorList: errorList,
                changeMail: true
            })
        } else
        {
            next()
        }
        
    } catch (error)
    {
        console.log(error);
        res.render("changeMail",
        {
            errorList: error.message,
            changeMail: true
        })
    }
}

exports.changePass = (req, res, next) =>
{
    let data = req.body;

    const champsRequire = [`passUser`, `newPassUser`]
    try
    {
        let error = true;
        let textError = '';
        let errorList = []
        for (const require in champsRequire)
        {
            error = true;
            for (const champs in data)
            {
                if (champs === champsRequire[require])
                    error = false;
            }
            if (error)
                textError += `${champsRequire[require]}, `
        }

        if (textError.length > 0)
        {
            textError = textError.slice(0, -2); // Delete ', '
            errorList.push({message : `${textError} is missing`})
        }

        if (errorList.length > 0)
        {
            res.render("account",
            {
                errorList: errorList,
                changePass: true
            })
        } else
        {
            next()
        }
        
    } catch (error)
    {
        console.log(error);
        res.render("changeMail",
        {
            errorList: error.message,
            changePass: true
        })
    }
}