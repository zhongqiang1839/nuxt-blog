const IS_DEV = process.env.NODE_ENV !== 'production';

exports.OPT_PASSWORD = '181160';

exports.SERVER_ROOT = IS_DEV ? 'http://localhost:1839' : 'http://119.27.163.168:1839';



