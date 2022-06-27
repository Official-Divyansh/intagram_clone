
export  const userQuery = (password) =>{
    // const query = `*[_type == "user" && email == '${email}' && password== '${password}']`;
    const query = `*[_type == "user" && _id =='${password}']`;
  
      return query
    }
export const searchFollower = (searchTitle) => {
    const query = `*[_type == "followed" && title == '${searchTitle}']`  
    return query;
  };

export const searchPost = () => {
    const query = `*[_type == "post"]`     
    return query;
  };