exports.analyze = (req, res, next) =>
{
    let data = req.body;

    const champsRequire = [`fraudVerificationMail`]
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
        if (!reg.test(data.fraudVerificationMail.toLowerCase().trim()))
            errorList.push({message : `Mail is incorrect`})

        if (errorList.length > 0)
        {
            res.render("analyze", 
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
        res.render("analyze",
        {
            errorList: error.message
        })
    }
}
