
export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.jwtToken) {
      // for Node.js Express back-end
      return { 
        'Authorization': `Bearer ${user.jwtToken}`,
        'user': user 
      };
    } else {
      return {};
    }
  }

  