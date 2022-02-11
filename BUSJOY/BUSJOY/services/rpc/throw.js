const ERRORMAP = {
  SYSTEM_ERROR: handleSystemError
};

function handleSystemError() {
  return {
    success: false,
    message: 'rpc 系统错误'
  };
};

export function Throw(error) {
  if (ERRORMAP[error]) return ERRORMAP[error]();
};
