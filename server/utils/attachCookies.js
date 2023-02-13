const attachCookies = ({res,token}) => {
    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie('token', token, {
        secure: true,
        httpOnly: true,
        sameSite: 'none',
        expires: new Date(Date.now() + oneDay),
    })
      
}
export default attachCookies