

export const AuthToken = (action,token=null) => {
  if(action==='save'){
    const saveToken = (token) => {
        localStorage.setItem('authToken', token);
      };
      saveToken(token)
  }
 else if(action==='clear'){
  const removeToken = () => {
    localStorage.removeItem('authToken');
  };
  removeToken()
 }
 else if(action==='get'){
  return localStorage.getItem('authToken');
 }

};


