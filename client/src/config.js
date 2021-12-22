const devConfig = {
    BASE_URL: process.env.REACT_APP_BASE_URL 
}

const prodConfig = {
    BASE_URL: ''
}



export default process.env.NODE_ENV === 'production'? prodConfig: devConfig