
module.exports = async ({ctx}) =>{
  const { 
    session: {
      token: tokenS
    },
    request: {
      header: {
        token: tokenH
      } 
    }
  } = ctx;
  if(!tokenS || !tokenH) return false;
  console.log('checkToken:', tokenS, tokenH)
  if (tokenS === tokenH) return true;
  return false;
}